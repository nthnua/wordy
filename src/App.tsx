import * as React from 'react'
import {
  ChakraProvider,
  theme,
  Center
} from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import WordPad from './components/WordPad'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Center minH='100vh' my='24'>
      <WordPad />
    </Center>
  </ChakraProvider>
)
