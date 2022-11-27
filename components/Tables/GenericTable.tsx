import { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  CircularProgress,
  Button,
  Show,
  Hide,
  Switch,
  useColorModeValue,
} from '@chakra-ui/react';

interface ColumnData {
  name: string;
  display: string;
  key: boolean;
  hidde: boolean;
  isAction: boolean;
  action?: any;
  isCheck?: boolean;
  event?: any;
}

function GenericTable({ columns, rows }: { columns: ColumnData[]; rows: [] }) {
  const bgColor = useColorModeValue('brand.purple', 'brand.yellow');
  const bgColorHover = useColorModeValue(
    'brand.purple-dark',
    'brand.yellow-dark'
  );
  return (
    <Box
      bg={useColorModeValue('white', 'gray.700')}
      textColor={useColorModeValue('gray.900', 'white')}
      p={8}>
      <TableContainer>
        <Table variant="simple" key="tableGeneric">
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
            {rows &&
              rows.map((row, rowIndex) => {
                let keyColumn = columns.filter(x => x.key)[0];
                let keyName = keyColumn ? keyColumn.name : '';
                return (
                  <Tr key={rowIndex}>
                    {columns.map((column, columnIndex) =>
                      !column.isAction ? (
                        !column.isCheck ? (
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
                            <Switch
                              key={keyName ? row[keyName] : rowIndex}
                              isChecked={
                                row[column.name] ? row[column.name] : false
                              }
                              onChange={e => column.event(e, row)}
                            />
                          </Td>
                        )
                      ) : (
                        <Td>
                          <Button
                            backgroundColor={bgColor}
                            color="white"
                            _hover={{
                              bg: bgColorHover,
                            }}
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
        </Table>
      </TableContainer>
    </Box>
  );
}

export default GenericTable;
