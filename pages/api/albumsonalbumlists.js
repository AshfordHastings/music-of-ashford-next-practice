
import client from './prisma';

export default async function handler(req, res) {
    if(req.method === 'GET') {
        console.log(JSON.stringify(req.body));
        const albumList = req.body.albumList
        const album = req.body.album
        const data = await getAlbumOnAlbumList(album, albumList)
        return res.status(200).json(data);
    } else if(req.method === 'DELETE') {
        console.log(JSON.stringify(req.body));
        const albumList = req.body.albumList
        const album = req.body.album
        const data = await removeAlbumFromAlbumList(album, albumList)
        return res.status(200).json(data);
    } else if (req.method === 'PUT') {
        console.log(JSON.stringify(req.body));
        const album_id = req.body.id;
        const album = req.body.album
        const data = await addAlbumToAlbumList(album, album_id)
        return res.status(200).json(data);
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

export async function getAlbumOnAlbumList(album, albumList) {
    const albumOnAlbumListQuery = await
        client.albumsOnAlbumLists.findUnique({
            where: {
                albumId_albumListId: {albumId: album.spotifyId, albumListId: albumList.id}
            },
        });
    return albumOnAlbumListQuery;
}


export async function addAlbumToAlbumList(album, id) {
    //const client = await getClient();
    const albumQuery = await
        client.album.findUnique({
            where: {
                spotifyId: album.spotifyId,
            },
        });
    let albumData = null;
    if(albumQuery) {
        albumData = albumQuery;
    } else {
        albumData = await client.album.create({
            data: {
                spotifyId: album.spotifyId,
                name: album.name,
                artist: album.artist,
                date_released: new Date(album.date_released),
                image: album.image,
            },
        })
    }

    await client.albumsOnAlbumLists.create({
        data:{
            album: {
                connect: {
                    spotifyId: albumData.spotifyId
                }
            },
            albumList: {
                connect: {
                    id: id
                }
            }
        }
    })
    
    return albumData;

}


export async function removeAlbumFromAlbumList(album, albumList) {
    //const client = await getClient();
    const albumOnAlbumListQuery = await
        client.albumsOnAlbumLists.deleteMany({
            where: {
                albumListId: albumList.id,
                albumId: album.spotifyId
            },
        });
    return albumOnAlbumListQuery;
}
