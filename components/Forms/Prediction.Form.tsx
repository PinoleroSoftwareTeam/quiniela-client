import { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Select,
  Input,
  NumberInput,
  NumberInputField,
  useColorModeValue,
  Box,
  Button,
  Badge,
  Center,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';

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
      <form>
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
                  <NumberInputField />
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
                  <NumberInputField />
                </NumberInput>
              </FormControl>
            </SimpleGrid>
          </Box>
        </SimpleGrid>
      </form>
    </>
  );
}
