import { v4 as uuidv4 } from 'uuid';

import client from '../prisma';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        console.log(JSON.stringify(req.body));
        const id = req.body.albumList.id
        const albumListInfo = await getAlbumListInfo(id
        );
        return res.status(200).json(albumListInfo);
    }
}

// let db = null;
// export async function getClient() {
//     if (db != null) {
//         return db;
//     } else {
//         db = new PrismaClient();
//         return db;
//     }
// }

export async function getAlbumListInfo(id) {
    // get albumArt from most recent four albums, date of most recent album added, and number of items on the list

    //const client = await getClient();
    const itemCount = await
        client.albumsOnAlbumLists.count({
            where: {
                albumListId: id
            }
        });

    let lastUpdated = await
        client.albumsOnAlbumLists.findFirst({
            where: {
                albumListId: id
            },
            orderBy: {
                addedAt: 'desc'
            },
            select: {
                addedAt: true,
            }
        })

    console.log("lastUpdated1: " + JSON.stringify(lastUpdated));
    // Add when the albumList creation date is added to the database
    if (lastUpdated == null) {
        let date = new Date();
        lastUpdated = date.toISOString();
    } else {
        let date = new Date(lastUpdated.addedAt);
        lastUpdated = date.toISOString();
    }

    console.log("lastUpdated: " + JSON.stringify(lastUpdated));
    const albumImages = await
        client.albumsOnAlbumLists.findMany({
            where: {
                albumListId: id,
            },
            orderBy: {
                addedAt: 'desc'
            },
            select: {
                album: {
                    select: {
                        image: true
                    }
                }
            },
            take: 4
        });

    return {
        itemCount,
        lastUpdated,
        albumImages: albumImages.map(albumImage => albumImage.album.image)
    };
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