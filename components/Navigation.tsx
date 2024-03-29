import { useRouter } from 'next/router';
import {
  IconButton,
  Button,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link as LinkChakra,
  Text,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { FiMenu, FiChevronDown } from 'react-icons/fi';
// import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import Link from 'next/link';
import AuthStore from '../services/AuthStore';
import { DarkModeSwitch } from './DarkModeSwitch';

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  link: string;
}
export const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  return (
    <>
      <Link href={!!link ? link : '#'} passHref>
        <LinkChakra
          style={{ textDecoration: 'none' }}
          _focus={{ boxShadow: 'none' }}>
          <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
              bg: 'gray.400',
              color: 'white',
            }}
            {...rest}>
            {icon && (
              <Icon
                mr="4"
                fontSize="16"
                _groupHover={{
                  color: 'white',
                }}
                as={icon}
              />
            )}
            {children}
          </Flex>
        </LinkChakra>
      </Link>
    </>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
  userData: any;
}

export const MobileNav = ({ onOpen, userData, ...rest }: MobileProps) => {
  const router = useRouter();

  const signOut = () => {
    AuthStore.clear();
    router.push('/auth/signin');
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Quiniela
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <DarkModeSwitch />
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar size={'sm'} />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">
                    {userData.firstName + ' ' + userData.lastName}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {userData.administrator ? 'Admin' : ''}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Profile</MenuItem>
              <MenuDivider />
              <MenuItem onClick={signOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
