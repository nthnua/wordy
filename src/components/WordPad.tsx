import { HStack, PinInput, PinInputField, VStack } from '@chakra-ui/react'
import { useState } from 'react'

export default function WordPad() {
  type letterType = 'correct' | 'incorrect' | 'unknown' | 'existent'
  interface Letter {
    value: string
    status: letterType
  }
  type Word = Letter[]
  const noOfTries = 5
  const [currentTry, setCurrentTry] = useState<number>(0)
  const wordLength = 5
  const correctWord = 'hello'
  // colormap
  const colorCode = {
    correct: 'green.200',
    incorrect: 'red.200',
    unknown: 'white.200',
    existent: 'yellow.200'
  }
  const initialLetters: Word = Array(wordLength).fill({
    value: '',
    status: 'unknown'
  })
  const [triedWords, setTriedWords] = useState<Word[]>([initialLetters])
  const PastTries = triedWords.map((word: Word, indx: number) => {
    let w = ''
    word.forEach(({ value }) => { w = w + value })
    return (
      <HStack>
        <PinInput size='lg' isDisabled={indx !== currentTry} autoFocus={indx === currentTry} type='alphanumeric' value={(indx !== currentTry && w) || undefined}
          onComplete={(word: string) => {
            if (word.length === wordLength && word!==correctWord) {
              const procWord: Word = word.split('').map((letter, indx) => ({
                  value: letter,
                  status: (correctWord[indx] === letter && 'correct') || (correctWord.includes(letter) && 'existent') || 'incorrect'
              }))
              console.log(Array(word))
              let updWords: Word[] = [...triedWords]
              updWords[currentTry] = procWord
              setTriedWords([...updWords, initialLetters])
              setCurrentTry(currentTry + 1)
            }
            else if(word===correctWord){
              const procWord: Word = word.split('').map((letter, indx) => ({
                value: letter,
                status: (correctWord[indx] === letter && 'correct') || (correctWord.includes(letter) && 'existent') || 'incorrect'
            }))
            let updWords: Word[] = [...triedWords]
            updWords[currentTry] = procWord
            setTriedWords([...updWords])
            }
          }}
        >
          {word.map((letter, indx) => <PinInputField key={indx} bg={colorCode[letter.status]} />)}
        </PinInput>
      </HStack>
    )
  }
  )
  return (
    <VStack transitionDuration='2s'>
      {PastTries}
    </VStack>
  )
}
