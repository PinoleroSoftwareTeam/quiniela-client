import {
  MdCheckCircle,
  MdHighlightOff,
  MdCheckCircleOutline,
} from 'react-icons/md';
import {
  Box,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  SimpleGrid,
  Text,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { IPredictionQuinielaUserDashboardByDate } from '../models';

const borderList: React.CSSProperties = {
  borderWidth: '1px',
  borderRadius: '5px',
  borderColor: '#E2E8F0',
  padding: '10px',
  margin: '10px',
  backgroundColor: 'white',
};

export default function DashboardDetailByFecha({
  predictions,
}: {
  predictions: Array<IPredictionQuinielaUserDashboardByDate>;
}) {
  return (
    <>
      {predictions.map((predictionByDate, index) => {
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
                    {predictionByDate.date}
                    {' - '}
                    {' Puntos: '} <strong>{predictionByDate.total}</strong>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <List spacing={3} style={borderList}>
                  {predictionByDate.predictions.map(
                    (prediction: any, preIndex: number) => {
                      return (
                        <ListItem key={preIndex}>
                          <ListIcon
                            as={
                              prediction.totalPoint === 0
                                ? MdHighlightOff
                                : prediction.winPoint > 0 &&
                                  prediction.scorePoint > 0
                                ? MdCheckCircle
                                : MdCheckCircleOutline
                            }
                            color={`${
                              prediction.totalPoint === 0
                                ? 'red'
                                : prediction.winPoint > 0 &&
                                  prediction.scorePoint > 0
                                ? 'green'
                                : 'yellow'
                            }.500`}
                          />
                          {`${prediction.phaseName} - ${prediction.team1Name} vs ${prediction.team2Name} - Puntos: `}{' '}
                          <strong>{prediction.totalPoint}</strong>
                        </ListItem>
                      );
                    }
                  )}
                </List>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        );
      })}
    </>
  );
}
