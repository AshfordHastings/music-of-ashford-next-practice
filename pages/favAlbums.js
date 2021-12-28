import { isValidElement } from "react"
import Layout from '../components/layout/Layout'
import AlbumGridNavigator from '../components/albumGridNavigator/AlbumGridNavigator'
import { getFavAlbums, getAllAlbumIds } from "../lib/albums"
import { getAlbumById, getAlbumDataById } from "../lib/spotifyAlbums"


export default function FavoriteAlbums(props) {


    return (
        <>
            <Layout>
                <AlbumGridNavigator
                    favAlbumsData={props.favAlbumsData}
                />
            </Layout>
        </>
    )
}

export async function getStaticProps() {
    const favAlbums = getFavAlbums()
    const favAlbumsData = 
        // Awaits for the array of proises to be completed
        await Promise.all(favAlbums.map((album) => {
            return getAlbumDataById(album.album_id);
        }))
    

    return {
        props: {
            favAlbumsData,
        }
    }
}