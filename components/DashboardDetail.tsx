import React, { useEffect, useState } from 'react';
import HttpServices from '../services/httpServices';
import { endpoint } from '../constants/endpoints';
import GenericTable from '../components/Tables/GenericTable';

const httpServices = new HttpServices();

export function DashboardDetail({
  quinielaId,
  onClose,
}: {
  quinielaId: number;
  onClose: () => void;
}) {
  const [rowUsers, setrowUsers] = useState<[]>([]);

  const loadRows = () => {
    httpServices
      .get(`${endpoint.dashboard.getByQuiniela}${quinielaId}`)
      .then(res => res.json())
      .then(data => {
        setrowUsers(data || []);
      });
  };

  useEffect(() => {
    loadRows();
  }, []);

  const columnNamePunter = [
    {
      name: 'position',
      display: 'Nombre',
      key: true,
      isAction: false,
      hidde: false,
    },
    {
      name: 'fullName',
      display: 'Nombre',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'userName',
      display: 'Nombre usuario',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'total',
      display: 'Total',
      key: false,
      isAction: false,
      hidde: false,
    },
  ];

  return (
    <GenericTable columns={columnNamePunter} rows={rowUsers}></GenericTable>
  );
}
