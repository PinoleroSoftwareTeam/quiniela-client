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
import { FormPhase } from '../components/Forms/Phase.Form';
import { IPhase } from '../models/IPhase';
import { MessageDialog } from '../components/MessageDialog';
import HttpServices from '../services/httpServices';
const httpServices = new HttpServices();

export default function Phase() {
  const newPhase = () => {
    let newModelPhase: IPhase = {
      id: 0,
      name: '',
      description: '',
    };
    return newModelPhase;
  };

  const drawerForm = useDisclosure();
  const dialogAlert = useDisclosure();
  const [rows, setRows] = useState<[]>([]);
  const [phase, setPhase] = useState<IPhase>(newPhase());

  const loadRows = () => {
    httpServices
      .get(endpoint.phase.get)
      .then(res => res.json())
      .then(data => {
        setRows(data);
      });
  };

  useEffect(() => {
    loadRows();
  }, []);

  const onClickEdit = (data: any) => {
    setPhase(data);
    drawerForm.onOpen();
  };

  const onClickDelete = (data: any) => {
    setPhase(data);
    dialogAlert.onOpen();
  };

  const onActionDelete = (data: any) => {
    httpServices
      .delete(endpoint.phase.delete, data.id)
      .then(data => {
        loadRows();
      })
      .catch(error => {});
  };

  const onClickNuevo = (e: any) => {
    setPhase(newPhase());
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
          <title>Quiniela - Jornadas</title>
        </Head>
        <Drawer
          title="Calendario"
          isOpen={drawerForm.isOpen}
          onClose={drawerForm.onClose}>
          <FormPhase
            onClose={drawerForm.onClose}
            modelPhase={phase}
            onLoadData={loadRows}></FormPhase>
        </Drawer>
        <MessageDialog
          title="Eliminar Calnedario?"
          isOpen={dialogAlert.isOpen}
          onClose={dialogAlert.onClose}
          body="Esta seguro que desele eliminar esta jornada del catalogo?"
          displayAcctionButton="Eliminar"
          data={phase}
          onActionDelete={onActionDelete}></MessageDialog>
        <Layout>
          <Box bg={useColorModeValue('white', 'gray.700')} p={8}>
            <Flex>
              <Heading as="h1" size="lg">
                Catalogos Jornadas
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
