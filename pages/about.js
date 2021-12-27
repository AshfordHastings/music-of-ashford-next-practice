import Head from 'next/head'

import Layout from '../components/layout/Layout'

export default function About() {
    return (
        <Layout>
            <Head>
                <title>About the Website</title>
            </Head>
            <section>
                About the website!
            </section>
        </Layout>
    )
}