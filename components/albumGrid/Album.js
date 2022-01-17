import { useState } from "react";
import Link from 'next/link'

import albumGridStyle from './albumGrid.module.css';
import Layout from "../layout/Layout";

export default function Album(props) {
  const [style, setStyle] = useState(albumGridStyle.albumMouseOff);

  const deleteButton = (!props.onRemoveAlbum) ? null :
    <div
      onClick={() => props.onRemoveAlbum(props.album.spotifyId)}
    >
      X
    </div>


  return (
    <div>
      {deleteButton}

      <div
        className={style}
        onMouseEnter={() => setStyle(albumGridStyle.albumMouseOn)}
        onMouseLeave={() => setStyle(albumGridStyle.albumMouseOff)}
        onClick={() => props.onSelectAlbum(props.album)}
      >
        <div className={albumGridStyle.albumText}>
          {props.album.name}
          -
          <br />
          {props.album.artist}
        </div>
        <img
          src={props.album.image}
          alt={props.album.name}
        />
      </div>
    </div >

  )
}