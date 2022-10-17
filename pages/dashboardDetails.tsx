import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  SimpleGrid,
  Text,
  Grid,
  FormControl,
  FormLabel,
  Switch,
  useColorModeValue,
  Show,
  others,
} from '@chakra-ui/react';
import HttpServices from '../services/httpServices';
import { endpoint } from '../constants/endpoints';
import {
  IPredictionQuinielaUserDashboard,
  IPredictionQuinielaUserDashboardByDate,
} from '../models';
import DashboardDetailDefault from '../components/DashboardDetailDefault';
import DashboardDetailByFecha from '../components/DashboardDetailByFecha';
import Head from 'next/head';
import Layout from '../components/Layout';

const httpServices = new HttpServices();
interface IData {
  predictionDefault: IPredictionQuinielaUserDashboard[];
  predictionByDate: IPredictionQuinielaUserDashboardByDate[];
}

export default function DashboardDetails() {
  const router = useRouter();
  const { param1, param2 } = router.query;
  const [data, setData] = useState<IData>({
    predictionDefault: [],
    predictionByDate: [],
  });
  const [groupByDate, setGroupByDate] = useState(false);

  const loadData = () => {
    httpServices
      .get(`${endpoint.dashboard.getByQuinielaUser}${param1}/${param2}`)
      .then(res => res.json())
      .then(data => {
        sortGroupByDate(data);
      });
  };

  const sortGroupByDate = (data: IPredictionQuinielaUserDashboard[]) => {
    const dataByDate: IPredictionQuinielaUserDashboardByDate[] = [];
    data.forEach(item => {
      const existsGroup = dataByDate.filter(x => x.date === item.dateFormat);
      if (existsGroup && existsGroup.length === 0)
        dataByDate.push({
          predictions: [],
          date: item.dateFormat,
        });
    });
    dataByDate.forEach(groupDate => {
      const existsPredictions = data.filter(
        x => x.dateFormat === groupDate.date
      );
      if (existsPredictions && existsPredictions.length > 0) {
        let total = 0;
        existsPredictions.forEach(x => (total += x.totalPoint));
        groupDate.predictions = existsPredictions;
        groupDate.total = total;
      }
    });
    setData({
      predictionDefault: data,
      predictionByDate: dataByDate,
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const onChangeGroupByDate = (e: any) => {
    const { checked } = e.target;
    setGroupByDate(checked);
  };

  return (
    <>
      <Head>
        <title>Quiniela</title>
        <meta name="description" content="Quiniela App" />
      </Head>
      <main>
        <Layout>
          <Box bg={useColorModeValue('white', 'gray.700')} p={8}>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="email-alerts" mb="0">
                Agrupar por fecha
              </FormLabel>
              <Switch
                id="groupByDate"
                size="lg"
                onChange={e => onChangeGroupByDate(e)}
              />
            </FormControl>
          </Box>
          <br></br>
          {!groupByDate ? (
            <DashboardDetailDefault
              predictions={data.predictionDefault}></DashboardDetailDefault>
          ) : (
            <DashboardDetailByFecha
              predictions={data.predictionByDate}></DashboardDetailByFecha>
          )}
        </Layout>
      </main>
    </>
  );
}
