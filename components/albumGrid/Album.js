import { useState } from "react";
import Link from 'next/link'

import albumGridStyle from './albumGrid.module.css';
import Layout from "../layout/Layout";

export default function Album(props) {
    const [style, setStyle] = useState(albumGridStyle.albumMouseOff);

    return(
      <Link
      href={`albums/${props.album.id}`}>
        <div 
        className={style}
        onMouseEnter={() => setStyle(albumGridStyle.albumMouseOn)}
        onMouseLeave={() => setStyle(albumGridStyle.albumMouseOff)}
        
        >
          <div className={albumGridStyle.albumText}>
            {props.album.title}
               -
            <br />
            {props.album.artist}
          </div>
          <img
            src={props.album.album_art}
            alt={props.album.title}
          />
        </div>
      </Link>
    )
}