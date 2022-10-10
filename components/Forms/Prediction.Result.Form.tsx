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
} from '@chakra-ui/react';

interface FormPredictionProps {
  predictionModel: any;
}

export function FormPredictionResult({ predictionModel }: FormPredictionProps) {
  return (
    <>
      <SimpleGrid>
        <Center>
          <Text fontSize="1xl">
            <Badge ml="1" fontSize="0.8em" colorScheme="green">
              Resultado: {predictionModel.scoreTeam1Game} {' - '}
              {predictionModel.scoreTeam2Game}
            </Badge>
          </Text>
        </Center>
      </SimpleGrid>
      <SimpleGrid>
        <Center>
          <Text fontSize="1xl">
            <Badge
              ml="1"
              fontSize="0.8em"
              colorScheme={predictionModel.winPoint === 0 ? 'red' : 'green'}>
              Puntos Acierto: {predictionModel.winPoint}
            </Badge>
          </Text>
        </Center>
      </SimpleGrid>
      <SimpleGrid>
        <Center>
          <Text fontSize="1xl">
            <Badge
              ml="1"
              fontSize="0.8em"
              colorScheme={predictionModel.scorePoint === 0 ? 'red' : 'green'}>
              Puntos Marcador: {predictionModel.scorePoint}
            </Badge>
          </Text>
        </Center>
      </SimpleGrid>
    </>
  );
}
