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
  useToast,
} from '@chakra-ui/react';
import HttpServices from '../../services/httpServices';
import { useState } from 'react';
import { ISelected, IGame } from '../../models';
import { endpoint } from '../../constants/endpoints';

interface FormGamesProps {
  onClose: () => void;
  modelGame: IGame;
  onLoadData: () => void;
  calendar: ISelected[];
  phase: ISelected[];
}
export function FormGames({
  onClose,
  modelGame,
  onLoadData,
  calendar,
  phase,
}: FormGamesProps) {
  const httpServices = new HttpServices();
  const toast = useToast();

  const [game, setGames] = useState<IGame>(modelGame);
  const [groups, setGroup] = useState<ISelected[]>([]);
  const [teams, setTeam] = useState<ISelected[]>([]);

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setGames({ ...game, [name]: value });
    switch (name) {
      case 'calendarId':
        loadGroup(value);
        break;
      case 'groupId':
        loadTeams(value);
        break;
    }
  };

  const loadTeams = (value: any) => {
    if (value) {
      httpServices
        .get(endpoint.groupTeam.SelectedById + value)
        .then(res => res.json())
        .then(data => {
          setTeam(data);
        });
    } else {
      httpServices
        .get(endpoint.team.selected)
        .then(res => res.json())
        .then(data => {
          setTeam(data);
        });
    }
  };

  const loadGroup = (value: any) => {
    httpServices
      .get(endpoint.group.SelectedById + value)
      .then(res => res.json())
      .then(data => {
        setGroup(data);
      });
    loadTeams(null);
  };

  const create = () => {
    httpServices
      .post(endpoint.game.post, game)
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
      .catch(error => {
        console.log(error);
      });
  };

  const update = () => {
    httpServices
      .put(endpoint.game.put, game.id, game)
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
      .catch(error => {
        console.log(error);
      });
  };

  const handleOnClickSave = (e: any) => {
    if (game.id > 0) update();
    else create();
  };

  return (
    <>
      <main>
        <Box bg={useColorModeValue('white', 'gray.700')} p={8}>
          <h1>Partidos</h1>
          <form>
            <FormControl>
              <FormLabel htmlFor="calendarId">Liga</FormLabel>
              <Select
                id="calendarId"
                name="calendarId"
                placeholder="Seleccione una liga"
                defaultValue={game.calendarId ? game.calendarId.toString() : ''}
                onChange={handleChange}>
                {calendar.map(cal => (
                  <option value={cal.key.toString()}>{cal.value}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="phaseId">Face</FormLabel>
              <Select
                id="phaseId"
                name="phaseId"
                placeholder="Seleccione una face"
                defaultValue={game.phaseId ? game.phaseId.toString() : ''}
                onChange={handleChange}>
                {phase.map(pha => (
                  <option value={pha.key.toString()}>{pha.value}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="date">Fecha</FormLabel>
              <Input
                id="date"
                type="Date"
                name="dateStart"
                placeholder="Fecha Inicio"
                defaultValue={game.date}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="groupId">Grupo</FormLabel>
              <Select
                id="groupId"
                name="groupId"
                placeholder="Ninguno"
                defaultValue={game.groupId ? game.groupId.toString() : ''}
                onChange={handleChange}>
                {groups.map(gro => (
                  <option value={gro.key.toString()}>{gro.value}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="team1Id">Equipo 1</FormLabel>
              <Select
                id="team1Id"
                name="team1Id"
                placeholder="Seleccione un equipo"
                defaultValue={game.team1Id ? game.team1Id.toString() : ''}
                onChange={handleChange}>
                {teams.map(team => (
                  <option value={team.key.toString()}>{team.value}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="team2Id">Equipo 1</FormLabel>
              <Select
                id="team2Id"
                name="team2Id"
                placeholder="Seleccione un equipo"
                defaultValue={game.team2Id ? game.team2Id.toString() : ''}
                onChange={handleChange}>
                {teams.map(team => (
                  <option value={team.key.toString()}>{team.value}</option>
                ))}
              </Select>
            </FormControl>
            <br />
            <Button colorScheme="teal" onClick={handleOnClickSave}>
              Guardar
            </Button>
          </form>
        </Box>
      </main>
    </>
  );
}
