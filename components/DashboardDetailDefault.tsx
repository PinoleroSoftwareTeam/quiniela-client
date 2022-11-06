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
import { IPredictionQuinielaUserDashboard } from '../models';

export default function DashboardDetailDefault({
  predictions,
}: {
  predictions: Array<IPredictionQuinielaUserDashboard>;
}) {
  return (
    <>
      {predictions.map((prediction, index) => {
        return (
          <Accordion allowToggle={true} key={index}>
            <AccordionItem>
              <h2>
                <AccordionButton
                  backgroundColor="white"
                  _expanded={{
                    bg: '#3182ce',
                    color: 'white',
                  }}>
                  <Box flex="1" textAlign="left">
                    {prediction.groupName
                      ? `${prediction.groupName} - `
                      : `${prediction.phaseName} - `}
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
                    {prediction.pointTeam1GameResult} {' - '}
                    {prediction.team2Name} {': '} {prediction.pointTeam2GameResult}
                  </Text>
                </SimpleGrid>
                <SimpleGrid>
                  <Text>
                    <strong>Predicción:</strong> {prediction.team1Name} {': '}{' '}
                    {prediction.pointTeam1PredictionResult} {' - '}
                    {prediction.team2Name} {': '}{' '}
                    {prediction.pointTeam2PredictionResult}
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
