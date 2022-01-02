import { isValidElement, useEffect, useState } from "react"
import Layout from '../components/layout/Layout'
import AlbumGridNavigator from '../components/albumGridNavigator/AlbumGridNavigator'
import { getFavAlbums, getAllAlbumIds, searchAlbum, addFavAlbum } from "../lib/albums"
import { getAlbumById, getAlbumDataById } from "../lib/spotifyCalls/spotifyAlbums"
import SearchAlbumContainer from "../components/searchAlbum/SearchAlbumContainer"


export default function FavoriteAlbums(props) {

    const [favAlbums, setFavAlbums] = useState([]);

    useEffect(() => {
        if (props.albumsData != undefined) {
            setFavAlbums(props.albumsData)
        }

    }, []);

    const onAddFavAlbum = (album_id) => {
        getAlbumDataById(album_id)
            .then((albumData) => {
                console.log("New state should be: " + JSON.stringify(favAlbums.concat(albumData)))
                setFavAlbums(favAlbums.concat(albumData))

            });

    }

    const onRemoveAlbum = (album_id) => {
        setFavAlbums(favAlbums.filter( album => album.id != album_id));
    }

    return (
        <>
            <Layout>
                <AlbumGridNavigator
                    albumsData={favAlbums}
                    onRemoveAlbum={onRemoveAlbum}
                />
                <SearchAlbumContainer
                    onAddFavAlbum={onAddFavAlbum}
                />
            </Layout>
        </>
    )
}

export async function getServerSideProps() {
    const albumsData = await getFavAlbums();
   // albumsData.map( album => console.log(album.id))
   console.log("favAlbums: " + JSON.stringify(albumsData));
    return {
        props: {
            albumsData
        }
    }
}