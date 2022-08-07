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
import { ISelected, IQuiniela } from '../../models';

const httpServices = new HttpServices();
interface FormQuinielaProps {
  onClose: () => void;
  modelQuiniela: IQuiniela;
  onLoadData: () => void;
  calendar: ISelected[];
}

export function FormQuiniela({
  onClose,
  modelQuiniela,
  onLoadData,
  calendar,
}: FormQuinielaProps) {
  const httpServices = new HttpServices();
  const toast = useToast();
  const [quiniela, setQuiniela] = useState<IQuiniela>(modelQuiniela);

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setQuiniela({ ...quiniela, [name]: value });
  };

  const create = () => {
    httpServices
      .post(endpoint.quiniela.post, quiniela)
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
      .put(endpoint.quiniela.put, quiniela.id, quiniela)
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
    if (quiniela.id > 0) update();
    else create();
  };
  return (
    <>
      <form>
        <FormControl onChange={handleChange}>
          <FormLabel htmlFor="name">Nombre</FormLabel>
          <Input
            id="name"
            name="name"
            placeholder="Nombre del evento"
            value={quiniela.name}
          />
        </FormControl>
        <br />
        <FormControl onChange={handleChange}>
          <FormLabel htmlFor="description">Descripcion</FormLabel>
          <Input
            id="description"
            name="description"
            placeholder="Descripcion"
            value={quiniela.description}
          />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel htmlFor="calendarId">Liga</FormLabel>
          <Select
            id="calendarId"
            name="calendarId"
            placeholder="Seleccione una liga"
            defaultValue={
              quiniela.calendarId ? quiniela.calendarId.toString() : ''
            }
            onChange={handleChange}>
            {calendar.map(cal => (
              <option value={cal.key.toString()}>{cal.value}</option>
            ))}
          </Select>
        </FormControl>
        <br />
        <Button colorScheme="teal" onClick={handleOnClickSave}>
          Guardar
        </Button>
      </form>
    </>
  );
}
