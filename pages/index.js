import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'

import Layout from '../components/layout/Layout'

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/albumLists');
}, []);


  return (
    <Layout>


    </Layout>
  )
}
