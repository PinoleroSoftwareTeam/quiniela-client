import React from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import FormGames from "../components/Forms/Games.Form";
import TableGames from "../components/Tables/Games.Table";

function games() {
  return (
    <>
      <main>
        <Head>
          <title>Quiniela - Games</title>
        </Head>
        <Layout>
          <TableGames />
        </Layout>
      </main>
    </>
  );
}

export default games;
