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
import { FormGroup } from '../components/Forms/Group.Form';
import { IGroup } from '../models/IGroup';
import { ICalendar } from '../models/ICalendar';
import { MessageDialog } from '../components/MessageDialog';
import HttpServices from '../services/httpServices';
const httpServices = new HttpServices();

export default function Group() {
  const newGroup = () => {
    let newModelIGroup: IGroup = {
      id: 0,
      name: '',
      description: '',
      amount: 0,
      calendarId: '0',
    };
    return newModelIGroup;
  };

  const drawerForm = useDisclosure();
  const dialogAlert = useDisclosure();
  const [rows, setRows] = useState<[]>([]);
  const [calendars, setCalendars] = useState<ICalendar[]>([]);
  const [group, setGroup] = useState<IGroup>(newGroup());

  const loadRows = () => {
    httpServices
      .get(endpoint.group.getGroupList)
      .then(res => res.json())
      .then(data => {
        setRows(data);
      });
  };

  const loadSelect = () => {
    httpServices
      .get(endpoint.calendar.get)
      .then(res => res.json())
      .then(data => {
        setCalendars(data);
      });
  };

  useEffect(() => {
    loadRows();
    loadSelect();
  }, []);

  const onClickEdit = (data: any) => {
    setGroup(data);
    drawerForm.onOpen();
  };

  const onClickDelete = (data: any) => {
    setGroup(data);
    dialogAlert.onOpen();
  };

  const onActionDelete = (data: any) => {
    httpServices
      .delete(endpoint.group.delete, data.id)
      .then(data => {
        loadRows();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onClickNuevo = (e: any) => {
    setGroup(newGroup());
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
      name: 'amount',
      display: 'Cantidad',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'calendarName',
      display: 'Torneo',
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
          title="Grupos"
          isOpen={drawerForm.isOpen}
          onClose={drawerForm.onClose}>
          <FormGroup
            onClose={drawerForm.onClose}
            modelGroup={group}
            onLoadData={loadRows}
            calendars={calendars}></FormGroup>
        </Drawer>
        <MessageDialog
          title="Eliminar Grupo?"
          isOpen={dialogAlert.isOpen}
          onClose={dialogAlert.onClose}
          body="Esta seguro que desele eliminar este grupo del catalogo?"
          displayAcctionButton="Eliminar"
          data={group}
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
