import { v4 as uuidv4 } from 'uuid';

import client from './prisma';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        console.log(JSON.stringify(req.body));
        const albumLists = await getAlbumLists(
        );
        return res.status(200).json(albumLists);
    } else if (req.method === 'PUT') {
        console.log(JSON.stringify(req.body));
        const id = req.body.id;
        const titleEdit = req.body.title;
        const descriptionEdit = req.body.description;
        const data = await updateAlbumList(id, titleEdit, descriptionEdit)
        return res.status(200).json(data);
    } else if (req.method === 'POST') {
        const title = req.body.title;
        const description = req.body.description;
        const data = await createAlbumList(title, description)
        return res.status(200).json(data);
    } else if (req.method === 'DELETE') {
        const id = req.body.albumList.id;
        const data = await deleteAlbumList(parseInt(id));
        return res.status(200).json(data);
    }
}

let db = null;
// export async function getClient() {
//     if (db != null) {
//         return db;
//     } else {
//         db = new PrismaClient();
//         return db;
//     }
// }

export async function getAlbumLists() {
    //const client = await getClient();
    const albumListsData = await
        client.albumList.findMany({
        }
        );

    return albumListsData;
}

export async function getAlbumListById(id) {
    //const client = await getClient();
    const albumListData = await
        client.albumList.findUnique({
            where: {
                id: parseInt(id),
            },
        });

    return albumListData;
}

export async function updateAlbumList(id, titleEdit, descriptionEdit) {
    //const client = await getClient();
    const albumListData = await
        client.albumList.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title: titleEdit,
                description: descriptionEdit
            }
        });

    return albumListData;
}

export async function createAlbumList(title, description) {
    //const client = await getClient();
    const albumListData = await
        client.albumList.create({
            data: {
                title: title,
                description: description
            }
        });

    return albumListData;
}

export async function deleteAlbumList(id) {
    //const client = await getClient();
    const [albumsOnAlbumsListsData, albumListData] = await client.$transaction([
        client.albumsOnAlbumLists.deleteMany({
            where: {
                albumListId: id
            },
        }),
        client.albumList.delete({
            where: {
                id: id
            }
        })
    ])

    return albumListData;
}
// export async function addFavAlbum(album) {
//     console.log("About to add album with id: " + album.spotify_id)
//     try {
//         const client = await getClient();
//         const album = await client.album.create
//         ({
//             data: {
//                 spotifyId: album.spotify_id,
//                 name: album.name,
//                 description: album.description,
//                 image: album.image
//             }
//         })
//         return album;
//     } catch (e) {
//         console.log(e);
//     }
// }

// export async function removeFavAlbum(album_id) {
//     console.log("About to remove album with id: " + album_id)
//     try {
//         const client = await getClient();
//         const album = await client.album.deleteMany({
//             where: {
//                 spotifyId: album_id
//             }
//         })
//         return album;
//     } catch (e) {
//         console.log(e);
//     }
// }


// export async function getAlbumById(id) {
//     return await getAlbumDataById(id)
// }

// export function getAllAlbumIds() {
//     return favAlbums.map((album) => album.album_id.toString());
// }

// export async function getRecentAlbums() {
//     /*
//         Get list of recent tracks
//         Start loop and put albums into a map
//             map id to the album info
//         send the album info to an album list
//     */
//     const recentTracks = await getRecentlyPlayedTracks();

//     const recentAlbumMap = new Map();
//     recentTracks.map((track) => {
//         recentAlbumMap.set(track.album.id, track.album);
//     });


//     return Array.from(recentAlbumMap.values());
// }

// export async function searchAlbum(albumName, artistName) {
//     console.log("blob");
//     return searchSpotifyAlbum(albumName, artistName);
// }

