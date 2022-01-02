import { v4 as uuidv4 } from 'uuid';
import { pruneAlbum } from './helper';

import { getAlbumDataById, getRecentlyPlayedTracks, searchSpotifyAlbum } from './spotifyCalls/spotifyAlbums';

// const favoriteAlbums = [
//     {
//         id: 1,
//         title: "Led Zeppelin IV",
//         artist: "Led Zeppelin",
//         album_art: "https://www.albumartexchange.com/coverart/gallery/le/ledzeppelin_ledzeppeliniv_13px.jpg",
//     },
//     {
//         id: 2,
//         title: "Darkness on the Edge of Town",
//         artist: "Bruce Springsteen",
//         album_art: "https://www.albumartexchange.com/coverart/gallery/br/brucespringsteen_darknessontheedgeoft_mrj.jpg",
//     },
//     {
//         id: 3,
//         title: "In the Aeroplane Over the Sea",
//         artist: "Neutral Milk Hotel",
//         album_art: "https://www.albumartexchange.com/coverart/gallery/ne/neutralmilkhotel_intheaeroplaneoverth_eer.jpg",
//     },
//     {
//         id: 4,
//         title: "The Fat of the Land",
//         artist: "The Prodigy",
//         album_art: "https://www.albumartexchange.com/coverart/gallery/th/theprodigy_thefatofthelandexpan_5bva.jpg",
//     }
// ]

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

export async function getFavAlbums() {
    const albumsData = await Promise.all(favAlbums
        .map((album) => {
            console.log('album_id: ' + album.album_id)
            return getAlbumDataById(album.album_id);
        })
        .map((album) => {
            console.log('album: ' + JSON.stringify(album));
            return pruneAlbum(album)
        })
    )
    // Awaits for the array of proises to be completed

    return albumsData;
}

export function addFavAlbum(album_id) {
    favAlbums.push({
        album_id
    })
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


    return Array.from(recentAlbumMap.values());
}

export async function searchAlbum(albumName, artistName) {
    console.log("blob");
    return searchSpotifyAlbum(albumName, artistName);
}

