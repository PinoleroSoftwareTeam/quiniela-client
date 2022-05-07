import React from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';
import Drawer from '../components/Drawer';
import GenericTable from '../components/Tables/GenericTable';
import { endpoint } from '../constants/endpoints';
import { FormCalendar } from '../components/Forms/Calendar.Form';
import {
  Box,
  useColorModeValue,
  Flex,
  Heading,
  Spacer,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ICalendar } from '.././models/ICalendar';

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
  const [calendar, setCalendar] = useState<ICalendar>(newCalendar());

  const onClickEdit = (data: any) => {
    setCalendar(data);
    onOpen();
  };

  const onClickDelete = (data: any) => {};

  const onClickNuevo = (e: any) => {
    setCalendar(newCalendar());
    onOpen();
  };

  const columnsName = [
    { name: 'id', display: 'Id', key: true, isAction: false, hidde: true },
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
            modelCalendar={calendar}></FormCalendar>
        </Drawer>
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
          <GenericTable
            columns={columnsName}
            url={endpoint.calendar.getCalendar}></GenericTable>
        </Layout>
      </main>
    </>
  );
}
