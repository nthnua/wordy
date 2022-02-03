import * as React from 'react'
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Center
} from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { Logo } from './Logo'
import WordPad from './components/WordPad'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Center h='100vh'>
      <WordPad />
    </Center>
  </ChakraProvider>
)
