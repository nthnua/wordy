import * as React from 'react'
import {
  ChakraProvider,
  theme,
  Center
} from '@chakra-ui/react'
// import { ColorModeSwitcher } from './ColorModeSwitcher'
import WordPad from './components/WordPad'

export const App = (): JSX.Element => (
  <ChakraProvider theme={theme}>
    <Center minH='100vh' py='24'>
      <WordPad />
    </Center>
  </ChakraProvider>
)
