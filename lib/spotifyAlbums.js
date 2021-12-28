import axios from 'axios';
import { getAuth } from './spotifyAuth';


export async function getAlbumDataById(albumId) {
    try {
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            // token stored as global variable
            Authorization: `Bearer ${await getAuth()}`,
        };

        const { data } = await axios.get(
            `https://api.spotify.com/v1/albums/${albumId}`, { headers });
        return data;
    } catch (err) {
        console.log(err);
    }
}