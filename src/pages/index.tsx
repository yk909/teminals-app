import Head from 'next/head';
import { Inter } from 'next/font/google';
import Layout from '@/components/templates';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Terminal App</title>
        <meta name="description" content="Commune Terminal App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
          Hello
      </Layout>
    </>
  );
}
