import React from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import Drawer from "../components/Drawer";
import GenericTable from "../components/Tables/GenericTable";
import { endpoint } from "../constants/endpoints";
import { FormCalendar } from "../components/Forms/Calendar.Form";
import {    
    Box,
    useColorModeValue,
    Flex,
    Heading,
    Spacer,
    useDisclosure,
    Button,
  } from '@chakra-ui/react'

export default function Calendars() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const columnsName = [
        {name: "id", display: "Id", key: true},
        {name: "name", display: "Name", key: false},
        {name: "description", display: "Description", key: false},
        {name: "dateStart", display: "Date Start", key: false},
        {name: "dateEnd", display: "Date End", key: false},
        {name: "year", display: "Year", key: false},
        {name: "scoreWin", display: "Score Win", key: false},
        {name: "scorePoint", display: "Score Point", key: false},
    ];
    
    return(
        <>
            <main>
                <Head>
                    <title>Quiniela - Calendario</title>
                </Head>
                <Drawer title="Calendario" isOpen={isOpen} onClose={onClose} >
                    <FormCalendar onClose={onClose}></FormCalendar>
                </Drawer>                        
                <Layout>
                    <Box bg={useColorModeValue("white", "gray.700")} p={8}>
                        <Flex>
                            <Heading as="h1" size="lg">
                                Equipos
                            </Heading>
                            <Spacer />                            
                            <Button onClick={onOpen}>Nuevo</Button>
                        </Flex>
                    </Box>
                    <GenericTable columns={columnsName} url={endpoint.calendar.getCalendar}></GenericTable>
                </Layout>
            </main>
        </>
    );    
}