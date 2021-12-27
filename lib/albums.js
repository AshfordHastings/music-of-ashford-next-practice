import { v4 as uuidv4 } from 'uuid';

const favoriteAlbums = [
    {
        id: 1,
        title: "Led Zeppelin IV",
        artist: "Led Zeppelin",
        album_art: "https://www.albumartexchange.com/coverart/gallery/le/ledzeppelin_ledzeppeliniv_13px.jpg",
    },
    {
        id: 2,
        title: "Darkness on the Edge of Town",
        artist: "Bruce Springsteen",
        album_art: "https://www.albumartexchange.com/coverart/gallery/br/brucespringsteen_darknessontheedgeoft_mrj.jpg",
    },
    {
        id: 3,
        title: "In the Aeroplane Over the Sea",
        artist: "Neutral Milk Hotel",
        album_art: "https://www.albumartexchange.com/coverart/gallery/ne/neutralmilkhotel_intheaeroplaneoverth_eer.jpg",
    },
    {
        id: 4,
        title: "The Fat of the Land",
        artist: "The Prodigy",
        album_art: "https://www.albumartexchange.com/coverart/gallery/th/theprodigy_thefatofthelandexpan_5bva.jpg",
    }
]

export async function getAllAlbums() {
    return favoriteAlbums;
}

export async function getAlbumById(id) {
    return favoriteAlbums.find( (album) => album.id == id);
}

export async function getAllAlbumIds() {
    return favoriteAlbums.map( (album) => album.id.toString());
}