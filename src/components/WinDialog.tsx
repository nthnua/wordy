import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Text } from '@chakra-ui/react'

export default function WinDialog ({ isOpen, onOpen, onClose, noOfTries }: {isOpen: boolean, onOpen: () => void, onClose: () => void, noOfTries: number}): JSX.Element {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' isCentered size='xl' leastDestructiveRef={undefined}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize='xx-large'>You have won!!!🥳🥳🥳🥳
        </AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <Text fontSize='xl' fontWeight='bold'>No. of tries: {noOfTries}</Text>
          Come back tomorrow for a new word.
        </AlertDialogBody>
        <AlertDialogFooter />
      </AlertDialogContent>
    </AlertDialog>
  )
}
