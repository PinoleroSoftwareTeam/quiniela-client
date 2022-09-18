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
import { FormCalendar } from '../components/Forms/Calendar.Form';
import { ICalendar } from '.././models/ICalendar';
import { MessageDialog } from '../components/MessageDialog';
import HttpServices from '../services/httpServices';
const httpServices = new HttpServices();

export default function Calendars() {
  const newCalendar = () => {
    let newModelCalendar: ICalendar = {
      id: 0,
      name: '',
      description: '',
      dateStart: new Date().toString(),
      dateEnd: new Date().toString(),
      year: new Date().getFullYear(),
      scoreWin: 0,
      scorePoint: 0,
    };
    return newModelCalendar;
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dialogAlert = useDisclosure();
  const [rows, setRows] = useState<[]>([]);
  const [calendar, setCalendar] = useState<ICalendar>(newCalendar());

  const loadRow = () => {
    httpServices
      .get(endpoint.calendar.get)
      .then(res => res.json())
      .then(data => {
        setRows(data);
      });
  };

  useEffect(() => {
    loadRow();
  }, []);
  /**
   *
   * @param data ICalendar
   */
  const onClickEdit = (data: any) => {
    setCalendar(data);
    onOpen();
  };
  /**
   *
   * @param data ICalendar
   */
  const onClickDelete = (data: any) => {
    setCalendar(data);
    dialogAlert.onOpen();
  };
  /**
   *
   * @param data ICalendar
   */
  const onActionDelete = (data: any) => {
    httpServices
      .delete(endpoint.calendar.delete, data.id)
      .then(data => {
        console.log(data);
        loadRow();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onClickNuevo = (e: any) => {
    setCalendar(newCalendar());
    onOpen();
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
      name: 'dateStart',
      display: 'Date Start',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'dateEnd',
      display: 'Date End',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'year',
      display: 'Year',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'scoreWin',
      display: 'Score Win',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'scorePoint',
      display: 'Score Point',
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
          <title>Quiniela - Calendario</title>
        </Head>
        <Drawer title="Calendario" isOpen={isOpen} onClose={onClose}>
          <FormCalendar
            onClose={onClose}
            modelCalendar={calendar}
            onLoadData={loadRow}></FormCalendar>
        </Drawer>
        <MessageDialog
          title="Eliminar Calnedario?"
          isOpen={dialogAlert.isOpen}
          onClose={dialogAlert.onClose}
          body="Esta seguro que desele eliminar este calendario?"
          displayAcctionButton="Eliminar"
          data={calendar}
          onActionDelete={onActionDelete}></MessageDialog>
        <Layout>
          <Box bg={useColorModeValue('white', 'gray.700')} p={8}>
            <Flex>
              <Heading as="h1" size="lg">
                Equipos
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
