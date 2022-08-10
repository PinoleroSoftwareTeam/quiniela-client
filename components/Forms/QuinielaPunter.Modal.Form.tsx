import React, { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import HttpServices from '../../services/httpServices';
import { endpoint } from '../../constants/endpoints';
import GenericTable from '../Tables/GenericTable';
import { IQuinielaPunter } from '../../models/index';

const httpServices = new HttpServices();

export function FormQuinielaPunterModal({
  quinielaId,
  quinielaPunters,
  onLoadData,
  onClose,
}: {
  quinielaId: number;
  onClose: () => void;
  onLoadData: () => void;
  quinielaPunters: [];
}) {
  const [rows, setRows] = useState<[]>([]);
  const toast = useToast();

  const loadRows = () => {
    httpServices
      .get(`${endpoint.quinielaPunter.getQuinielaPunterList}${quinielaId}`)
      .then(res => res.json())
      .then(data => {
        setRows(data);
      });
  };

  useEffect(() => {
    loadRows();
  }, []);

  const onAssignedChange = (e: any, data: any) => {
    const { checked } = e.target;
    if (checked) addQuinielaPunter(data);
    else deleteQuinielaPunter(data);
  };

  const addQuinielaPunter = (data: any) => {
    const quinielaPunter: IQuinielaPunter = {
      id: 0,
      quinielaId: quinielaId,
      userId: data.userId,
    };
    httpServices
      .post(endpoint.quinielaPunter.post, quinielaPunter)
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
      });
  };
  const deleteQuinielaPunter = (data: any) => {
    const quinielaPunter: IQuinielaPunter = {
      id: data.id,
      quinielaId: data.quinielaId,
      userId: data.userId,
    };
    httpServices
      .delete(endpoint.quinielaPunter.delete, data.id)
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
      });
  };

  const columnsName = [
    { name: 'id', display: 'Id', key: true, isAction: false, hidde: true },
    {
      name: 'fullName',
      display: 'Nombre completo',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'email',
      display: 'Correo',
      key: false,
      isAction: false,
      hidde: false,
    },
    {
      name: 'assigned',
      display: 'Asignado',
      key: false,
      isAction: false,
      isCheck: true,
      event: onAssignedChange,
      hidde: false,
    },
  ];

  return <GenericTable columns={columnsName} rows={rows}></GenericTable>;
}
