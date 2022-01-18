import { getAlbumsOnAlbumListById } from '../api/albums/albums';
import { getAlbumListById } from '../api/albumlist';
import Layout from '../../components/layout/Layout';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useState, useEffect } from 'react';
import SearchAlbumContainer from '../../components/searchAlbum/SearchAlbumContainer';
import moment from "moment";

import style from '../../components/pageStyles/list.module.css';
import { getAlbumOnAlbumList } from '../api/albumsonalbumlists';

export default function List(props) {

    const [albums, setAlbums] = useState([]);
    const [searchMenuShown, setShowSearchMenu] = useState(false);
    const [editModeOn, setEditModeOn] = useState(false);

    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const router = useRouter();

    useEffect(() => {
        if (props.albums != undefined) {
            setAlbums(props.albums)
        }

        setEditTitle(props.albumList.title);
        setEditDescription(props.albumList.description);

    }, []);

    const onAddAlbum = async (album) => {
        let date = new Date();
        setAlbums(albums.concat({
            ...album,
            addedAt: date.toISOString(),
        }));
        console.log("albumAdded: " + JSON.stringify(album));
        const response = await axios.put('/api/albumsonalbumlists', {
            album,
            id: props.albumList.id
        });
    }

    const onRemoveAlbum = async (album) => {
        setAlbums(albums.filter(item => item.spotifyId !== album.spotifyId));
        const response = await axios.delete('/api/albumsonalbumlists', {
            data: {
                album,
                albumList: props.albumList
            }
        });
    }


    const onRemoveAlbumList = async () => {
        const response = await axios.delete('/api/albumlist', {
            data: {
                albumList: props.albumList
            }
        });
        router.push('/albumLists');

    }




    const onShowSearchMenu = () => {
        setShowSearchMenu(true);
    }

    const onHideSearchMenu = () => {
        setShowSearchMenu(false)
    }

    const onEditModeOn = () => {
        setEditModeOn(true);
    }

    const onSaveEdit = async () => {
        setEditModeOn(false);
        const response = await axios.put('/api/albumlist', {
            id: props.albumList.id,
            title: editTitle,
            description: editDescription
        });
    }

    const onCancelEdit = () => {
        setEditModeOn(false);
        setEditTitle(props.albumList.title);
        setEditDescription(props.albumList.description);
    }


    const albumEntries = albums.map(album =>
        <AlbumEntry
            album={album}
            editModeOn={editModeOn}
            onRemoveAlbum={onRemoveAlbum}
            onEditModeOn={onEditModeOn}
        />
    )

    const searchMenu = (searchMenuShown == true) ? (
        <SearchAlbumContainer
            onAddAlbum={onAddAlbum}
            onHideSearchMenu={onHideSearchMenu}
        />
    ) : (
        <a className={style.addAlbumIcon} onClick={onShowSearchMenu}>
            <Image src='/images/plus-circle.png' alt='Add Album' width={100} height={100} />
        </a>
    )


    return (
        <>
            <Layout>
                <div className={style.albumListContainer}>
                    <div className={style.backArrow}>
                        <Link href='/albumLists'>
                            <a>
                                <Image src='/images/arrow-left.png' alt='Back Arrow' width={100} height={100} />
                            </a>
                        </Link>
                    </div>
                    {!editModeOn ?
                        <div className={style.listInfoContainer}>
                            <div className={style.listTitle}>
                                {editTitle}
                                <a className={style.editIcon} onClick={onEditModeOn}>
                                    <Image src='/images/edit-icon.png' alt='Edit Icon' width={18} height={18} />
                                </a>
                            </div>

                            <div className={style.listDescription}>
                                {editDescription}</div>

                        </div>
                        :
                        <div className={style.listInfoContainer}>
                            <input type='text' value={editTitle} onChange={(e) => setEditTitle(e.target.value)}></input>
                            <input type='description' value={editDescription} onChange={(e) => setEditDescription(e.target.value)}></input>
                            <div className={style.saveEditButton} onClick={onSaveEdit}>Save</div>
                            <div className={style.saveEditButton} onClick={onCancelEdit}>Cancel</div>
                        </div>
                    }

                    <div className={style.albumEntryContainer}>
                        {albumEntries}
                    </div>
                    <div className={style.searchMenuContainer}>
                        {searchMenu}
                    </div>
                    {editModeOn == true &&
                        <div className={style.removeAlbumList}>
                            <a onClick={() => onRemoveAlbumList()}>
                                Delete {props.albumList.title}
                            </a>
                        </div>
                    }
                </div>
            </Layout >
        </>
    )
}



export function AlbumEntry(props) {
    let dateReleased = new Date(Date.parse(props.album.date_released))

    return (
        <div className={style.albumEntry}>
            <div className={style.imageContainer}>
                <Image src={props.album.image} alt='Add List' width={100} height={100} />
            </div>
            <div className={style.albumInfoContainer}>
                <div className={style.albumTitle}>{props.album.name}</div>
                <div className={style.albumArtist}>{props.album.artist}</div>
                <div className={style.dateReleased}>{dateReleased.getFullYear()}</div>
            </div>
            <div className={style.rightMenu}>
                <div className={style.albumAdded}>{moment(props.album.addedAt).fromNow()}</div>
                <div className={style.spotifyIcon}>
                    <Link
                        href={`/lists`}>
                        <a>
                            <Image src='/images/spotify-icon.png' alt='Spotify Icon' width={18} height={18} />
                        </a>
                    </Link>
                </div>
                {props.editModeOn == true &&
                    <a className={style.deleteIcon} onClick={() => props.onRemoveAlbum(props.album)}>
                        <Image src='/images/delete-icon.png' alt='delete' width={40} height={28} />
                    </a>
                }


            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { params } = context;

    const albumList = await getAlbumListById(params.id);
    const albumsDBBare = await getAlbumsOnAlbumListById(params.id);

    const albums = await Promise.all(albumsDBBare.map(album => {
        return getAlbumOnAlbumList(album, albumList).then(albumInfo => {
            console.log("albumInfo: " + JSON.stringify(albumInfo))
            let addedAt = new Date(albumInfo.addedAt);
            return (
                {
                    ...album,
                    date_released: album.date_released.toString(),
                    ...albumInfo,
                    addedAt: addedAt.toISOString()
                }
            )
        })
            ;
    }));

    albums.sort((a, b) => -a.addedAt.localeCompare(b.addedAt))


    return {
        props: {
            albumList: albumList,
            albums: albums
        }
    }
}