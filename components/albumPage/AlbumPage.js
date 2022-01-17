import albumPageStyle from './albumPage.module.css';
import ReviewBox from '../reviewBox/reviewBox';

export default function AlbumPage(props) {
  const releaseDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    console.log(`${month} ${date.getDay}, ${date.getFullYear}`)
    return `${month} ${date.getDay()}, ${date.getFullYear()}`;
  }

  const millisToMinutes = (millis) => {
    console.log(millis);
    console.log(parseInt(millis) )
    const minutes = Math.floor(parseInt(millis) / 60000);
    return minutes;
  }

  return (
    <div className={albumPageStyle.albumPageContainer}>
      <div className={albumPageStyle.albumInfoContainer}>
        <div className={albumPageStyle.albumInfoContainerA}>
          <img src={props.albumData.images[0].url} alt={props.albumData.name} />
          <div className={albumPageStyle.albumInfo}>
            <h2>{props.albumData.name}</h2>
            <h3>{props.albumData.artists[0].name}</h3>
          </div>
        </div>
        <div className={albumPageStyle.albumInfoContainerB}>
          {/* <h2>{millisToMinutes(props.albumData.duration_ms)} minutes</h2> */}
          <h2>Released {releaseDate(props.albumData.release_date)}</h2>
          <h2><a href={props.albumData.external_urls.spotify} target='_blank'>Listen</a></h2>
        </div>
      </div>
      <ReviewBox />
      <div
        onClick={() => props.handleBackClick()}
      >
        Back
      </div>
    </div>
  );
}