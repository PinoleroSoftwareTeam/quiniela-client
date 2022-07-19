import React, { useEffect, useState } from 'react';
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
import GenericTable from '../components/Tables/GenericTable';
import { MessageDialog } from '../components/MessageDialog';

function Games() {
  const httpServices = new HttpServices();
  const dialogAlert = useDisclosure();
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [rows, setRows] = useState<[]>([]);
  const [calendar, setCalendar] = useState<ISelected>({});
  const [phase, setPhase] = useState<ISelected>([]);
  const [game, setGame] = useState<IGame>(new Game());

  const loadRows = () => {
    httpServices
      .get(endpoint.game.getGameList)
      .then(res => res.json())
      .then(data => {
        setRows(data);
      });
  };

  const loadSelect = () => {
    httpServices
      .get(endpoint.calendar.selected)
      .then(res => res.json())
      .then(data => {
        setCalendar(data);
      });
    httpServices
      .get(endpoint.phase.selected)
      .then(res => res.json())
      .then(data => {
        setPhase(data);
      });
  };

  useEffect(() => {
    loadRows();
    loadSelect();
  }, []);

  const onClickEdit = (data: any) => {
    setGame(data);
    onOpen();
  };

  const onClickDelete = (data: any) => {
    setGame(data);
    onOpen();
  };

  const onActionDelete = (data: any) => {
    httpServices
      .delete(endpoint.groupTeam.delete, data.id)
      .then(data => {
        loadRows();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const columnsName = [
    { name: 'id', display: 'Id', key: true, isAction: false, hidde: true },
    {
      name: 'date',
      display: 'FECHA',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'phaseName',
      display: 'PHASE',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'team1Name',
      display: 'EQUIPO 1',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'team2Name',
      display: 'EQUIPO 2',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'groupName',
      display: 'Grupo',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'point1',
      display: 'GOLES EQUIPO 1',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'point2',
      display: 'GOLES EQUIPO 2',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'Editar',
      display: 'Editar',
      key: false,
      isAction: true,
      action: onClickEdit,
      hidde: false,
    },
    {
      name: 'Eliminar',
      display: 'Eliminar',
      key: false,
      isAction: true,
      action: onClickDelete,
      hidde: false,
    },
  ];

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
            onLoadData={loadRows}
            calendar={calendar}
            phase={phase}></FormGames>
        </Drawer>
        <MessageDialog
          title="Eliminar Juego?"
          isOpen={dialogAlert.isOpen}
          onClose={dialogAlert.onClose}
          body="Esta seguro que desele eliminar este juego del catalogo?"
          displayAcctionButton="Eliminar"
          data={game}
          onActionDelete={onActionDelete}></MessageDialog>
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
          <GenericTable columns={columnsName} rows={rows}></GenericTable>
        </Layout>
      </main>
    </>
  );
}

export default Games;
