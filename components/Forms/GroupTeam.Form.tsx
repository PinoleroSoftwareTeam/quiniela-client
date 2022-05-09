import { useState } from 'react';
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
import { IGroup } from '../../models/IGroup';
import { ITeam } from '../../models/ITeam';
import { IGroupTeam } from '../../models/IGroupTeam';

const httpServices = new HttpServices();

export function FormGroupTeam({
  onClose,
  modelGroupTeam,
  onLoadData,
  groups,
  teams,
}: {
  onClose: () => void;
  modelGroupTeam: IGroupTeam;
  onLoadData: () => void;
  groups: IGroup[];
  teams: ITeam[];
}) {
  const [groupTeam, setGroupTeam] = useState<IGroupTeam>(modelGroupTeam);
  const toast = useToast();

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setGroupTeam({ ...groupTeam, [name]: value });
  };

  const handleOnClickSave = (e: any) => {
    if (groupTeam.id > 0) {
      httpServices
        .put(endpoint.groupTeam.put, groupTeam.id, groupTeam)
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
    } else
      httpServices
        .post(endpoint.groupTeam.post, groupTeam)
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

  return (
    <>
      <main>
        <Box bg={useColorModeValue('white', 'gray.700')} p={8}>
          <FormControl>
            <FormLabel htmlFor="groupId">Torneo</FormLabel>
            <Select
              id="groupId"
              name="groupId"
              placeholder="Seleccione el grupo"
              defaultValue={groupTeam.groupId.toString()}
              onChange={handleChange}>
              {groups.map(group => (
                <option value={group.id.toString()}>{group.name}</option>
              ))}
            </Select>
          </FormControl>
          <br />
          <FormControl>
            <FormLabel htmlFor="teamId">Equipo</FormLabel>
            <Select
              id="teamId"
              name="teamId"
              placeholder="Seleccione el equipo"
              defaultValue={groupTeam.teamId.toString()}
              onChange={handleChange}>
              {teams.map(team => (
                <option value={team.id.toString()}>{team.name}</option>
              ))}
            </Select>
          </FormControl>
          <br />
          <Button colorScheme="teal" onClick={handleOnClickSave}>
            Guardar
          </Button>
        </Box>
      </main>
    </>
  );
}
