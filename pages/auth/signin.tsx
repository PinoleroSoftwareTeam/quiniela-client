import React, { useState, useEffect } from 'react';
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
  FormHelperText,
  InputRightElement,
  useToast,
  Image,
  FormLabel,
  Hide,
} from '@chakra-ui/react';
import HttpServices from '../../services/httpServices';
import { FaAt, FaLock } from 'react-icons/fa';
import AuthStore from '../../services/AuthStore';
import { endpoint } from '../../constants/endpoints';

const CFaAt = chakra(FaAt);
const CFaLock = chakra(FaLock);
const httpServices = new HttpServices();
interface ILogin {
  email: string;
  password: string;
}

export default function SignIn() {
  const router = useRouter();

  const getPing = () => {
    httpServices
      .get(endpoint.auth.ping)
      .then(res => {
        if (res.status == 200) router.push('/');
        return;
      })
      .then(data => {});
  };

  useEffect(() => {
    getPing();
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState<ILogin>({ email: '', password: '' });
  const toast = useToast();

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      handleOnClickLogin(event);
    }
  };

  const handleOnClickLogin = async (e: any) => {
    await httpServices
      .post(endpoint.auth.signin, login)
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
        AuthStore.setToken(data.token);
        AuthStore.setUser(data.perfil);
        toast({
          title: 'Inicio de sesión',
          description: 'Inicio de sesión exitosa',
          status: 'success',
          duration: 1000,
          onCloseComplete: () => router.push('/'),
        });
      })
      .catch(error => {});
  };

  const handleRegister = () => {
    router.push('/auth/signup');
  }

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Inicio de Sesión</Heading>
          <FormControl
            id="email"
            onChange={handleChange}
            onKeyDown={handleKeyDown}>
            <FormLabel>Correo electronico</FormLabel>
            <Input type="email" name="email" />
          </FormControl>
          <FormControl
            id="password"
            onChange={handleChange}
            onKeyDown={handleKeyDown}>
            <FormLabel>Contraseña</FormLabel>
            <Input type="password" name="password" />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}></Stack>
            <Button
              colorScheme={'blue'}
              variant={'solid'}
              onClick={handleOnClickLogin}>
              Iniciar sesión
            </Button>
            <Button
              textDecoration="none"
              colorScheme={'green'}
              variant="solid"
              onClick={handleRegister}>
              Registrarte
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Hide below='md'>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}         
            src={
              'https://images.pexels.com/photos/10183990/pexels-photo-10183990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
          />
        </Hide>
      </Flex>
    </Stack>
  );
}
