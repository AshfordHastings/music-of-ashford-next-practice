import { useState } from 'react';

import albumGridStyle from './albumGrid.module.css';
import Album from './Album';

export default function AlbumGrid(props) {

  // albumGrid
    console.log("myAlbumDataBlob: " + JSON.stringify(props.albumsData))

  const albums = (props.albumsData == undefined) ? null : props.albumsData.map((album) => {
    console.log("mapping album: " + album.spotifyId);
    return <Album
      key={album.spotifyId}
      album={album}
      onSelectAlbum={props.onSelectAlbum}
      onRemoveAlbum={props.onRemoveAlbum}
    />

  })



    return(
    <div className={albumGridStyle.albumGrid}>
      {albums}
    </div>
  )
}