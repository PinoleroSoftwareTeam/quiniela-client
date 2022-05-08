import { useRouter } from 'next/router';
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
} from '@chakra-ui/react';
import HttpServices from '../../services/httpServices';
import { endpoint } from '../../constants/endpoints';
import { ICalendar } from '../../models/ICalendar';

const httpServices = new HttpServices();

export function FormCalendar({
  onClose,
  modelCalendar,
  onLoadData,
}: {
  onClose: () => void;
  modelCalendar: ICalendar;
  onLoadData: () => void;
}) {
  const [calendar, setCalendar] = useState<ICalendar>(modelCalendar);
  const router = useRouter();

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setCalendar({ ...calendar, [name]: value });
  };

  const handleOnClickSave = (e: any) => {
    if (calendar.id > 0) {
      httpServices
        .put(endpoint.calendar.putCalendar, calendar.id, calendar)
        .then(res => {
          return res.json();
        })
        .then(data => {
          onClose();
          onLoadData();
        })
        .catch(error => {
          console.log(error);
        });
    } else
      httpServices
        .post(endpoint.calendar.postCalendar, calendar)
        .then(res => {
          return res.json();
        })
        .then(data => {
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
              value={calendar.name}
            />
          </FormControl>
          <br />
          <FormControl onChange={handleChange}>
            <FormLabel htmlFor="description">Descripcion</FormLabel>
            <Input
              id="description"
              name="description"
              placeholder="Descripcion"
              value={calendar.description}
            />
          </FormControl>
          <br />
          <FormControl onChange={handleChange}>
            <FormLabel htmlFor="DateStart">Fecha inicio</FormLabel>
            <Input
              id="DateStart"
              name="dateStart"
              placeholder="Fecha Inicio"
              type="date"
              defaultValue={calendar.dateStart}
            />
          </FormControl>
          <br />
          <FormControl onChange={handleChange}>
            <FormLabel htmlFor="DateEnd">Fecha finalizacion</FormLabel>
            <Input
              id="DateEnd"
              name="dateEnd"
              placeholder="Fecha Finalizacion"
              type="date"
              defaultValue={calendar.dateEnd}
            />
          </FormControl>
          <br />
          <FormControl onChange={handleChange}>
            <FormLabel htmlFor="Year">Año</FormLabel>
            <NumberInput
              min={0}
              max={2060}
              id="Year"
              name="year"
              placeholder="Año"
              defaultValue={calendar.year.toString()}>
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <br />
          <FormControl onChange={handleChange}>
            <FormLabel htmlFor="ScoreWin">Puntos por victoria</FormLabel>
            <NumberInput
              min={0}
              max={255}
              id="ScoreWin"
              name="scoreWin"
              placeholder="Punto por victoria"
              defaultValue={calendar.scoreWin.toString()}>
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <br />
          <FormControl onChange={handleChange}>
            <FormLabel htmlFor="ScorePoint">Puntos por resultado</FormLabel>
            <NumberInput
              min={0}
              max={255}
              id="ScorePoint"
              name="scorePoint"
              placeholder="Punto por resultado"
              defaultValue={calendar.scorePoint.toString()}>
              <NumberInputField />
            </NumberInput>
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
