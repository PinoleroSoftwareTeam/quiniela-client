import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Heading,
  Box,
  useColorModeValue,
  NumberInput,
  NumberInputField,
  FormControl,
  FormLabel,
  Select,
  Grid,
  GridItem,
  Text,
  Image,
  Flex,
  Center,
  SimpleGrid,
  Button,
  useToast,
  IconButton,
} from '@chakra-ui/react';
import HttpServices from '../services/httpServices';
import { endpoint } from '../constants/endpoints';
import Layout from '../components/Layout';
import { ISelected } from '../models';
import AuthStore from '../services/AuthStore';
import { FormPrediction } from '../components/Forms';
import { SearchIcon } from '@chakra-ui/icons';

export default function Predictions() {
  const httpServices = new HttpServices();
  const [quinielaCbo, setQuinielaCbo] = useState<ISelected[]>([]);
  const [phaseCbo, setPhaseCbo] = useState<ISelected[]>([]);
  const [predictions, setPredictions] = useState<[]>([]);
  const [quinielaSelect, setQuinielaSelect] = useState<ISelected>();
  const [phaseSelect, setPhaseSelect] = useState<ISelected>();
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const loadQuiniela = () => {
    const user = AuthStore.getUser();
    httpServices
      .get(`${endpoint.quinielaPunter.getQuinielaSelectedByUser}${user.userId}`)
      .then(res => res.json())
      .then(data => {
        setQuinielaCbo(data);
      });
  };

  const loadPhase = () => {
    httpServices
      .get(`${endpoint.phase.selected}`)
      .then(res => res.json())
      .then(data => {
        setPhaseCbo(data);
      });
  };

  useEffect(() => {
    loadQuiniela();
    loadPhase();
  }, []);

  const onLoadPrediction = () => {
    const phaseId = phaseSelect ? phaseSelect.phaseId : 0;
    const quinielaId = quinielaSelect ? quinielaSelect.quinielaId : 0;
    if (!phaseId || !quinielaId) return;
    const user = AuthStore.getUser();
    setPredictions([]);
    httpServices
      .get(
        `${endpoint.prediction.getPrediction}${quinielaId}/${phaseId}/${user.userId}`
      )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPredictions(data);
      });
  };

  const onClickFind = () => {
    onLoadPrediction();
  };

  const onChangeQuiniela = (e: any) => {
    const { value, name } = e.target;
    setQuinielaSelect({ ...quinielaSelect, [name]: value });
  };

  const onChangePhase = (e: any) => {
    const { value, name } = e.target;
    setPhaseSelect({ ...phaseSelect, [name]: value });
  };

  const onChangePredictionScoreTeam1 = (index: number, scoreTeam1: number) => {
    const arrayPrediction = predictions;
    arrayPrediction.forEach((prediction: any, predictionIndex: number) => {
      if (predictionIndex == index) {
        prediction.scoreTeam1 = scoreTeam1;
      }
    });
    setPredictions(arrayPrediction);
  };

  const onChangePredictionScoreTeam2 = (index: number, scoreTeam2: number) => {
    const arrayPrediction = predictions;
    arrayPrediction.forEach((prediction: any, predictionIndex: number) => {
      if (predictionIndex == index) {
        prediction.scoreTeam2 = scoreTeam2;
      }
    });
    setPredictions(arrayPrediction);
  };

  const onClickGuardar = () => {
    setLoading(true);
    httpServices
      .post(endpoint.prediction.postRange, predictions)
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.error) {
          toast({
            title: 'Error',
            description: data.message,
            status: 'error',
            duration: 4000,
            isClosable: true,
          });
          return;
        }
        setLoading(false);
        setPredictions([]);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <main>
        <Head>
          <title>Quiniela - Prediccion</title>
        </Head>
        <Layout>
          <Box bg={useColorModeValue('white', 'gray.700')} p={8}>
            <Heading as="h1" size="lg">
              Predicciones
            </Heading>
            <br />
            <form>
              <Grid templateColumns="repeat(5, 1fr)" gap={8}>
                <GridItem colSpan={2} h="10">
                  <FormControl>
                    <FormLabel htmlFor="quinielaId">Quinielas</FormLabel>
                    <Select
                      id="quinielaId"
                      name="quinielaId"
                      placeholder="Seleccione una quiniela"
                      onChange={onChangeQuiniela}>
                      {quinielaCbo.map((itemSelect, index) => (
                        <option
                          key={index}
                          value={
                            itemSelect.key ? itemSelect.key.toString() : ''
                          }>
                          {itemSelect.value}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem colStart={4} colEnd={6} h="10">
                  <FormControl>
                    <FormLabel htmlFor="pahseId">Fases</FormLabel>
                    <Select
                      id="phaseId"
                      name="phaseId"
                      placeholder="Seleccione una fase"
                      onChange={onChangePhase}>
                      {phaseCbo.map((itemSelect, index) => (
                        <option
                          key={index}
                          value={
                            itemSelect.key ? itemSelect.key.toString() : ''
                          }>
                          {itemSelect.value}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
              </Grid>
              <br />
              <Center>
                <IconButton
                  colorScheme="blue"
                  aria-label="Search database"
                  onClick={onClickFind}
                  icon={<SearchIcon />}
                />
              </Center>
            </form>
            <br />
            <br />
            <br />
            {predictions.map((prediction: any, index: number) => {
              return (
                <FormPrediction
                  key={index}
                  predictionModel={prediction}
                  index={index}
                  onChangePredictionScoreTeam1={onChangePredictionScoreTeam1}
                  onChangePredictionScoreTeam2={
                    onChangePredictionScoreTeam2
                  }></FormPrediction>
              );
            })}
            <br />
            <br />
            {predictions && predictions.length > 0 ? (
              <Center>
                <Button
                  isLoading={isLoading}
                  loadingText="Guardando...."
                  colorScheme="teal"
                  variant="outline"
                  onClick={onClickGuardar}>
                  Guardar
                </Button>
              </Center>
            ) : (
              ''
            )}
          </Box>
        </Layout>
      </main>
    </>
  );
}
