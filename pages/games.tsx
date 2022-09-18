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
  useToast,
  Divider,
  SimpleGrid,
  FormControl,
  FormLabel,
  Select,
  IconButton,
  Center,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import Drawer from '../components/Drawer';
import Layout from '../components/Layout';

import { TableGames } from '../components/Tables';
import { FormGames, FormGameResult } from '../components/Forms';

import { IGame, Game, ISelected } from '../models';

import HttpServices from '../services/httpServices';
import { endpoint } from '../constants/endpoints';
import GenericTable from '../components/Tables/GenericTable';
import { MessageDialog } from '../components/MessageDialog';

interface IFilter {
  calendarId?: number;
  phaseId?: number;
}

function Games() {
  const httpServices = new HttpServices();
  const dialogAlert = useDisclosure();
  const toast = useToast();
  const { onClose, onOpen, isOpen } = useDisclosure();
  const formResultDrawer = useDisclosure();
  const [rows, setRows] = useState<[]>([]);
  const [calendar, setCalendar] = useState<ISelected>({});
  const [phase, setPhase] = useState<ISelected>([]);
  const [game, setGame] = useState<IGame>(new Game());
  const [gameResult, setGameResult] = useState<IGame>(new Game());
  const [calendarCbo, setCalendarCbo] = useState<ISelected[]>([]);
  const [phaseCbo, setPhaseCbo] = useState<ISelected[]>([]);
  const [filter, setFilter] = useState<IFilter>();

  const loadRows = () => {
    let queryString: string = '?';
    queryString += `calendarId=${
      filter && filter.calendarId ? filter.calendarId : ''
    }&&`;
    queryString += `phaseId=${filter && filter.phaseId ? filter.phaseId : ''}`;
    httpServices
      .get(`${endpoint.game.getGameList}${queryString}`)
      .then(res => res.json())
      .then(data => {
        setRows(data || []);
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

  const loadCalendar = () => {
    httpServices
      .get(`${endpoint.calendar.selected}`)
      .then(res => res.json())
      .then(data => {
        setCalendarCbo(data);
      });
  };

  const loadPhase = () => {
    httpServices
      .get(`${endpoint.phase.selected}`)
      .then(res => res.json())
      .then(data => {
        setPhaseCbo(data);
      });
  };

  useEffect(() => {
    loadRows();
    loadSelect();
    loadCalendar();
    loadPhase();
  }, []);

  const onClickEdit = (data: any) => {
    setGame(data);
    onOpen();
  };

  const onClickEditResult = (data: any) => {
    setGameResult(data);
    formResultDrawer.onOpen();
  };

  const onClickDelete = (data: any) => {
    setGame(data);
    dialogAlert.onOpen();
  };

  const onActionDelete = (data: any) => {
    httpServices
      .delete(endpoint.game.delete, data.id)
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.error) {
          toast({
            title: 'Error',
            description: data.message,
            status: 'error',
            duration: 4000,
            isClosable: true,
          });
          return;
        }
        loadRows();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onClickImport = () => {
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('multiple', 'multiple');
    fileSelector.setAttribute('accept', '.xlsx');
    fileSelector.onchange = files => {
      let formData = new FormData();
      let file =
        fileSelector.files && fileSelector.files.length > 0
          ? fileSelector.files[0]
          : '';
      formData.append('file', file);
      httpServices
        .upload(endpoint.game.uploadFile, formData)
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data.error) {
            toast({
              title: 'Error',
              description: data.message,
              status: 'error',
              duration: 4000,
              isClosable: true,
            });
            return;
          }
          loadRows();
        })
        .catch(error => {
          console.log(error);
        });
    };
    fileSelector.click();
  };

  const onChangeFilter = (e: any) => {
    const { value, name } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const onClickFind = () => {
    loadRows();
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
      name: 'pointTeam1',
      display: 'GOLES EQUIPO 1',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'pointTeam2',
      display: 'GOLES EQUIPO 2',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'Editar',
      display: 'Resultado',
      key: false,
      isAction: true,
      action: onClickEditResult,
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
        <Drawer title="Juegos" isOpen={isOpen} onClose={onClose}>
          <FormGames
            onClose={onClose}
            modelGame={game}
            onLoadData={loadRows}
            calendar={calendar}
            phase={phase}></FormGames>
        </Drawer>
        <Drawer
          title="Resultado"
          isOpen={formResultDrawer.isOpen}
          onClose={formResultDrawer.onClose}>
          <FormGameResult
            onClose={formResultDrawer.onClose}
            modelGame={gameResult}
            onLoadData={loadRows}></FormGameResult>
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
            <SimpleGrid>
              <Flex>
                <Heading as="h1" size="lg">
                  Partidos
                </Heading>
                <Spacer />
                <Button onClick={onOpen}>Nuevo</Button>
                <Divider orientation="vertical" />
                <Button onClick={onClickImport}>Importar</Button>
              </Flex>
            </SimpleGrid>
            <SimpleGrid column={2} spacing="20px">
              <Box>
                <FormControl>
                  <FormLabel htmlFor="calendarId">Calendar</FormLabel>
                  <Select
                    id="calendarId"
                    name="calendarId"
                    placeholder="Seleccione un torneo"
                    onChange={onChangeFilter}>
                    {calendarCbo.map((itemSelect, index) => (
                      <option
                        key={index}
                        value={itemSelect.key ? itemSelect.key.toString() : ''}>
                        {itemSelect.value}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                  <FormLabel htmlFor="phaseId">Faces</FormLabel>
                  <Select
                    id="phaseId"
                    name="phaseId"
                    placeholder="Seleccione una face"
                    onChange={onChangeFilter}>
                    {phaseCbo.map((itemSelect, index) => (
                      <option
                        key={index}
                        value={itemSelect.key ? itemSelect.key.toString() : ''}>
                        {itemSelect.value}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </SimpleGrid>
            <br />
            <SimpleGrid>
              <Center>
                <IconButton
                  colorScheme="blue"
                  aria-label="Search database"
                  onClick={onClickFind}
                  icon={<SearchIcon />}
                />
              </Center>
            </SimpleGrid>
          </Box>
          <br />
          <GenericTable columns={columnsName} rows={rows}></GenericTable>
        </Layout>
      </main>
    </>
  );
}

export default Games;
