import {
  Box,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  SimpleGrid,
  Text,
  useColorModeValue,
  Image,
  Flex,
  Avatar,
  Stack,
  Heading,
  Divider,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { IPredictionQuinielaUserDashboardByDate } from '../models/IPredictionQuinielaUserDashboardByDate';

export default function DashboardDetailDefault({
  predictions,
}: {
  predictions: Array<IPredictionQuinielaUserDashboardByDate>;
}) {
  return (
    <>
      <Flex flexDirection="column">
        {predictions.map((item, index) => {
          return (
            <>
              <Heading size="md" mt="4" mb="2">
                {item.date}
              </Heading>
              <Flex flexWrap="wrap" justifyContent='center'>
                {item.predictions.map(prediction => {
                  return (
                    <Box
                      maxW={'270px'}
                      w={'full'}
                      m="4"
                      bg={useColorModeValue('white', 'gray.700')}
                      boxShadow={'xl'}
                      rounded={'md'}
                      overflow={'hidden'}>
                      <Flex justify={'center'}>
                        <Box p={6}>
                          <Stack spacing={0} align={'center'} mb={4}>
                            <Heading
                              fontSize={'3xl'}
                              fontWeight="semi-bold"
                              fontFamily={'body'}
                              px={4}
                              py={0.5}
                              rounded="full"
                              bg={
                                prediction.totalPoint >= 2
                                  ? useColorModeValue('green.100', 'green.900')
                                  : useColorModeValue('red.100', 'red.900')
                              }
                              color={
                                prediction.totalPoint >= 2
                                  ? 'green.500'
                                  : 'red.500'
                              }>
                              {prediction.totalPoint} pts
                            </Heading>
                            <Text color={'gray.500'}>
                              {' '}
                              {prediction.groupName
                                ? `${prediction.groupName}`
                                : `${prediction.phaseName}`}
                            </Text>
                          </Stack>

                          <Stack
                            direction={'row'}
                            justify={'center'}
                            spacing={6}>
                            <Stack spacing={0} align={'center'}>
                              <Text fontWeight={700}>
                                {prediction.pointTeam1GameResult}
                              </Text>
                              <Text fontSize={'sm'} color={'gray.500'}>
                                {prediction.team1Name}
                              </Text>
                            </Stack>
                            <Stack spacing={0} align={'center'}>
                              <Text fontWeight={700}>
                                {prediction.pointTeam2GameResult}
                              </Text>
                              <Text fontSize={'sm'} color={'gray.500'}>
                                {prediction.team2Name}
                              </Text>
                            </Stack>
                          </Stack>
                          <Divider my="4" />
                          <Stack
                            direction={'row'}
                            justify={'center'}
                            spacing={6}>
                            <Stack spacing={0} align={'center'}>
                              <Text fontWeight={700}>
                                {prediction.pointTeam1PredictionResult}
                              </Text>
                              <Text fontSize={'sm'} color={'gray.500'}>
                                {prediction.team1Name}
                              </Text>
                            </Stack>
                            <Stack spacing={0} align={'center'}>
                              <Text fontWeight={700}>
                                {prediction.pointTeam2PredictionResult}
                              </Text>
                              <Text fontSize={'sm'} color={'gray.500'}>
                                {prediction.team2Name}
                              </Text>
                            </Stack>
                          </Stack>
                        </Box>
                      </Flex>
                    </Box>
                  );
                })}
              </Flex>
            </>
          );
        })}
      </Flex>
    </>
  );
}
