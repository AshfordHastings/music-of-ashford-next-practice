import { useState } from "react";
import AlbumPage from "../albumPage/AlbumPage";
import AlbumGrid from "../albumGrid/AlbumGrid";

export default function AlbumPageNavigator(props) {

    const [display, setDisplay] = useState("grid");
    const [albumSelected, setAlbumSelected] = useState("");

    const onSelectAlbum = (id) => {
        setAlbumSelected(id);
    }

    const handleBackClick = () => {
        setAlbumSelected("");
    }

    if (albumSelected == "") {
        return (
            <>
                <AlbumGrid
                    albumsData={props.albumsData}
                    onRemoveAlbum={props.onRemoveAlbum}
                    onSelectAlbum={onSelectAlbum}
                />
            </>
        )
    } else {
        console.log(props.albumsData.find((album) => album.id == albumSelected));
        return (
            <>
                <AlbumPage
                    albumData={props.albumsData.find((album) => album.id == albumSelected)}
                    handleBackClick={handleBackClick}
                />
            </>
        )
    }
}