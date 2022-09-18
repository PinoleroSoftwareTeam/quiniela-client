import { Dashboard } from '../components/Dashboard';
import Head from 'next/head';
import Layout from '../components/Layout';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Quiniela</title>
        <meta name="description" content="Quiniela App" />
      </Head>
      <main>
        <Layout>
          <Dashboard></Dashboard>
        </Layout>
      </main>
    </div>
  );
};

export default Home;
