import albumGridStyle from './albumGrid.module.css';
import Album from './Album';

export default function AlbumGrid(props) {

  
  const albums = props.albums.map((album) => {
    return <Album
      album={album}
    />

  })



    return(
    <div className={albumGridStyle.albumGrid}>
      {albums}
    </div>
  )
}