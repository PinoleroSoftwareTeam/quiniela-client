import React from 'react';
import {
  Box,
  useColorModeValue,
  Flex,
  Heading,
  Spacer,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';
import Drawer from '../components/Drawer';
import GenericTable from '../components/Tables/GenericTable';
import { endpoint } from '../constants/endpoints';
import { FormTeam } from '../components/Forms/Teams.Form';
import { ITeam } from '../models/ITeam';
import { MessageDialog } from '../components/MessageDialog';
import HttpServices from '../services/httpServices';
const httpServices = new HttpServices();

export default function Teams() {
  const newTeam = () => {
    let newModelITeam: ITeam = {
      id: 0,
      name: '',
      description: '',
      logo: '',
    };
    return newModelITeam;
  };

  const drawerForm = useDisclosure();
  const dialogAlert = useDisclosure();
  const [rows, setRows] = useState<[]>([]);
  const [team, setTeam] = useState<ITeam>(newTeam());

  const loadRows = () => {
    httpServices
      .get(endpoint.team.get)
      .then(res => res.json())
      .then(data => {
        setRows(data);
      });
  };

  useEffect(() => {
    loadRows();
  }, []);

  const onClickEdit = (data: any) => {
    setTeam(data);
    drawerForm.onOpen();
  };

  const onClickDelete = (data: any) => {
    setTeam(data);
    dialogAlert.onOpen();
  };

  const onActionDelete = (data: any) => {
    httpServices
      .delete(endpoint.team.delete, data.id)
      .then(data => {
        loadRows();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onClickNuevo = (e: any) => {
    setTeam(newTeam());
    drawerForm.onOpen();
  };

  const columnsName = [
    { name: 'id', display: 'Id', key: true, isAction: false, hidde: false },
    {
      name: 'name',
      display: 'Name',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'description',
      display: 'Description',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'logo',
      display: 'logo',
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
          <title>Quiniela - Catalogo de Grupos</title>
        </Head>
        <Drawer
          title="Calendario"
          isOpen={drawerForm.isOpen}
          onClose={drawerForm.onClose}>
          <FormTeam
            onClose={drawerForm.onClose}
            modelTeam={team}
            onLoadData={loadRows}></FormTeam>
        </Drawer>
        <MessageDialog
          title="Eliminar equipo?"
          isOpen={dialogAlert.isOpen}
          onClose={dialogAlert.onClose}
          body="Esta seguro que desele eliminar este equipo del catalogo?"
          displayAcctionButton="Eliminar"
          data={team}
          onActionDelete={onActionDelete}></MessageDialog>
        <Layout>
          <Box bg={useColorModeValue('white', 'gray.700')} p={8}>
            <Flex>
              <Heading as="h1" size="lg">
                Catalogos grupos
              </Heading>
              <Spacer />
              <Button onClick={onClickNuevo}>Nuevo</Button>
            </Flex>
          </Box>
          <GenericTable columns={columnsName} rows={rows}></GenericTable>
        </Layout>
      </main>
    </>
  );
}
