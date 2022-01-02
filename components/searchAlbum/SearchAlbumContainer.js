import { useState } from "react";

import { searchAlbum } from "../../lib/albums";
import AlbumGrid from "../albumGrid/AlbumGrid";
import AlbumPageNavigator from "../albumGridNavigator/AlbumGridNavigator";
import SearchMenu from "./SearchMenu";

export default function SearchAlbumContainer(props) {
    const [searchResults, setSearchResults] = useState([]);

    const onSearchAlbum = (album, artist) => {
        console.log("About to search album: " + album  + "-" + artist);
        searchAlbum(album, artist)
            .then( searchResults => setSearchResults(searchResults));
    }
    return (
        <>
            <SearchMenu
                onSearchAlbum={onSearchAlbum}
            />

            <AlbumGrid
                albumsData={searchResults}
                onSelectAlbum={props.onAddFavAlbum}
            />
        </>
    )
}