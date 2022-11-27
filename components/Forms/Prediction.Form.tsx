import { useState } from 'react';
import {
  FormControl,
  NumberInput,
  NumberInputField,
  Box,
  Divider,
  Badge,
  Center,
  SimpleGrid,
  Text,
  RadioGroup,
  Radio,
  Stack,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { FormPredictionResult } from '../Forms';
import Image from 'next/image'

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
      prediction.winPenaltiesTeam1Prediction = true;
      prediction.winPenaltiesTeam2Prediction = false;
    } else {
      prediction.winPenaltiesTeam1Prediction = false;
      prediction.winPenaltiesTeam2Prediction = true;
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
        bg={useColorModeValue('white', 'gray.600')}
        boxShadow={'xl'}
        overflow={'hidden'}
        margin={'5px'}
        padding={'5px'}
        rounded="md"
        p="8"
        my="8">
        <Flex justify="space-between" mb="4">
          <Box>
            <Text fontSize="xl" fontWeight="semibold">
              {predictionModel.groupName
                ? predictionModel.groupName
                : predictionModel.phaseName}
            </Text>
          </Box>
          <Box>
            <Badge
              ml="1"
              fontSize="sm"
              colorScheme={predictionModel.closed ? 'red' : 'green'}>
              {new Date(predictionModel.date).toLocaleDateString()}
            </Badge>
          </Box>
        </Flex>

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
        <Divider />
        <SimpleGrid columns={2} spacing="20px">
          <Box>
            <SimpleGrid columns={1} spacing="5px">
              <Center>
                <Flex flexDirection="column" align="center" my="4">
                  <Box mb="6">
                    <Image
                      src={`/../public/img/flags/${predictionModel.team1Name}.png`}
                      alt="/"
                      width="100"
                      height="64"
                    />
                  </Box>
                  <Text fontSize="1xl" fontWeight="semibold" textAlign="center">
                    {predictionModel.team1Name ? predictionModel.team1Name : ''}
                  </Text>
                </Flex>
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
                <Flex flexDirection="column" align="center" my="4">
                  <Box mb="6">
                    <Image
                      src={`/../public/img/flags/${predictionModel.team2Name}.png`}
                      alt="/"
                      width="100"
                      height="64"
                    />
                  </Box>
                  <Text fontSize="1xl" fontWeight="semibold" textAlign="center">
                    {predictionModel.team2Name ? predictionModel.team2Name : ''}
                  </Text>
                </Flex>
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
