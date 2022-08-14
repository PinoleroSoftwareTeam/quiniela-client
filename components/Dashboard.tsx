import React, { useEffect, useState } from 'react';
import { useToast, useDisclosure } from '@chakra-ui/react';
import HttpServices from '../services/httpServices';
import { endpoint } from '../constants/endpoints';
import GenericTable from '../components/Tables/GenericTable';
import AuthStore from '../services/AuthStore';
import Modal from '../components/WindowModal';
import { DashboardDetail } from './DashboardDetail';

const httpServices = new HttpServices();

export function Dashboard() {
  const [rows, setRows] = useState<[]>([]);
  const [quiniela, setQuiniela] = useState<any>({});
  const modalUser = useDisclosure();

  const loadRows = () => {
    const user = AuthStore.getUser();
    httpServices
      .get(`${endpoint.dashboard.getByUser}${user.userId}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setRows(data || []);
      });
  };

  useEffect(() => {
    loadRows();
  }, []);

  const onQuinielaPunterModel = (data: any) => {
    setQuiniela(data);
    modalUser.onOpen();
  };

  const columnsName = [
    {
      name: 'quinielaId',
      display: 'Id',
      key: true,
      isAction: false,
      hidde: true,
    },
    {
      name: 'userId',
      display: 'UserId',
      key: false,
      isAction: false,
      hidde: true,
    },
    {
      name: 'quinielaName',
      display: 'Quiniela',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'point',
      display: 'Puntos',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'Ver detalle',
      display: 'Ver detalle',
      key: false,
      isAction: true,
      action: onQuinielaPunterModel,
      hidde: false,
    },
  ];

  return (
    <>
      <Modal
        title={quiniela ? quiniela.name : ''}
        isOpen={modalUser.isOpen}
        onClose={modalUser.onClose}
        closeByClickCancel={false}
        size="full">
        <DashboardDetail
          quinielaId={quiniela.quinielaId}
          onClose={modalUser.onClose}></DashboardDetail>
      </Modal>
      <GenericTable columns={columnsName} rows={rows}></GenericTable>
    </>
  );
}
