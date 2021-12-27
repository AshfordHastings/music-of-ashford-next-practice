import { isValidElement } from "react"
import Layout from '../components/layout/Layout'
import AlbumGrid from '../components/albumGrid/AlbumGrid'
import { getAllAlbums, getAllAlbumIds } from "../lib/albums"

export default function FavoriteAlbums(props) {
    return (
        <>
            <Layout>
                <AlbumGrid
                    albums={props.albums}
                />
            </Layout>
        </>
    )
}

export async function getStaticProps() {
    const albums = await getAllAlbums();

    return {
        props: {
            albums
        }
    }
}