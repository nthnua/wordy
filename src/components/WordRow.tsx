import { HStack, PinInput, PinInputField, SlideFade } from '@chakra-ui/react'
import { Word } from './types'

export default function WordRow ({ indx, word, currentTry, handleComplete }: {indx: number, word: Word, currentTry: number, handleComplete: (word: string) => void}): JSX.Element {
  const colorCode = {
    correct: 'green.200',
    incorrect: 'red.200',
    unknown: 'white.200',
    existent: 'yellow.200'
  }
  let w = ''
  word.forEach(({ value }) => { w = w + value })
  return (
    <SlideFade key={indx} offsetY='60px' in>
      <HStack>
        <PinInput
          size='lg' isDisabled={indx !== currentTry} autoFocus={indx === currentTry} type='alphanumeric' value={(indx !== currentTry && w) || undefined}
          onComplete={handleComplete}
        >
          {word.map((letter, indx) => <PinInputField key={indx} bg={colorCode[letter.status]} />)}
        </PinInput>
      </HStack>
    </SlideFade>
  )
}
