import React, { useState } from 'react';
import Head from 'next/head';
import {
  Heading,
  Box,
  useColorModeValue,
  Flex,
  Spacer,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

import Drawer from '../components/Drawer';
import Layout from '../components/Layout';

import { TableGames } from '../components/Tables';
import { FormGames } from '../components/Forms';

import { IGame, Game, ISelected } from '../models';

import HttpServices from '../services/httpServices';
import { endpoint } from '../constants/endpoints';

function Games() {
  const httpServices = new HttpServices();
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [rows, setRows] = useState<[]>([]);
  const [phase, setPhase] = useState<ISelected>([]);
  const [game, setGame] = useState<IGame>(new Game());
  const [tema1, setTema1] = useState<ISelected>([]);
  const [tema2, setTema2] = useState<ISelected>([]);

  const loadRows = () => {
    httpServices
      .get(endpoint.game.get)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setRows(data);
      });
  };

  return (
    <>
      <main>
        <Head>
          <title>Quiniela - Games</title>
        </Head>
        <Drawer title="Calendario" isOpen={isOpen} onClose={onClose}>
          <FormGames
            onClose={onClose}
            modelGame={game}
            onLoadData={loadRows}></FormGames>
        </Drawer>
        <Layout>
          <Box bg={useColorModeValue('white', 'gray.700')} p={8}>
            <Flex>
              <Heading as="h1" size="lg">
                Partidos
              </Heading>
              <Spacer />
              <Button onClick={onOpen}>Nuevo</Button>
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
