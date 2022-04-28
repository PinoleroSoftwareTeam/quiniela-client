import Layout from "../components/Layout";
import TableTeams from "../components/Tables/Teams.Table";
import Head from "next/head";
import Drawer from "../components/Drawer";
import TeamsForm from "../components/Forms/Teams.Form";

export default function Teams() {
  return (
    <>
      <main>
        <Head>
          <title>Quiniela - Teams</title>
        </Head>

        <Drawer title="Equipos">
          <TeamsForm />
        </Drawer>
        <Layout>
          <TableTeams />
        </Layout>
      </main>
    </>
  );
}
