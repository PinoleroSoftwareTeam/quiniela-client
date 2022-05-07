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
  } from "@chakra-ui/react";
import { useState } from "react";
import HttpServices from '../../services/httpServices';
import { endpoint } from "../../constants/endpoints";

const httpServices = new HttpServices();

export function FormCalendar({onClose}: {onClose: () => void}) {
    const [calendar, setCalendar] = useState({});

    const handleChange = (e: any) => {
        const { value, name } = e.target;
        setCalendar({...calendar, [name]: value});
    };

    const handleOnClickSave = (e: any) => {        
        httpServices.post(endpoint.calendar.postCalendar, calendar)
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(data => {
                console.log(data);
                onClose();
            });
    }

    return(
        <>
        <main>
            <Box bg={useColorModeValue("white", "gray.700")} p={8}>
                <FormControl onChange={handleChange}>
                    <FormLabel htmlFor="name">Nombre</FormLabel>
                    <Input id='name' name="Name" placeholder='Nombre del evento' />
                </FormControl>
                <br />
                <FormControl onChange={handleChange}>
                    <FormLabel htmlFor="description">Descripcion</FormLabel>
                    <Input id='description' name="Description" placeholder='Descripcion' />
                </FormControl>
                <br />
                <FormControl onChange={handleChange}>
                    <FormLabel htmlFor="DateStart">Fecha inicio</FormLabel>
                    <Input id='DateStart' name="DateStart" placeholder='Fecha Inicio' type="date" />
                </FormControl>
                <br />
                <FormControl onChange={handleChange}>
                    <FormLabel htmlFor="DateEnd">Fecha finalizacion</FormLabel>
                    <Input id='DateEnd' name="DateEnd" placeholder='Fecha Finalizacion' type="date" />
                </FormControl>
                <br />
                <FormControl onChange={handleChange} >
                    <FormLabel htmlFor="Year">Año</FormLabel>
                    <NumberInput min={0} max={2060} id="Year" name="Year" placeholder="Año">
                        <NumberInputField />
                    </NumberInput>
                </FormControl>
                <br />
                <FormControl onChange={handleChange} >
                    <FormLabel htmlFor="ScoreWin">Puntos por victoria</FormLabel>
                    <NumberInput min={0} max={255} id="ScoreWin" name="ScoreWin" placeholder="Punto por victoria">
                        <NumberInputField />
                    </NumberInput>
                </FormControl>
                <br />
                <FormControl onChange={handleChange} >
                    <FormLabel htmlFor="ScorePoint">Puntos por resultado</FormLabel>
                    <NumberInput min={0} max={255} id="ScorePoint" name="ScorePoint" placeholder="Punto por resultado">
                        <NumberInputField />
                    </NumberInput>
                </FormControl>
                <br />
                <Button colorScheme="teal" onClick={handleOnClickSave}>Guardar</Button>
            </Box>
        </main>
        </>
    );
}