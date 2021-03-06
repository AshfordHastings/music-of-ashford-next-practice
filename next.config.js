module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/albumLists',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
  env: {
    SPOTIFY_REFRESH_TOKEN: 'AQB-x4IzyTVpF4AZo1ZkDrJQEEt5YiDsHfzg0xXso3FdLHJSOBv9vTv0dkPWkVPka8uQCGGo-TwrNVyo_UUxsmjS3OgkuljVKsUtEF_BVnfz_2oUdhNXIaTkv7VbJXYLBo4'
  },
  images: {
    domains: ['ia804608.us.archive.org', 'i.scdn.co'],
  }
}
