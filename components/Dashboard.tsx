import React, { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import HttpServices from '../services/httpServices';
import { endpoint } from '../constants/endpoints';
import GenericTable from '../components/Tables/GenericTable';
import AuthStore from '../services/AuthStore';
import Head from 'next/head';
import Layout from '../components/Layout';

const httpServices = new HttpServices();

export function Dashboard() {
  const [rows, setRows] = useState<[]>([]);

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
  ];
  return <GenericTable columns={columnsName} rows={rows}></GenericTable>;
}
