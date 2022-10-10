import { useState, useEffect } from 'react';
import {
  FormControl,
  Tag,
  NumberInput,
  NumberInputField,
  Box,
  Divider,
  Badge,
  Center,
  SimpleGrid,
  Text,
  Show,
  Hide,
} from '@chakra-ui/react';
import { FormPredictionResult } from '../Forms';

interface FormPredictionProps {
  predictionModel: any;
  index: number;
  onChangePredictionScoreTeam1: (index: number, scoreTeam1: number) => void;
  onChangePredictionScoreTeam2: (index: number, scoreTeam2: number) => void;
}

export function FormPrediction({
  predictionModel,
  index,
  onChangePredictionScoreTeam1,
  onChangePredictionScoreTeam2,
}: FormPredictionProps) {
  const [prediction, setPrediction] = useState(predictionModel);

  const onChangeScoreTeam1 = (valueAsString: string, valueAsNumber: number) => {
    setPrediction({ ...prediction, scoreTeam1: valueAsNumber });
    onChangePredictionScoreTeam1(index, valueAsNumber);
  };

  const onChangeScoreTeam2 = (valueAsString: string, valueAsNumber: number) => {
    setPrediction({ ...prediction, scoreTeam2: valueAsNumber });
    onChangePredictionScoreTeam2(index, valueAsNumber);
  };

  return (
    <>
      <Box
        border={'1px #3182ce solid'}
        margin={'5px'}
        padding={'5px'}
        borderRadius={'10px'}>
        <SimpleGrid minChildWidth="120px" spacing="40px">
          <Center>
            <Text fontSize="2xl">
              {predictionModel.groupName
                ? predictionModel.groupName
                : predictionModel.phaseName}
            </Text>
          </Center>
        </SimpleGrid>
        <SimpleGrid>
          <Center>
            <Text fontSize="1xl">
              <Badge
                ml="1"
                fontSize="0.8em"
                colorScheme={predictionModel.closed ? 'red' : 'green'}>
                {new Date(predictionModel.date).toLocaleDateString()}
              </Badge>
            </Text>
          </Center>
        </SimpleGrid>
        {predictionModel.closed ? (
          <FormPredictionResult
            key={predictionModel.gameId}
            predictionModel={predictionModel}></FormPredictionResult>
        ) : (
          <></>
        )}
        <SimpleGrid columns={2} spacing="20px">
          <Box>
            <SimpleGrid columns={1} spacing="5px">
              <Center>
                <Text fontSize="1xl">
                  {predictionModel.team1Name ? predictionModel.team1Name : ''}
                </Text>
              </Center>
              <FormControl>
                <NumberInput
                  min={0}
                  max={255}
                  id="scoreTeam1"
                  name="scoreTeam1"
                  placeholder="Punto equipo 1"
                  defaultValue={prediction.scoreTeam1}
                  onChange={onChangeScoreTeam1}
                  isReadOnly={predictionModel.closed}>
                  <NumberInputField textAlign={'center'} />
                </NumberInput>
              </FormControl>
            </SimpleGrid>
          </Box>
          <Box>
            <SimpleGrid columns={1} spacing="5px">
              <Center>
                <Text fontSize="1xl">
                  {predictionModel.team2Name ? predictionModel.team2Name : ''}
                </Text>
              </Center>
              <FormControl>
                <NumberInput
                  min={0}
                  max={255}
                  id="scoreTeam2"
                  name="scoreTeam2"
                  placeholder="Punto equipo 2"
                  defaultValue={prediction.scoreTeam2}
                  onChange={onChangeScoreTeam2}
                  isReadOnly={predictionModel.closed}>
                  <NumberInputField textAlign={'center'} />
                </NumberInput>
              </FormControl>
            </SimpleGrid>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
}
