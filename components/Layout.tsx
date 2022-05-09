import React, { ReactNode } from 'react';
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
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { MobileNav, NavItem } from './Navigation';

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Inicio', icon: FiGrid, path: '/' },
  { name: 'Faces', icon: FiServer, path: '/phases' },
  { name: 'Ligas', icon: FiGlobe, path: '/calendars' },
  { name: 'Equipos', icon: FiUsers, path: '/teams' },
  { name: 'Grupos', icon: FiPackage, path: '/groups' },
  { name: 'Grupos Torneo', icon: FiCodesandbox, path: '/groupteams' },
  { name: 'Usuarios', icon: FiUser, path: '/users' },
  { name: 'Partidos', icon: FiTv, path: '/games' },
];

export default function SidebarWithHeader({
  children,
}: {
  children?: ReactNode;
}) {
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
      <MobileNav onOpen={onOpen} />
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
      {LinkItems.map(item => (
        <NavItem key={item.name} icon={item.icon} link={item.path}>
          {item.name}
        </NavItem>
      ))}
    </Box>
  );
};
