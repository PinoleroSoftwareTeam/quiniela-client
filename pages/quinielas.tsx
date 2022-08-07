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
} from '@chakra-ui/react';

import Drawer from '../components/Drawer';
import Layout from '../components/Layout';
import HttpServices from '../services/httpServices';
import { endpoint } from '../constants/endpoints';
import GenericTable from '../components/Tables/GenericTable';
import { MessageDialog } from '../components/MessageDialog';
import { IQuiniela, Quiniela, ISelected } from '../models';
import { FormQuiniela } from '../components/Forms';

function Quinielas() {
  const httpServices = new HttpServices();
  const dialogAlert = useDisclosure();
  const toast = useToast();
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [quiniela, setQuiniela] = useState<IQuiniela>(new Quiniela());
  const [calendar, setCalendar] = useState<ISelected>({});
  const [rows, setRows] = useState<[]>([]);

  const loadRows = () => {
    httpServices
      .get(endpoint.quiniela.getList)
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
  };

  useEffect(() => {
    loadRows();
    loadSelect();
  }, []);

  const onClickEdit = (data: any) => {
    setQuiniela(data);
    onOpen();
  };

  const onClickDelete = (data: any) => {
    setQuiniela(data);
    dialogAlert.onOpen();
  };

  const onActionDelete = (data: any) => {
    httpServices
      .delete(endpoint.quiniela.delete, data.id)
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

  const onChangeActive = (e: any, data: any) => {
    const { checked } = e.target;
    data.active = checked;
    httpServices
      .put(endpoint.quiniela.put, data.id, data)
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

  const columnsName = [
    { name: 'id', display: 'Id', key: true, isAction: false, hidde: true },
    {
      name: 'name',
      display: 'Nombre',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'description',
      display: 'Descripcion',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'calendarName',
      display: 'Nombre',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'active',
      display: 'Activo',
      key: false,
      isAction: false,
      isCheck: true,
      event: onChangeActive,
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
      <Head>
        <title>Quiniela - Juegos quinielas</title>
      </Head>
      <Drawer title="Juevo quiniela" isOpen={isOpen} onClose={onClose}>
        <FormQuiniela
          onClose={onClose}
          modelQuiniela={quiniela}
          onLoadData={loadRows}
          calendar={calendar}></FormQuiniela>
      </Drawer>
      <MessageDialog
        title="Eliminar Juego de Quiniela?"
        isOpen={dialogAlert.isOpen}
        onClose={dialogAlert.onClose}
        body="Esta seguro que desele eliminar este juego de quiniela?"
        displayAcctionButton="Eliminar"
        data={quiniela}
        onActionDelete={onActionDelete}></MessageDialog>
      <Layout>
        <Box bg={useColorModeValue('white', 'gray.700')} p={8}>
          <Flex>
            <Heading as="h1" size="lg">
              Juegos quiniela
            </Heading>
            <Spacer />
            <Button onClick={onOpen}>Nuevo</Button>
          </Flex>
        </Box>
        <br />
        <GenericTable columns={columnsName} rows={rows}></GenericTable>
      </Layout>
    </>
  );
}

export default Quinielas;
