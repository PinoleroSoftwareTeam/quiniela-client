import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Esto es una prueba 2.0</title>
        <meta name="description" content="Quiniela App" />
      </Head>

      <main>
        <Layout></Layout>
      </main>
    </div>
  );
};

export default Home;
