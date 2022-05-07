import React from 'react';
import Layout from '../components/Layout';
import {
  Heading,
  Box,
  useColorModeValue,
  Flex,
  Spacer,
  Button,
} from '@chakra-ui/react';
import { TableUsers } from '../components/Tables';

export default function Users() {
  return (
    <>
      <main>
        <Layout>
          <Box bg={useColorModeValue('white', 'gray.700')} p={8}>
            <Flex>
              <Heading as="h1" size="lg">
                Usuarios
              </Heading>
              <Spacer />
              <Button>Nuevo</Button>
            </Flex>
          </Box>
          <br />
          <TableUsers />
        </Layout>
      </main>
    </>
  );
}
