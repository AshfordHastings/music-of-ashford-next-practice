export function pruneTrack(track) {
    //console.log("pre-prune: " + JSON.stringify(track));
    delete track.album.available_markets;
    delete track.artists[0].available_markets;
    delete track.available_markets;
    delete track.disc_number
    delete track.explicit;
    delete track.external_ids;
    console.log("post-prune: " + JSON.stringify(track));
    return track
}


export function pruneAlbum(album) {
    delete album.available_markets;
    return album;
}

export function dateTimeToMS(dateString) {
    return Date.parse(dateString);
}