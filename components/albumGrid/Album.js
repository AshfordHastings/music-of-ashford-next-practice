import { useState } from "react";
import Link from 'next/link'

import albumGridStyle from './albumGrid.module.css';
import Layout from "../layout/Layout";

export default function Album(props) {
    const [style, setStyle] = useState(albumGridStyle.albumMouseOff);

    return(
      
        <div 
        className={style}
        onMouseEnter={() => setStyle(albumGridStyle.albumMouseOn)}
        onMouseLeave={() => setStyle(albumGridStyle.albumMouseOff)}
        onClick={() => props.handleSelectAlbum(props.album.id)}
        >
          <div className={albumGridStyle.albumText}>
            {props.album.name}
               -
            <br />
            {props.album.artists[0].name}
          </div>
          <img
            src={props.album.images[0].url}
            alt={props.album.name}
          />
        </div>
      
    )
}