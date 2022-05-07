import React from 'react';
import Head from 'next/head';
import {
  Heading,
  Box,
  useColorModeValue,
  Flex,
  Spacer,
  Button,
} from '@chakra-ui/react';

import Layout from '../components/Layout';
import { TableGames } from '../components/Tables';

function Games() {
  return (
    <>
      <main>
        <Head>
          <title>Quiniela - Games</title>
        </Head>
        <Layout>
          <Box bg={useColorModeValue('white', 'gray.700')} p={8}>
            <Flex>
              <Heading as="h1" size="lg">
                Partidos
              </Heading>
              <Spacer />
              <Button>Nuevo</Button>
            </Flex>
          </Box>
          <br />
          <TableGames />
        </Layout>
      </main>
    </>
  );
}

export default Games;
