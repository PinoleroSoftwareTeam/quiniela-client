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
  Button,
} from "@chakra-ui/react";

export default function TableGames() {
  return (
    <>
      <main>
        <Box bg={useColorModeValue("white", "gray.700")} p={8}>
          <Button m={5}>Nuevo</Button>

          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Fecha</Th>
                  <Th>Fase</Th>
                  <Th>Equipo 1</Th>
                  <Th>Equipo 2</Th>
                  <Th>Goles Equipo 1</Th>
                  <Th>Goles Equipo 2</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>inches</Td>
                  <Td>inches</Td>
                  <Td>inches</Td>
                  <Td>inches</Td>
                  <Td>inches</Td>
                  <Td>inches</Td>
                </Tr>
                <Tr>
                  <Td>feet</Td>
                  <Td>feet</Td>
                  <Td>feet</Td>
                  <Td>feet</Td>
                  <Td>feet</Td>
                  <Td>feet</Td>
                </Tr>
                <Tr>
                  <Td>yards</Td>
                  <Td>yards</Td>
                  <Td>yards</Td>
                  <Td>yards</Td>
                  <Td>yards</Td>
                  <Td>yards</Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Td>To convert</Td>
                  <Td>To convert</Td>
                  <Td>To convert</Td>
                  <Td>To convert</Td>
                  <Td>To convert</Td>
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
