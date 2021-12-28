import { useState } from "react";
import AlbumPage from "../albumPage/AlbumPage";
import AlbumGrid from "../albumGrid/AlbumGrid";

export default function AlbumPageNavigator(props) {

    const [display, setDisplay] = useState("grid");
    const [albumSelected, setAlbumSelected] = useState("");

    const handleSelectAlbum = (id) => {
        setAlbumSelected(id);
    }

    const handleBackClick = () => {
        setAlbumSelected("");
    }

    if (albumSelected == "") {
        return (
            <>
                <AlbumGrid
                    favAlbumsData={props.favAlbumsData}
                    handleSelectAlbum={handleSelectAlbum}
                />
            </>
        )
    } else {
        console.log(props.favAlbumsData.find((album) => album.id == albumSelected));
        return (
            <>
                <AlbumPage
                    albumData={props.favAlbumsData.find((album) => album.id == albumSelected)}
                    handleBackClick={handleBackClick}
                />
            </>
        )
    }
}