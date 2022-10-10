import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import {
  Heading,
  Box,
  useColorModeValue,
  Flex,
  Spacer,
  Button,
  useToast,
} from '@chakra-ui/react';
import HttpServices from '../services/httpServices';
import { endpoint } from '../constants/endpoints';
import GenericTable from '../components/Tables/GenericTable';

export default function Users() {
  const httpServices = new HttpServices();
  const toast = useToast();
  const [rows, setRows] = useState<[]>([]);
  const loadRows = () => {
    httpServices
      .get(endpoint.auth.getUser)
      .then(res => res.json())
      .then(data => {
        setRows(data);
      });
  };

  useEffect(() => {
    loadRows();
  }, []);

  const onChangeEnabled = (e: any, data: any) => {
    const { checked } = e.target;
    data.enabled = checked;
    httpServices
      .put(endpoint.auth.unlockUser, data.userId, data)
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
    { name: 'email', display: 'Id', key: true, isAction: false, hidde: false },
    {
      name: 'firstName',
      display: 'Nombre',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'lastName',
      display: 'Apellido',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'userName',
      display: 'Nombre de Usuario',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'enabled',
      display: 'Activo',
      key: false,
      isAction: false,
      isCheck: true,
      event: onChangeEnabled,
      hidde: false,
    },
  ];

  return (
    <>
      <main>
        <Layout>
          <Box bg={useColorModeValue('white', 'gray.700')} p={8}>
            <Flex>
              <Heading as="h1" size="lg">
                Usuarios
              </Heading>
              <Spacer />
            </Flex>
          </Box>
          <br />
          <GenericTable
            key={'table-user-quiniela'}
            columns={columnsName}
            rows={rows}></GenericTable>
        </Layout>
      </main>
    </>
  );
}
