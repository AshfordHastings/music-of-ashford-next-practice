import { v4 as uuidv4 } from 'uuid';

import client from './../prisma';
import { pruneAlbum } from '../../../lib/helper';
import { getAlbumDataById, getRecentlyPlayedTracks, searchSpotifyAlbum } from '../spotify/spotifyAlbums';
import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';

const favAlbums = [
    {
        album_id: '6klYyVkzntFBjJch93UB6y'
    },
    // {
    //     album_id: '5nTalKcL6vhFMNihs0b3iU'
    // },
    // {
    //     album_id: '0vuwlanMPucXrYMGnOjhYL'
    // },
    // {
    //     album_id: '5kBxkUFvOgxNHDu0kHEeuS'
    // }
];

export default async function handler(req, res) {
    if (req.method === 'POST') {
        console.log(JSON.stringify(req.body));
        const album_id = req.body.album_id;
        const album = await addFavAlbum(
            album
        );
        return res.status(200).json(album);
    } else if (req.method === "DELETE") {
        console.log(JSON.stringify(req.body));
        const album_id = req.body.album_id;
        const album = await removeFavAlbum(album_id);
        return res.status(200).json(album);
    }
}


export async function getFavAlbums() {
    const albumsData = await
        client.album.findMany({
        });

    // const albumDataUnpruned = await Promise.all(albumsDBData.map((album) => {
    //     // console.log('album_id: ' + album.album_id)
    //     return getAlbumDataById(album.album_id);
    // }));

    // const albumsData = albumDataUnpruned.map((album) => {
    //     // console.log('album: ' + JSON.stringify(album));
    //     return pruneAlbum(album)
    // })
    return albumsData;
}

export async function addFavAlbum(album) {
    console.log("About to add album with id: " + album.spotify_id)
    try {
        const album = await client.album.create
            ({
                data: {
                    spotifyId: album.spotify_id,
                    name: album.name,
                    description: album.description,
                    image: album.image
                }
            })
        return album;
    } catch (e) {
        console.log(e);
    }
}

export async function removeFavAlbum(album_id) {
    console.log("About to remove album with id: " + album_id)
    try {
        const album = await client.album.deleteMany({
            where: {
                spotifyId: album_id
            }
        })
        return album;
    } catch (e) {
        console.log(e);
    }
}


export async function getAlbumById(id) {
    return await getAlbumDataById(id)
}

export function getAllAlbumIds() {
    return favAlbums.map((album) => album.album_id.toString());
}

export async function getRecentAlbums() {
    /*
        Get list of recent tracks
        Start loop and put albums into a map
            map id to the album info
        send the album info to an album list
    */
    const recentTracks = await getRecentlyPlayedTracks();

    const recentAlbumMap = new Map();
    recentTracks.map((track) => {
        recentAlbumMap.set(track.album.id, track.album);
    });


    return Array.from(recentAlbumMap.values()).map(album => {
        return {
            spotifyId: album.id,
            name: album.name,
            artist: album.artists[0].name,
            date_released: Date.parse(album.release_date),
            image: album.images[0].url
        }
    });
}

// export async function searchAlbum(albumName, artistName) {
//     console.log("blob");
//     return searchSpotifyAlbum(albumName, artistName);
// }

export async function getAlbumsOnAlbumListById(albumListId) {
    const albumsData = await
        client.album.findMany({
            where: {
                albumLists: {
                    some: {
                        albumListId: parseInt(albumListId)
                    }
                }
            }
        });


    return albumsData;
}

