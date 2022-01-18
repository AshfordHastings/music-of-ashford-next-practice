import { useState } from "react";

import style from './searchBox.module.css';

export default function SearchMenu(props) {
    const [artistSearch, setArtistSearch] = useState('');
    const [albumSearch, setAlbumSearch] = useState('');

    const onHandleSearch = (e) => {
        console.log("Search button pressed");
        e.preventDefault();
        props.onSearchAlbum(albumSearch, artistSearch);
    }

    const onHideSearchMenu = (e) => {
        e.preventDefault();
        props.onHideSearchMenu();
    }

    return (

        <form className={style.searchMenu}>
            <input className={style.searchMenuItem} type="text" id="artist" name="artist" placeholder='Artist' value={artistSearch} onChange={(e) => setArtistSearch(e.target.value)} />
            <input className={style.searchMenuItem} type="text" id="album" name="album" placeholder='Album' value={albumSearch} onChange={(e) => setAlbumSearch(e.target.value)} />
            <div className={style.searchButtonContainer}>
                <button onClick={onHandleSearch}>Search</button>
                <button onClick={onHideSearchMenu}>Cancel</button>
            </div>
        </form>



    )
}