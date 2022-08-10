import React, { ReactNode, useEffect, useState } from 'react';
import { endpoint } from '../constants/endpoints';
import { useRouter } from 'next/router';
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
} from '@chakra-ui/react';
import {
  FiGrid,
  FiUser,
  FiGlobe,
  FiUsers,
  FiTv,
  FiServer,
  FiPackage,
  FiCodesandbox,
  FiActivity,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { MobileNav, NavItem } from './Navigation';
import HttpServices from '../services/httpServices';
import AuthStore from '../services/AuthStore';

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
  role: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Inicio', icon: FiGrid, path: '/', role: '' },
  { name: 'Dashboard', icon: FiActivity, path: '/home', role: '' },
  { name: 'Faces', icon: FiServer, path: '/phases', role: 'Admin' },
  { name: 'Ligas', icon: FiGlobe, path: '/calendars', role: 'Admin' },
  { name: 'Quiniela', icon: FiActivity, path: '/quinielas', role: 'Admin' },
  { name: 'Equipos', icon: FiUsers, path: '/teams', role: 'Admin' },
  { name: 'Grupos', icon: FiPackage, path: '/groups', role: 'Admin' },
  {
    name: 'Grupos Torneo',
    icon: FiCodesandbox,
    path: '/groupteams',
    role: 'Admin',
  },
  { name: 'Usuarios', icon: FiUser, path: '/users', role: 'Admin' },
  { name: 'Partidos', icon: FiTv, path: '/games', role: 'Admin' },
];

export default function SidebarWithHeader({
  children,
}: {
  children?: ReactNode;
}) {
  const router = useRouter();
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    let user = AuthStore.getUser();
    user = user ? user : {};
    setUserData(user);
    if (!AuthStore.isAuthenticated()) {
      router.push('/auth/signin');
      return;
    }
    new HttpServices()
      .get(endpoint.auth.ping)
      .then(res => {
        if (res.status == 200) return;
        if (res.status == 401) {
          AuthStore.clear();
          router.push('/auth/signin');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} userData={userData} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}
const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const [userData, setUserData] = useState<any>({});
  useEffect(() => {
    let user = AuthStore.getUser();
    user = user ? user : {};
    setUserData(user);
  }, []);
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Quiniela
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(item => {
        if (userData.administrator) {
          return (
            <NavItem key={item.name} icon={item.icon} link={item.path}>
              {item.name}
            </NavItem>
          );
        } else if (!item.role) {
          return (
            <NavItem key={item.name} icon={item.icon} link={item.path}>
              {item.name}
            </NavItem>
          );
        }
      })}
    </Box>
  );
};
