import { useState } from "react";

export default function SearchMenu(props) {
    const [artistSearch, setArtistSearch] = useState('');
    const [albumSearch, setAlbumSearch] = useState('');

    const onHandleSearch = (e) => {
        console.log("Search button pressed");
        e.preventDefault();
        props.onSearchAlbum(albumSearch, artistSearch);
    }

    return (
        <form>
            <input type="text" id="artist" name="artist" value={artistSearch} onChange={(e) => setArtistSearch(e.target.value)} />
            <input type="text" id="album" name="album" value={albumSearch} onChange={(e) => setAlbumSearch(e.target.value)} />
            <button onClick={onHandleSearch}>Search</button>
        </form>
    )
}