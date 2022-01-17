import { isValidElement } from "react"
import Layout from '../components/layout/Layout'
import AlbumGridNavigator from '../components/albumGridNavigator/AlbumGridNavigator'
import { getRecentAlbums, getAllAlbumIds } from "./api/albums/albums"

export default function RecentAlbums(props) {


    return (
        <>
            <Layout>
                <AlbumGridNavigator
                    albumsData={props.recentAlbums}
                />
            </Layout>
        </>
    )
}

export async function getServerSideProps() {
    const recentSpotifyAlbums = await getRecentAlbums();
    const recentAlbums = recentSpotifyAlbums.map( album => {
        return({
            album
        })
    })
  //  console.log(JSON.stringify(recentAlbums));
    //const authData = await getAccessToken(code);
    //console.log(authData);
    return {
        props: {
            recentAlbums
        }
    }
}