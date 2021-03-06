
import { isValidElement, useEffect, useState } from "react"
import axios from "axios";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout'
import { getAlbumLists } from "./api/albumlist";
import style from '../components/pageStyles/albumListDisplay.module.css'
import { getAlbumListInfo } from "./api/albumlist/info";
import moment from "moment";

export default function AlbumLists(props) {
    return (
        <>
            <Layout>
                <AlbumListDisplay
                    albumLists={props.albumListsData}
                />
            </Layout>
        </>
    )
}

export function AlbumListDisplay(props) {
    const [albumLists, setAlbumLists] = useState([]);
    const [newAlbumLists, setNewAlbumLists] = useState([]);

    const [editModeOn, setEditModeOn] = useState(false);

    useEffect(() => {
        if (props.albumLists != undefined) {
            setAlbumLists(props.albumLists)
        }
    }, []);

    const onEditModeOn = () => {
        if (editModeOn == true) {
            setEditModeOn(false);
        } else {
            setEditModeOn(true);
        }

    }

    const onAddAlbumList = () => {
        setNewAlbumLists(newAlbumLists.concat({
            id: Date.now(),
            title: '',
            description: ''
        }))
    }

    const onSaveAlbumList = async (newAlbumList) => {
        let date = new Date();

        setNewAlbumLists(newAlbumLists.filter(albumList => albumList.id !== newAlbumList.id))
        const response = await axios.post('/api/albumlist', {
            title: newAlbumList.title,
            description: newAlbumList.description
        });
        console.log("onSaveAlbumList response: " + JSON.stringify(response));
        setAlbumLists(albumLists.concat({
            ...response.data,
            itemCount: 0,
            lastUpdated: date.toISOString(),
            albumImages: []
        }
        ));
    }

    const onCancelAlbumList = (id) => {
        console.log("canceling: " + id);
        setNewAlbumLists(newAlbumLists.filter(item => item.id !== id));
    }

    const onRemoveAlbumList = async (albumList) => {
        setAlbumLists(albumLists.filter(item => item.id !== albumList.id));
        const response = await axios.delete('/api/albumlist', {
            data: {
                albumList
            }
        });
    }

    const albumListEntries = albumLists.map(albumList =>
        <AlbumListEntry
            key={albumList.id}
            albumList={albumList}
            onRemoveAlbumList={onRemoveAlbumList}
            editModeOn={editModeOn}
        />
    )

    const newAlbumListEntries = newAlbumLists.map(albumList =>
        <NewAlbumListEntry
            key={albumList.id}
            albumList={albumList}
            onSaveAlbumList={onSaveAlbumList}
            onCancelAlbumList={onCancelAlbumList}
        />
    )

    return (
        <div className={style.albumListsDisplayContainer}>
            <div className={style.pageTitle}>
                Album Lists

                <a className={style.editIcon} onClick={onEditModeOn}>
                    <Image src='/images/edit-icon.png' alt='Edit Icon' width={18} height={18} />
                </a>

            </div>
            <div className={style.albumListsContainer}>
                {albumListEntries}
                {newAlbumListEntries}
            </div>
            <div className={style.addListImage} onClick={onAddAlbumList}>
                <a>
                    <Image src='/images/plus-circle.png' width={100} height={100} />
                </a>
            </div>
        </div>
    )
}

export function AlbumListEntry(props) {
    const albumImages = (props.albumList.albumImages) ? props.albumList.albumImages.map(image =>
        <div 
            key={Math.random().toString(16).slice(2)}
            className={style.albumImage}>
            <Image src={image} width={65} height={65} />
        </div>
    ) : null

    return (
        <div className={style.albumListEntry}>
            <div className={style.imageContainer}>
                {albumImages}
            </div>
            <div className={style.infoContainer}>
                <div className={style.listTitle}>
                    <Link href={`lists/${props.albumList.id}`}>
                        <a>
                            {props.albumList.title}
                        </a>
                    </Link>
                </div>
                <div className={style.listDescription}>{props.albumList.description}</div>
                <div className={style.listItemCount}>{props.albumList.itemCount} Items</div>
            </div>

            <div className={style.rightMenu}>
                <div className={style.listLastUpdated}>{moment(props.albumList.lastUpdated).fromNow()}</div>
                {/* <Link href=''>
                    <a>
                        <Image src='/images/spotify-icon.png' alt='Spotify Icon' width={18} height={18} />
                    </a>
                </Link > */}
                {
                    props.editModeOn == true &&
                    <a className={style.deleteIcon} onClick={() => props.onRemoveAlbumList(props.albumList)}>
                        <Image src='/images/delete-icon.png' alt='delete' width={40} height={28} />
                    </a>
                }
            </div>

        </div >
    )
}

export function NewAlbumListEntry(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    return (
        <div className={style.albumListEntry}>
            <div className={style.imageContainer}>
                </div>
                <div className={style.addInfoContainer}>
                    <input type='text' value={title} placeholder='Title' onChange={(e) => setTitle(e.target.value)} className={style.addTitle} />
                    <textarea value={description} placeholder='Description' onChange={(e) => setDescription(e.target.value)} className={style.addDescription} />
                    <button onClick={() => props.onSaveAlbumList({
                        id: props.albumList.id,
                        title: title,
                        description: description
                    })} className={style.addButton}>Create List</button>
                    <button onClick={() => props.onCancelAlbumList(props.albumList.id)} className={style.addButton}>Cancel</button>
                </div>
            </div>
    )
}


export async function getServerSideProps() {
    // const albumListsData = [
    //     {
    //         id: 1,
    //         title: "Classic Rock Favorites",
    //         description: "These albums are dedicated to all of my favorite classic rock albums.",
    //         items: 36
    //     },
    //     {
    //         id: 2,
    //         title: "Best 80's Albums",
    //         description: "These albums are dedicated to all of my favorite albums from the 80's.",
    //         items: 20
    //     },
    //     {
    //         id: 3,
    //         title: "Cool Metal Albums",
    //         description: "These albums are dedicated to cool metal albums that I have been listening to recently.",
    //         items: 59
    //     }
    // ]
    const albumLists = await getAlbumLists();
    const albumListsData = await Promise.all(albumLists.map(albumList => {
        return getAlbumListInfo(albumList.id).then(albumInfo => {
            console.log("albumInfo: " + JSON.stringify(albumInfo))
            return (
                {
                    ...albumList,
                    ...albumInfo,
                    lastUpdated: albumInfo.lastUpdated
                }
            )
        });
    }));

    albumListsData.sort((a, b) => -a.lastUpdated.localeCompare(b.lastUpdated))

    return {
        props: {
            albumListsData
        }
    }
}