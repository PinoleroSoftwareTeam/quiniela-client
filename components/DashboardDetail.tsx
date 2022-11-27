import React, { useEffect, useState } from 'react';
import {
  Box,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import HttpServices from '../services/httpServices';
import { endpoint } from '../constants/endpoints';
import {
  IQuinielaUserDashboard,
  IPredictionQuinielaUserDashboard,
} from '../models';

const httpServices = new HttpServices();

export function DashboardDetail({
  userQuinielaDetail,
  onClose,
}: {
  userQuinielaDetail: IQuinielaUserDashboard;
  onClose: () => void;
}) {
  const [predictionUser, setPredictionUser] = useState<
    IPredictionQuinielaUserDashboard[]
  >([]);

  const loadRows = () => {
    httpServices
      .get(
        `${endpoint.dashboard.getByQuinielaUser}${userQuinielaDetail.quinielaId}/${userQuinielaDetail.userId}`
      )
      .then(res => res.json())
      .then(data => {
        setPredictionUser(data || []);
      });
  };

  useEffect(() => {
    loadRows();
  }, []);

  return (
    <>
      {predictionUser.map((prediction, index) => {
        return (
          <Accordion allowToggle={true} key={index}>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {prediction.groupName ? `${prediction.groupName} - ` : ''}
                    {prediction.team1Name} {' vs '} {prediction.team2Name}
                    {' - '}
                    {' Puntos: '} <strong>{prediction.totalPoint}</strong>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <SimpleGrid>
                  <Text>
                    <strong>Marcador:</strong> {prediction.team1Name} {': '}{' '}
                    {prediction.scoreTeam1Game} {' - '}
                    {prediction.team2Name} {': '} {prediction.scoreTeam2Game}
                  </Text>
                </SimpleGrid>
                <SimpleGrid>
                  <Text>
                    <strong>Predicción:</strong> {prediction.team1Name} {': '}{' '}
                    {prediction.scorePredictionTeam1} {' - '}
                    {prediction.team2Name} {': '}{' '}
                    {prediction.scorePredictionTeam2}
                  </Text>
                </SimpleGrid>
                <SimpleGrid>
                  <Text>
                    <strong> Puntos por resultado:</strong>{' '}
                    {prediction.winPoint}
                  </Text>
                </SimpleGrid>
                <SimpleGrid>
                  <Text>
                    <strong>Puntos por marcador:</strong>{' '}
                    {prediction.scorePoint}
                  </Text>
                </SimpleGrid>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        );
      })}
    </>
  );
}
