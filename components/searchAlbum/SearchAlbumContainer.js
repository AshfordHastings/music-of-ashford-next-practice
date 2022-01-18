import { useState } from "react";

import { searchAlbum } from "../../pages/api/albums/albums";
import AlbumGrid from "../albumGrid/AlbumGrid";
import AlbumPageNavigator from "../albumGridNavigator/AlbumGridNavigator";
import SearchMenu from "./SearchMenu";
import axios from 'axios';

import style from './searchBox.module.css'

export default function SearchAlbumContainer(props) {
    const [searchResults, setSearchResults] = useState([]);

    const onSearchAlbum = (album, artist) => {
        console.log("About to search album: " + album  + "-" + artist);

        axios.get('/api/spotify/search', {
            params: {
                albumSearch: album,
                artistSearch: artist
            }
        })
            .then( searchResults => {
                    const searchAlbums = (searchResults.data) ? searchResults.data.map(searchAlbum => {
                        let date = new Date(searchAlbum.release_date);
                        return {
                            spotifyId: searchAlbum.id,
                            name: searchAlbum.name,
                            artist: searchAlbum.artists[0].name,
                            date_released: date.toISOString(),
                            image: searchAlbum.images[0].url
                        }
                    }) : [];
                    setSearchResults(searchAlbums);
                }
            )
    }
    
    return (
        <>
        <div className={style.searchMenuContainer}>
            <div className={style.searchMenuTitle}>
                Add Albums to List
            </div>
            <SearchMenu
                onSearchAlbum={onSearchAlbum}
                onHideSearchMenu={props.onHideSearchMenu}
            />

            <AlbumGrid
                albumsData={searchResults}
                onSelectAlbum={props.onAddAlbum}
            />
        </div>
        </>
    )
}