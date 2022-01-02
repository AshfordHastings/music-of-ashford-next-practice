import axios from 'axios';
import { getAuth } from './spotifyAuth';
import { getRefreshedAccessToken } from './spotifyAuth';
import qs, { stringify } from 'qs';

import { pruneAlbum, pruneTrack } from '../helper';

export async function getAlbumDataById(albumId) {
    const refreshedAccessToken = await getRefreshedAccessToken();
    //console.log("Access Token: " + refreshedAccessToken);
    try {
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            // token stored as global variable
            Authorization: `Bearer ${refreshedAccessToken}`,
        };

        const { data } = await axios.get(
            `https://api.spotify.com/v1/albums/${albumId}`, { headers });
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function getTopArtistsOfMonth() {
    const refreshedAccessToken = await getRefreshedAccessToken();
   // console.log("Access Token: " + refreshedAccessToken);

    // const headers = {
    //     Accept: "application/json",
    //     Authorization: `Bearer ${refreshedAccessToken}`,
    //     "Content-Type": "application/json",
    // };
    // const query = {
    //     params: {
    //         limit: 20,
    //         offset: 0,
    //         time_range: "short_term"
    //     }
    // }

    try {
        const { data } = await axios.get(
            `https://api.spotify.com/v1/me/top/tracks`,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${refreshedAccessToken}`,
                    "Content-Type": "application/json",
                },
                params: {
                    limit: 20,
                    offset: 0,
                    time_range: "short_term"
                }
            });
        return data;
    } catch (error) {
        console.log(error.response);
    }
}

export async function getRecentlyPlayedTracks(after) {
    const refreshedAccessToken = await getRefreshedAccessToken();
    console.log("Access Token: " + refreshedAccessToken);

    // const headers = {
    //     Accept: "application/json",
    //     Authorization: `Bearer ${refreshedAccessToken}`,
    //     "Content-Type": "application/json",
    // };
    // const query = {
    //     params: {
    //         limit: 20,
    //         offset: 0,
    //         time_range: "short_term"
    //     }
    // }

    try {
        const { data } = await axios.get(
            `https://api.spotify.com/v1/me/player/recently-played`,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${refreshedAccessToken}`,
                    "Content-Type": "application/json",
                },
                params: {
                    limit: 10,
                    offset: 0
                }
            });
        //console.log("blah"); 
        //console.log("mydata call: " + JSON.stringify(data.items.map( track => pruneTrack(track) )));
        return data.items.map(track => pruneTrack(track.track));
    } catch (error) {
        console.log(error.response);
    }
}

export async function searchSpotifyAlbum(album, artist) {
    try {
        const refreshedAccessToken = await getRefreshedAccessToken();
        console.log(" search with Access Token: " + refreshedAccessToken);
        console.log("Album: " + JSON.stringify(album) + " Artist: " + JSON.stringify(artist))
        // const queryString = `album:${album.split(' ').join(' ')}+artist%3A${artist.split(' ').join('%20')}`
        // console.log("queryString: " + queryString);
        // axios.interceptors.request.use(config => {
        //     return qs.stringify({ a: { b: 'c' } }, {
        //         encoder: function (str) {

        //         }
        //     })
        // })

        axios.interceptors.request.use(request => {
            console.log('Starting Request', JSON.stringify(request, null, 2))
            return request
          })

        const url = `https://api.spotify.com/v1/search?query=artist%3A${encodeURIComponent(artist)}+album%3A${encodeURIComponent(album)}`
        const { data } = await axios.get(
            url,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${refreshedAccessToken}`,
                    "Content-Type": "application/json",
                },
                params: {
                    type: "album",
                    limit: 5,
                    offset: 0
                }
            })
        console.log("mydata call: " + JSON.stringify(data.albums.items.map(album => pruneAlbum(album))));
        return data.albums.items.map(album => pruneAlbum(album));
    } catch (error) {
        console.log(error.response);
    }
}
