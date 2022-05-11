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
  FormHelperText,
  InputRightElement,
  useToast,
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

  useEffect(() => {
    if (AuthStore.isAuthenticated()) router.push('/');
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState<ILogin>({ email: '', password: '' });
  const toast = useToast();

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleOnClickLogin = (e: any) => {
    httpServices
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
      .catch(error => {
        console.log(error);
      });
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
        <Heading color="blue.500">Inicio de Sesión</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <Stack
            spacing={4}
            p="1rem"
            backgroundColor="whiteAlpha.900"
            boxShadow="md">
            <FormControl onChange={handleChange}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaAt color="gray.300" />}
                />
                <Input
                  type="email"
                  placeholder="Correo electronico"
                  name="email"
                />
              </InputGroup>
            </FormControl>
            <FormControl onChange={handleChange}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<CFaLock color="gray.300" />}
                />
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
              <FormHelperText textAlign="right">
                <Link>¿Olvidaste tu contraseña?</Link>
              </FormHelperText>
            </FormControl>
            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="blue"
              width="full"
              onClick={handleOnClickLogin}>
              Iniciar sesión
            </Button>
          </Stack>
        </Box>
      </Stack>
      <Box>
        <Link color="teal.500" href="/auth/signup">
          Registrarte
        </Link>
      </Box>
    </Flex>
  );
}
