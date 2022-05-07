import React from 'react';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';

export function TableUsers() {
  return (
    <>
      <main>
        <Box bg={useColorModeValue('white', 'gray.700')} p={8}>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Nombre</Th>
                  <Th>Descripcion</Th>
                  <Th>Logo</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>feet</Td>
                  <Td>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </Td>
                  <Td>feet</Td>
                </Tr>
                <Tr>
                  <Td>yards</Td>
                  <Td>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </Td>
                  <Td>yards</Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Td>To convert</Td>
                  <Td>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </Td>
                  <Td>To convert</Td>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      </main>
    </>
  );
}

export default TableUsers;
