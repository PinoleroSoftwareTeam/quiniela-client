import { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  useColorModeValue,
  Box,
  Button,
  Select,
  useToast,
} from '@chakra-ui/react';
import HttpServices from '../../services/httpServices';
import { endpoint } from '../../constants/endpoints';
import { IGame } from '../../models';

const httpServices = new HttpServices();

interface FormGameResultProps {
  onClose: () => void;
  modelGame: IGame;
  onLoadData: () => void;
}

export function FormGameResult({
  onClose,
  modelGame,
  onLoadData,
}: FormGameResultProps) {
  const toast = useToast();
  const [game, setGames] = useState<IGame>(modelGame);

  const onChangeScoreTeam1 = (valueAsString: string, valueAsNumber: number) => {
    setGames({ ...game, pointTeam1: valueAsNumber });
  };

  const onChangeScoreTeam2 = (valueAsString: string, valueAsNumber: number) => {
    setGames({ ...game, pointTeam2: valueAsNumber });
  };
  const handleOnClickSave = (e: any) => {
    httpServices
      .put(endpoint.game.putResult, game.id, game)
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
        onClose();
        onLoadData();
      })
      .catch(error => {});
  };

  return (
    <>
      <main>
        <Box bg={useColorModeValue('white', 'gray.700')} p={8}>
          <h1>Juego</h1>
          <br />
          <h2>{modelGame.calendarName}</h2>
          <br />
          <h2>{modelGame.phaseName}</h2>
          <br />
          <h2>{modelGame.groupName}</h2>
          <br />
          <form>
            <FormControl>
              <FormLabel htmlFor="pointTeam1">{modelGame.team1Name}</FormLabel>
              <NumberInput
                min={0}
                max={255}
                id="pointTeam1"
                name="pointTeam1"
                placeholder="Punto equipo 1"
                border="solid 1px 1px 1px 1px"
                defaultValue={modelGame.pointTeam1}
                onChange={onChangeScoreTeam1}>
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <br />
            <FormControl>
              <FormLabel htmlFor="pointTeam2">{modelGame.team2Name}</FormLabel>
              <NumberInput
                min={0}
                max={255}
                id="pointTeam2"
                name="pointTeam2"
                placeholder="Punto equipo 2"
                defaultValue={modelGame.pointTeam2}
                onChange={onChangeScoreTeam2}>
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <br></br>
            <Button colorScheme="teal" onClick={handleOnClickSave}>
              Guardar
            </Button>
          </form>
        </Box>
      </main>
    </>
  );
}
