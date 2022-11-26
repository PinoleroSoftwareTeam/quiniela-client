import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  useToast,
  useDisclosure,
  Box,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  useColorModeValue,
} from '@chakra-ui/react';
import HttpServices from '../services/httpServices';
import { endpoint } from '../constants/endpoints';
import GenericTable from '../components/Tables/GenericTable';
import AuthStore from '../services/AuthStore';
import Modal from '../components/WindowModal';
import { DashboardDetail } from './DashboardDetail';
import { IQuinielaDashboard, IQuinielaUserDashboard } from '../models';

const httpServices = new HttpServices();

export function Dashboard() {
  const router = useRouter();
  const [rows, setRows] = useState<IQuinielaDashboard[]>([]);
  const [userQuiniela] = useState<IQuinielaUserDashboard>({});
  const modalUser = useDisclosure();

  const loadRows = () => {
    const user = AuthStore.getUser();
    httpServices
      .get(`${endpoint.dashboard.getByUser}${user.userId}`)
      .then(res => res.json())
      .then(data => {
        setRows(data || []);
      });
  };

  useEffect(() => {
    loadRows();
  }, []);

  const onUserPredictionModel = (data: any) => {
    const url = `/dashboardDetails?param1=${data.quinielaId}&param2=${data.userId}`;
    router.push(url);
  };

  const bgColor = useColorModeValue('brand.purple', 'brand.yellow');
  const bgColorHover = useColorModeValue('brand.purple-dark', 'brand.yellow-dark');

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
    {
      name: 'Ver predicción',
      display: 'Ver predicción',
      key: false,
      isAction: true,
      action: onUserPredictionModel,
      hidde: false,
    },
  ];

  return (
    <>
      <Modal
        title={
          userQuiniela
            ? `${userQuiniela.quinielaName} - ${userQuiniela.userName}`
            : ''
        }
        isOpen={modalUser.isOpen}
        onClose={modalUser.onClose}
        closeByClickCancel={false}
        size="full">
        <DashboardDetail
          userQuinielaDetail={userQuiniela}
          onClose={modalUser.onClose} />
      </Modal>
      {rows.map((quiniela, index) => {
        return (
          <Accordion allowToggle={true} key={index}>
            <AccordionItem>
              <h2>
                <AccordionButton
                  backgroundColor={bgColor}
                  color="white"
                  _hover={{
                    bg: bgColorHover,
                  }}>
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
