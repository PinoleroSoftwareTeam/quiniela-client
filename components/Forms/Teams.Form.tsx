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
import { ITeam } from '../../models/ITeam';

const httpServices = new HttpServices();

export function FormTeam({
  onClose,
  modelTeam,
  onLoadData,
}: {
  onClose: () => void;
  modelTeam: ITeam;
  onLoadData: () => void;
}) {
  const [team, setTeam] = useState<ITeam>(modelTeam);
  const toast = useToast();

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setTeam({ ...team, [name]: value });
  };

  const handleOnClickSave = (e: any) => {
    if (team.id > 0) {
      httpServices
        .put(endpoint.team.put, team.id, team)
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
        .post(endpoint.team.post, team)
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
          <FormControl onChange={handleChange}>
            <FormLabel htmlFor="name">Nombre</FormLabel>
            <Input
              id="name"
              name="name"
              placeholder="Nombre del evento"
              value={team.name}
            />
          </FormControl>
          <br />
          <FormControl onChange={handleChange}>
            <FormLabel htmlFor="description">Descripcion</FormLabel>
            <Input
              id="description"
              name="description"
              placeholder="Descripcion"
              value={team.description}
            />
          </FormControl>
          <br />
          <FormControl onChange={handleChange}>
            <FormLabel htmlFor="logo">Logo</FormLabel>
            <Input
              id="logo"
              name="logo"
              placeholder="logo url"
              value={team.logo}
            />
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
