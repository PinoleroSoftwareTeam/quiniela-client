import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import React from 'react';

interface AlertDialogProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onActionDelete: (data: any) => void;
  body: string;
  displayAcctionButton: string;
  data: any;
}

export function MessageDialog({
  title,
  isOpen,
  onClose,
  body,
  displayAcctionButton,
  data,
  onActionDelete,
}: AlertDialogProps) {
  const cancelRef: any = React.useRef();
  const onClickClose = () => {
    onActionDelete(data);
    onClose();
  };
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{body}</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Cancelar</Button>
              <Button colorScheme="red" onClick={onClickClose} ml={3}>
                {displayAcctionButton}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
