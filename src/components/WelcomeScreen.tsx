import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Text } from '@chakra-ui/react'

export default function WelcomeScreen ({ isOpen, onClose }: {isOpen: boolean, onClose: () => void}): JSX.Element {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' isCentered size='xl' leastDestructiveRef={undefined}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize='xx-large'>Welcome to wordy 😇
        </AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <Text fontSize='2xl' fontWeight='normal'> Here's how to play the game: </Text>
          <br />
          <Text fontSize='lg'> Guess the word using least number of tries.</Text>
          <br />
          <Text>A green block indicates correct guess</Text>
          <Box display='inline-block' rounded='md' h='6' w='6' bgColor='green.200' />
          <Text>A yellow block indicates that the word contains the letter, but is misplaced</Text>
          <Box display='inline-block' rounded='md' h='6' w='6' bgColor='yellow.200' />
          <Text>A red block indicates the word doesn't contain the letter</Text>
          <Box display='inline-block' rounded='md' h='6' w='6' bgColor='red.200' />
          <Text>Example: </Text>
          <Text>Correct word: 'CLOSE' </Text>
          <Box display='inline-block' my='2' mx='1' rounded='md' h='6' w='6' bgColor='green.200' textAlign='center'>C</Box>
          <Box display='inline-block' my='2' mx='1' rounded='md' h='6' w='6' bgColor='green.200' textAlign='center'>L</Box>
          <Box display='inline-block' my='2' mx='1' rounded='md' h='6' w='6' bgColor='yellow.200' textAlign='center'>E</Box>
          <Box display='inline-block' my='2' mx='1' rounded='md' h='6' w='6' bgColor='red.200' textAlign='center'>A</Box>
          <Box display='inline-block' my='2' mx='1' rounded='md' h='6' w='6' bgColor='red.200' textAlign='center'>N</Box>
          <br />
          <Box display='inline-block' mx='1' rounded='md' h='6' w='6' bgColor='green.200' textAlign='center'>C</Box>
          <Box display='inline-block' mx='1' rounded='md' h='6' w='6' bgColor='green.200' textAlign='center'>L</Box>
          <Box display='inline-block' mx='1' rounded='md' h='6' w='6' bgColor='red.200' textAlign='center'>A</Box>
          <Box display='inline-block' mx='1' rounded='md' h='6' w='6' bgColor='green.200' textAlign='center'>S</Box>
          <Box display='inline-block' mx='1' rounded='md' h='6' w='6' bgColor='yellow.200' textAlign='center'>S</Box>
          <br />
          <Box display='inline-block' my='2' mx='1' rounded='md' h='6' w='6' bgColor='green.200' textAlign='center'>C</Box>
          <Box display='inline-block' my='2' mx='1' rounded='md' h='6' w='6' bgColor='green.200' textAlign='center'>L</Box>
          <Box display='inline-block' my='2' mx='1' rounded='md' h='6' w='6' bgColor='green.200' textAlign='center'>O</Box>
          <Box display='inline-block' my='2' mx='1' rounded='md' h='6' w='6' bgColor='green.200' textAlign='center'>S</Box>
          <Box display='inline-block' my='2' mx='1' rounded='md' h='6' w='6' bgColor='green.200' textAlign='center'>E</Box>
        </AlertDialogBody>
        <AlertDialogFooter />
      </AlertDialogContent>
    </AlertDialog>
  )
}
