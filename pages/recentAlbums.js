import { isValidElement } from "react"
import Layout from '../components/layout/Layout'
import AlbumGridNavigator from '../components/albumGridNavigator/AlbumGridNavigator'
import { getRecentAlbums, getAllAlbumIds } from "../lib/albums"
import { getRecentlyPlayedTracks } from "../lib/spotifyCalls/spotifyAlbums"
import {getRefreshedAccessToken } from "../lib/spotifyCalls/spotifyAuth"

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
    const recentAlbums = await getRecentAlbums();
    console.log(JSON.stringify(recentAlbums));
    //const authData = await getAccessToken(code);
    //console.log(authData);
    return {
        props: {
            recentAlbums
        }
    }
}