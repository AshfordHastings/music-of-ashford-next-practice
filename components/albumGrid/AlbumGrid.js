import { useState } from 'react';

import albumGridStyle from './albumGrid.module.css';
import Album from './Album';

export default function AlbumGrid(props) {

  // albumGrid
  const [display, setDisplay] = useState(albumGridStyle.albumMouseOff);
  
  const albums = props.favAlbumsData.map((album) => {
    return <Album
      album={album}
      handleSelectAlbum={props.handleSelectAlbum}
    />

  })



    return(
    <div className={albumGridStyle.albumGrid}>
      {albums}
    </div>
  )
}