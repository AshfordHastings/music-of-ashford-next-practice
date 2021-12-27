import albumPageStyle from './albumPage.module.css';

export default function AlbumPage(props) {
  return (
    <div className={albumPageStyle.albumPageContainer}>
      <div className={albumPageStyle.albumInfoContainer}>
        <img src={props.album.album_art} alt={props.album.title} />
        <div className={albumPageStyle.albumInfo}>
          <h2>{props.album.title}</h2>
          <h3>{props.album.artist}</h3>
        </div>
      </div>
      <div className={albumPageStyle.albumNoteContainer}>
        <div className={albumPageStyle.albumNote}>Here is my review</div>
      </div>
    </div>
  );
}