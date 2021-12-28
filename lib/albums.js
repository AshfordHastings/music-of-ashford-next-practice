import { v4 as uuidv4 } from 'uuid';
import { getAlbumDataById } from './spotifyAlbums';

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

const favoriteAlbums = [
    {
        album_id: '6klYyVkzntFBjJch93UB6y'
    },
    {
        album_id: '5nTalKcL6vhFMNihs0b3iU'
    },
    {
        album_id: '0vuwlanMPucXrYMGnOjhYL'
    }, 
    {
        album_id: '5kBxkUFvOgxNHDu0kHEeuS'
    }
];

export function getFavAlbums() {
    return favoriteAlbums;
}


export function getAlbumById(id) {
    return favoriteAlbums.find( (album) => album.id == id);
}

export function getAllAlbumIds() {
    return favoriteAlbums.map( (album) => album.album_id.toString());
}

export function getCondensedAlbumData(albumData) {
    return {
        artists: albumData.artists,
        
    }
}