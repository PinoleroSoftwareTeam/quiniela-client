import React, { useEffect, useState } from 'react';
import {
  useToast,
  useDisclosure,
  Box,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react';
import HttpServices from '../services/httpServices';
import { endpoint } from '../constants/endpoints';
import GenericTable from '../components/Tables/GenericTable';
import AuthStore from '../services/AuthStore';
import Modal from '../components/WindowModal';
import { DashboardDetail } from './DashboardDetail';
import { IQuinielaDashboard } from '../models';

const httpServices = new HttpServices();

export function Dashboard() {
  const [rows, setRows] = useState<IQuinielaDashboard[]>([]);
  const [quiniela, setQuiniela] = useState<IQuinielaDashboard>({});
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

  const columnNamePunter = [
    {
      name: 'position',
      display: 'Posición',
      key: true,
      isAction: false,
      hidde: false,
    },
    {
      name: 'userName',
      display: 'Usuario',
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
    <>
      {rows.map((quiniela, index) => {
        return (
          <Accordion allowToggle={true} key={index}>
            <AccordionItem>
              <h2>
                <AccordionButton
                  backgroundColor="white"
                  _expanded={{ bg: '#3182ce', color: 'white' }}>
                  <Box flex="1" textAlign="left">
                    {quiniela.quinielaName}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <GenericTable
                  columns={columnNamePunter}
                  rows={quiniela.details}></GenericTable>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        );
      })}
    </>
  );
}
