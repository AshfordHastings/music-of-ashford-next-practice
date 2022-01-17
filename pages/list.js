export default function List(props) {
    return(
        <div>
            {props.albumList.title}
        </div>
    )
}


export async function getServerSideProps(context) {
    const { params } = context;
    console.log("params: " + JSON.stringify(params));
    const albumList = params.albumList;
    console.log(albumList);
    const albums = getAlbumsOnAlbumListById(albumList.id);

    return {
        props: {
            albumList: albumList,
            albums: albums
        }
    }
}