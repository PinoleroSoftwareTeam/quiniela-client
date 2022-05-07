import Layout from '../components/Layout';
import { TableTeams } from '../components/Tables';
import Head from 'next/head';
import Drawer from '../components/Drawer';
import { FormTeams } from '../components/Forms';
import {
  useColorModeValue,
  Box,
  Heading,
  Flex,
  Spacer,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

export default function Teams() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <main>
        <Head>
          <title>Quiniela - Teams</title>
        </Head>

        <Drawer title="Equipos" isOpen={isOpen} onClose={onClose}>
          <FormTeams />
        </Drawer>
        <Layout>
          <Box bg={useColorModeValue('white', 'gray.700')} p={8}>
            <Flex>
              <Heading as="h1" size="lg">
                Equipos
              </Heading>
              <Spacer />
              <Button onClick={onOpen}>Nuevo</Button>
            </Flex>
          </Box>
          <br />
          <TableTeams />
        </Layout>
      </main>
    </>
  );
}
