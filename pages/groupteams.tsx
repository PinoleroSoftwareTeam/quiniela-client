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
import { FormGroupTeam } from '../components/Forms/GroupTeam.Form';
import { IGroupTeam } from '../models/IGroupTeam';
import { IGroup } from '../models/IGroup';
import { ITeam } from '../models/ITeam';
import { MessageDialog } from '../components/MessageDialog';
import HttpServices from '../services/httpServices';
const httpServices = new HttpServices();

export default function GroupTeam() {
  const newGroupTeam = () => {
    let newModelIGroupTeam: IGroupTeam = {
      id: 0,
      groupId: '',
      teamId: '',
    };
    return newModelIGroupTeam;
  };

  const drawerForm = useDisclosure();
  const dialogAlert = useDisclosure();
  const [rows, setRows] = useState<[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [groupTeam, setGroupTeam] = useState<IGroupTeam>(newGroupTeam());

  const loadRows = () => {
    httpServices
      .get(endpoint.groupTeam.getGroupTeamList)
      .then(res => res.json())
      .then(data => {
        setRows(data);
      });
  };

  const loadSelect = () => {
    httpServices
      .get(endpoint.group.get)
      .then(res => res.json())
      .then(data => {
        setGroups(data);
      });
    httpServices
      .get(endpoint.team.get)
      .then(res => res.json())
      .then(data => {
        setTeams(data);
      });
  };

  useEffect(() => {
    loadRows();
    loadSelect();
  }, []);

  const onClickEdit = (data: any) => {
    setGroupTeam(data);
    drawerForm.onOpen();
  };

  const onClickDelete = (data: any) => {
    setGroupTeam(data);
    dialogAlert.onOpen();
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

  const onClickNuevo = (e: any) => {
    setGroupTeam(newGroupTeam());
    drawerForm.onOpen();
  };

  const columnsName = [
    { name: 'id', display: 'Id', key: true, isAction: false, hidde: false },
    {
      name: 'calendarName',
      display: 'Torneo',
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
      name: 'teamName',
      display: 'Equipo',
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
          <title>Quiniela - Grupo Torneo</title>
        </Head>
        <Drawer
          title="Equipo grupo torneo"
          isOpen={drawerForm.isOpen}
          onClose={drawerForm.onClose}>
          <FormGroupTeam
            onClose={drawerForm.onClose}
            modelGroupTeam={groupTeam}
            onLoadData={loadRows}
            groups={groups}
            teams={teams}></FormGroupTeam>
        </Drawer>
        <MessageDialog
          title="Eliminar Grupo?"
          isOpen={dialogAlert.isOpen}
          onClose={dialogAlert.onClose}
          body="Esta seguro que desele eliminar este grupo del catalogo?"
          displayAcctionButton="Eliminar"
          data={groupTeam}
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
