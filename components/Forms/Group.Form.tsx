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
import { ICalendar } from '../../models/ICalendar';

const httpServices = new HttpServices();

export function FormGroup({
  onClose,
  modelGroup,
  onLoadData,
  calendars,
}: {
  onClose: () => void;
  modelGroup: IGroup;
  onLoadData: () => void;
  calendars: ICalendar[];
}) {
  const [group, setGroup] = useState<IGroup>(modelGroup);
  const toast = useToast();

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setGroup({ ...group, [name]: value });
  };

  const handleOnClickSave = (e: any) => {
    if (group.id > 0) {
      httpServices
        .put(endpoint.group.put, group.id, group)
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
        .post(endpoint.group.post, group)
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
              value={group.name}
            />
          </FormControl>
          <br />
          <FormControl onChange={handleChange}>
            <FormLabel htmlFor="description">Descripcion</FormLabel>
            <Input
              id="description"
              name="description"
              placeholder="Descripcion"
              value={group.description}
            />
          </FormControl>
          <br />
          <FormControl onChange={handleChange}>
            <FormLabel htmlFor="amount">Cantidad</FormLabel>
            <NumberInput
              min={0}
              max={2060}
              id="amount"
              name="amount"
              placeholder="Cantidad"
              defaultValue={group.amount.toString()}>
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <br />
          <FormControl>
            <FormLabel htmlFor="calendarId">Torneo</FormLabel>
            <Select
              id="calendarId"
              name="calendarId"
              placeholder="Seleccione el torneo"
              defaultValue={group.calendarId.toString()}
              onChange={handleChange}>
              {calendars.map(calendar => (
                <option value={calendar.id.toString()}>{calendar.name}</option>
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
