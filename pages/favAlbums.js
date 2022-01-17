
import { isValidElement, useEffect, useState } from "react"
import Layout from '../components/layout/Layout'
import AlbumGridNavigator from '../components/albumGridNavigator/AlbumGridNavigator'
import { getFavAlbums, getAllAlbumIds, searchAlbum, addFavAlbum } from "./api/albums/albums"
import { getAlbumById, getAlbumDataById } from "../lib/spotifyCalls/spotifyAlbums"
import SearchAlbumContainer from "../components/searchAlbum/SearchAlbumContainer"
import { PrismaClient } from '@prisma/client';
import { pruneAlbum } from "../lib/helper"
import axios from "axios"

import favAlbumsStyle from '../components/pageStyles/favAlbums.module.css'

export default function FavoriteAlbums(props) {

    const [favAlbums, setFavAlbums] = useState([]);

    useEffect(() => {
        if (props.albumsData != undefined) {
            setFavAlbums(props.albumsData)
        }

    }, []);

    // const onAddFavAlbum = async (album) => {
    //     const response = await axios.post('/api/albums/albums', {
    //         album: {
    //             spotify_id: album.id,
    //             name: album.name,
    //             artist: album.artists[0].name,
    //             image: album.images[0].url
    //         }
    //     })

    //     console.log(response);
    //     getAlbumDataById(album_id)
    //         .then((albumData) => {
    //             console.log("New state should be: " + JSON.stringify(favAlbums.concat(albumData)))
    //             setFavAlbums(favAlbums.concat(albumData))
    //         });

    // }

    const onAddFavAlbum = async (album) => {
        setFavAlbums(favAlbums.concat(album))
    }

    const onRemoveAlbum = async (album_id) => {
        const response = await axios.delete('/api/albums/albums', {
            data: {
                album_id: album_id
            }
        })

        console.log(response);
        setFavAlbums(favAlbums.filter(album => album.id != album_id));
    }

    const searchAlbumContainer =
        <SearchAlbumContainer
            onAddAlbum={onAddFavAlbum}
        />;

    return (
        <>
            <Layout>
                <div className={favAlbumsStyle.favAlbumsContainer}>
                    <AlbumGridNavigator
                        extraSections={searchAlbumContainer}
                        albumsData={favAlbums}
                        onRemoveAlbum={onRemoveAlbum}
                    />
                </div>
            </Layout>
        </>
    )
}

export async function getServerSideProps() {
    const albumsData = await getFavAlbums();

    const albums = albumsData.map(album => {
        return (
            { ...album, date_released: album.date_released.toString()}
        )
    })

    return {
        props: {
            albumsData: albums
        }
    }
}