import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import HttpServices from '../../services/httpServices';
import { FaUserAlt, FaLock, FaAddressCard, FaAt } from 'react-icons/fa';
import { IRegister } from '../../Dto/IRegister';
import { endpoint } from '../../constants/endpoints';
import AuthStore from '../../services/AuthStore';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaAddressCard = chakra(FaAddressCard);
const CFaAt = chakra(FaAt);
const httpServices = new HttpServices();

export default function SignIn() {
  const newRegister = () => {
    let newModelRegister: IRegister = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      userName: '',
    };
    return newModelRegister;
  };
  const router = useRouter();

  useEffect(() => {
    new HttpServices()
      .get(endpoint.auth.ping)
      .then(res => {
        if (res.status == 200) router.push('/');
        return;
      })
      .then(data => {});
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [register, setRegister] = useState<IRegister>(newRegister());
  const toast = useToast();

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleOnClickRegister = (e: any) => {
    httpServices
      .post(endpoint.auth.signup, register)
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.error) {
          toast({
            title: 'Error',
            description: data.message,
            status: 'error',
            duration: 4000,
            isClosable: true,
          });
          return;
        }
        toast({
          title: 'Registro',
          description: 'Registro exitosamente',
          status: 'success',
          duration: 1000,
          onCloseComplete: () => router.push('/auth/signin'),
        });
      })
      .catch(error => {});
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center">
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center">
        <Avatar bg="blue.500" />
        <Heading color="blue.500">Registrarse</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <Stack
            spacing={4}
            p="1rem"
            backgroundColor="whiteAlpha.900"
            boxShadow="md">
            <FormControl onChange={handleChange}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <CFaAddressCard color="gray.300" />
                </InputLeftElement>

                <Input type="text" placeholder="Nombres" name="firstName" />
              </InputGroup>
            </FormControl>
            <FormControl onChange={handleChange}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <CFaAddressCard color="gray.300" />
                </InputLeftElement>
                <Input type="text" placeholder="Apellidos" name="lastName" />
              </InputGroup>
            </FormControl>
            <FormControl onChange={handleChange}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <CFaUserAlt color="gray.300" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Nombre de usuario"
                  name="userName"
                />
              </InputGroup>
            </FormControl>
            <FormControl onChange={handleChange}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <CFaAt color="gray.300" />
                </InputLeftElement>
                <Input
                  type="email"
                  placeholder="Correo electronico"
                  name="email"
                />
              </InputGroup>
            </FormControl>
            <FormControl onChange={handleChange}>
              <InputGroup>
                <InputLeftElement pointerEvents="none" color="gray.300">
                  <CFaLock color="gray.300" />
                </InputLeftElement>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Contraseña"
                  name="password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="blue"
              width="full"
              onClick={handleOnClickRegister}>
              Registrar
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
