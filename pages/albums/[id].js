import { getAlbumById, getAllAlbumIds } from "../../lib/albums"

import AlbumPage from '../../components/albumPage/AlbumPage';
import Layout from "../../components/layout/Layout";

export default function Album({ albumData }) {
    return <Layout>
        <AlbumPage
            album={albumData}
        />
    </Layout>
}

export async function getStaticProps({ params }) {
    const albumData  = await getAlbumById(params.id)
    return {
        props: {
            albumData
        }
    }
}

export async function getStaticPaths() {
    const ids = await getAllAlbumIds();
    const paths = ids.map( (id) => {
        return ({
            params: {
                id: id
            }
        })
    });

    console.log("Static paths: " + paths);
    return {
        paths,
        fallback: false
    }
}