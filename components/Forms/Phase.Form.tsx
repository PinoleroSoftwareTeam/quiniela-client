import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  Box,
  Button,
  useToast,
} from '@chakra-ui/react';
import HttpServices from '../../services/httpServices';
import { endpoint } from '../../constants/endpoints';
import { IPhase } from '../../models/IPhase';

const httpServices = new HttpServices();

export function FormPhase({
  onClose,
  modelPhase,
  onLoadData,
}: {
  onClose: () => void;
  modelPhase: IPhase;
  onLoadData: () => void;
}) {
  const [phase, setPhase] = useState<IPhase>(modelPhase);
  const toast = useToast();

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setPhase({ ...phase, [name]: value });
  };

  const handleOnClickSave = (e: any) => {
    if (phase.id > 0) {
      httpServices
        .put(endpoint.phase.put, phase.id, phase)
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
    } else
      httpServices
        .post(endpoint.phase.post, phase)
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
          <FormControl onChange={handleChange}>
            <FormLabel htmlFor="name">Nombre</FormLabel>
            <Input
              id="name"
              name="name"
              placeholder="Nombre del evento"
              value={phase.name}
            />
          </FormControl>
          <br />
          <FormControl onChange={handleChange}>
            <FormLabel htmlFor="description">Descripcion</FormLabel>
            <Input
              id="description"
              name="description"
              placeholder="Descripcion"
              value={phase.description}
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
