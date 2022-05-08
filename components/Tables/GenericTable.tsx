import { useState } from 'react';
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
  CircularProgress,
  Button,
  Show,
  Hide,
} from '@chakra-ui/react';
import HttpServices from '../../services/httpServices';

interface ColumnData {
  name: string;
  display: string;
  key: boolean;
  hidde: boolean;
  isAction: boolean;
  action?: any;
}

const httpServices = new HttpServices();

function GenericTable({ columns, rows }: { columns: ColumnData[]; rows: [] }) {
  const [isLoading, setLoading] = useState(false);

  if (isLoading) return <CircularProgress isIndeterminate color="green.300" />;

  return (
    <main>
      <Box bg={useColorModeValue('white', 'gray.700')} p={8}>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                {columns.map((column, index) =>
                  !column.hidde ? (
                    <Show>
                      <Th key={index}>{column.display}</Th>
                    </Show>
                  ) : (
                    <Hide>
                      <Th key={index}>{column.display}</Th>
                    </Hide>
                  )
                )}
              </Tr>
            </Thead>
            <Tbody>
              {rows.map((row, rowIndex) => {
                let keyColumn = columns.filter(x => x.key)[0];
                let keyName = keyColumn ? keyColumn.name : '';
                return (
                  <Tr key={rowIndex}>
                    {columns.map((column, columnIndex) =>
                      !column.isAction ? (
                        !column.hidde ? (
                          <Show>
                            <Td key={keyName ? row[keyName] : rowIndex}>
                              {row[column.name]}
                            </Td>
                          </Show>
                        ) : (
                          <Hide>
                            <Td key={keyName ? row[keyName] : rowIndex}>
                              {row[column.name]}
                            </Td>
                          </Hide>
                        )
                      ) : (
                        <Td>
                          <Button
                            key={keyName ? row[keyName] : rowIndex}
                            onClick={() => column.action(row)}>
                            {column.name}
                          </Button>
                        </Td>
                      )
                    )}
                  </Tr>
                );
              })}
            </Tbody>
            <Tfoot></Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </main>
  );
}

export default GenericTable;
