import axios from 'axios';
import qs from 'qs';

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
// const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

export async function getAuth() {
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

    const headers = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
            username: clientId,
            password: clientSecret,
        },
    };
    const data = {
        grant_type: 'client_credentials',
    };

    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            qs.stringify(data),
            headers
        );
        return response.data.access_token;
    } catch (error) {
        console.log(error);
    }
};

// export async function getUserAuth() {
//     try{
//         const response = await axios.get(
//             'https://accounts.spotify.com/authorize',
//             {
//                 params: {
//                     response_type: 'code',
//                     client_id: clientId,
//                     scope: 'user-read-private user-read-email',
//                     redirect_uri: 'http://localhost:3000/favAlbums',

//                 }
//             }
//         )
//         return response.data;
//     } catch (error) {
//         console.log(error);
//     }
// }

// export async function getAccessToken(code) {
//     const headers = {
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         auth: {
//           username: clientId,
//           password: clientSecret,
//         },
//       };
//       const data = {
//         grant_type: 'authorization_code',
//         code: code,
//         redirect_uri: 'http://localhost:3000/favAlbums'
//       };


//     try{
//         const response = await axios.post(
//             'https://accounts.spotify.com/api/token',
//             qs.stringify(data),
//             headers
//         )

//         return response.data;
//     } catch(error) {
//         console.log(error);
//     }
// }

export async function getRefreshedAccessToken() {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

   console.log("print refresh token: " + refreshToken);

    const headers = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + Buffer.from(
                clientId + ":" + clientSecret
              ).toString("base64"),
        },
        // auth: {
        //     username: clientId,
        //     password: clientSecret,
        // },
    };
    const data = {
        grant_type: 'refresh_token',
        refresh_token: refreshToken
    };


    try {
        // axios.interceptors.request.use(request => {
        //     console.log('Starting Request', JSON.stringify(request, null, 2))
        //     return request
        //   })

        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            qs.stringify(data),
            headers
        )
        return response.data.access_token;
    } catch (error) {
        console.log(error.response);
    }
}
