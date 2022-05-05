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
    CircularProgress
  } from "@chakra-ui/react";

  import HttpServices from '../../services/httpServices';
  import { useEffect, useState } from 'react';

  interface ColumnData {
      name: string,
      display: string,
      key: boolean
  }
  
  const httpServices = new HttpServices(); 

  function GenericTable({ columns, url } : { columns: ColumnData[], url: string }) {
    const [rows, setRows] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        httpServices.get(url)
        .then((res) => res.json())
        .then((data) => {
            setRows(data);
            setLoading(false);
        });
    }, []);

    if (isLoading) return <CircularProgress isIndeterminate color='green.300' />

    return(        
        <main>
            <Box bg={useColorModeValue("white", "gray.700")} p={8}>
              <TableContainer>
                  <Table variant='simple'>
                      <Thead>
                          <Tr>
                              {
                                  columns.map((column, index) => <Th key={index}>{column.display}</Th>)
                              }
                          </Tr>
                      </Thead>
                      <Tbody>
                              {
                                  rows.map((row, rowIndex) => {
                                      let keyColumn = columns.filter(x => x.key)[0];
                                      let keyName = keyColumn ? keyColumn.name : "";
                                      console.log(keyName);
                                      return (                                                                                
                                        <Tr key={rowIndex}>
                                            {
                                                columns.map((column, columnIndex) => <Td key={keyName ? row[keyName] : rowIndex}>{row[column.name]}</Td>)
                                            }
                                        </Tr>
                                      );
                                  })
                              }
                      </Tbody>
                      <Tfoot></Tfoot>
                  </Table>
              </TableContainer>
            </Box>
        </main>
    );    
}

  export default GenericTable;