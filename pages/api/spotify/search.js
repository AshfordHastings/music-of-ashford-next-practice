
import { getRefreshedAccessToken } from './spotifyAuth';

import axios from 'axios';
import client from './../prisma';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        console.log(JSON.stringify(req.query));
        const albumSearch = req.query.albumSearch;
        const artistSearch = req.query.artistSearch;
        const searchResults = await searchSpotifyAlbum(albumSearch, artistSearch);
        return res.status(200).json(searchResults);
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
            return data.albums.items;
        // console.log("mydata call: " + JSON.stringify(data.albums.items.map(album => pruneAlbum(album))));
        // return data.albums.items.map(album => pruneAlbum(album));
    } catch (error) {
        console.log(error.response);
    }
}