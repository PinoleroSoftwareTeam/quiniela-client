import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';

interface DrawerProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}
export default function DrawerExample({
  title,
  children,
  isOpen,
  onClose,
}: DrawerProps) {
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{title}</DrawerHeader>

          <DrawerBody>{children}</DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
