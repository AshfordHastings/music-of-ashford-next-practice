import albumPageStyle from './albumPage.module.css';

export default function AlbumPage(props) {
  return (
    <div className={albumPageStyle.albumPageContainer}>
      <div className={albumPageStyle.albumInfoContainer}>
        <img src={props.albumData.images[0].url} alt={props.albumData.name} />
        <div className={albumPageStyle.albumInfo}>
          <h2>{props.albumData.name}</h2>
          <h3>{props.albumData.artists[0].name}</h3>
        </div>
      </div>
      <div className={albumPageStyle.albumNoteContainer}>
        <div className={albumPageStyle.albumNote}>Here is my review</div>
      </div>
      <div
        onClick={() => props.handleBackClick()}
        > 
        Back
      </div>
    </div>
  );
}