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
  Checkbox,
  RadioGroup,
  Radio,
  Stack,
} from '@chakra-ui/react';
import { FormPredictionResult } from '../Forms';

interface FormPredictionProps {
  predictionModel: any;
  index: number;
  onChangePredictionScoreTeam1: (index: number, scoreTeam1: number) => void;
  onChangePredictionScoreTeam2: (index: number, scoreTeam2: number) => void;
  onChangePredictionWinPenaltiesTeam: (
    index: number,
    winPenaltiesTeam1: boolean,
    winPenaltiesTeam2: boolean
  ) => void;
}

export function FormPrediction({
  predictionModel,
  index,
  onChangePredictionScoreTeam1,
  onChangePredictionScoreTeam2,
  onChangePredictionWinPenaltiesTeam,
}: FormPredictionProps) {
  const [prediction, setPrediction] = useState(predictionModel);
  const [isPredictionPenalties, setIsPredictionPenalties] = useState(
    predictionModel.scoreTeam1 === predictionModel.scoreTeam2
  );

  const onChangeScoreTeam1 = (valueAsString: string, valueAsNumber: number) => {
    setPrediction({ ...prediction, scoreTeam1: valueAsNumber });
    onChangePredictionScoreTeam1(index, valueAsNumber);
    setIsPredictionPenalties(valueAsNumber === prediction.scoreTeam2);
  };

  const onChangeScoreTeam2 = (valueAsString: string, valueAsNumber: number) => {
    setPrediction({ ...prediction, scoreTeam2: valueAsNumber });
    onChangePredictionScoreTeam2(index, valueAsNumber);
    setIsPredictionPenalties(prediction.scoreTeam1 === valueAsNumber);
  };

  const onChangeWinPenaltiesSelection = (e: string) => {
    if (e === '1') {
      prediction.winPenaltiesTeam2Prediction = true;
      prediction.winPenaltiesTeam1Prediction = false;
    } else {
      prediction.winPenaltiesTeam2Prediction = true;
      prediction.winPenaltiesTeam1Prediction = false;
    }
    setPrediction(prediction);
    onChangePredictionWinPenaltiesTeam(
      index,
      prediction.winPenaltiesTeam1Prediction,
      prediction.winPenaltiesTeam2Prediction
    );
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
        {predictionModel.qualified ? (
          <FormPredictionResult
            key={predictionModel.gameId}
            predictionModel={predictionModel}></FormPredictionResult>
        ) : (
          <></>
        )}
        {!predictionModel.isEliminatory ? (
          <></>
        ) : isPredictionPenalties ? (
          <SimpleGrid>
            <Center>Ganador en penales</Center>
            <Center>
              <RadioGroup
                defaultValue={
                  prediction.winPenaltiesTeam1Prediction
                    ? '1'
                    : prediction.winPenaltiesTeam2Prediction
                    ? '2'
                    : ''
                }
                onChange={onChangeWinPenaltiesSelection}>
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="green" value="1">
                    {predictionModel.team1Name}
                  </Radio>
                  <Radio colorScheme="green" value="2">
                    {predictionModel.team2Name}
                  </Radio>
                </Stack>
              </RadioGroup>
            </Center>
          </SimpleGrid>
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
                  isReadOnly={predictionModel.closed}
                  precision={0}>
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
                  isReadOnly={predictionModel.closed}
                  precision={0}>
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
