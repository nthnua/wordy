import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Heading, HStack, PinInput, PinInputField, useDisclosure, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'


export default function WordPad() {
  type letterType = 'correct' | 'incorrect' | 'unknown' | 'existent'
  interface Letter {
    value: string
    status: letterType
  }
  type gameStatus = 'won' | 'playing' | 'lost'
  type Word = Letter[]
  const noOfTries = 5
  const [gameState,setGameState] = useState<gameStatus>('playing')
  const [correctWord,setCorrectWord] = useState<string>('')
  const [currentTry, setCurrentTry] = useState<number>(0)
  const wordLength = 5
  const { isOpen, onOpen, onClose } = useDisclosure()
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
            setCurrentTry(-1)
            onOpen()
            }
          }}
        >
          {word.map((letter, indx) => <PinInputField key={indx} bg={colorCode[letter.status]} />)}
        </PinInput>
      </HStack>
    )
  }
  )
  useEffect(()=>{
    fetch('words.txt').then((t)=>t.text().then((wordsTxt)=>{
      const index = Math.floor(Math.random()*928)
      setCorrectWord(wordsTxt.split('\n')[index])
    })).catch(err=>console.error(err))
  },[])
  return (
    <>
    <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={undefined}>
    <AlertDialogOverlay />
    <AlertDialogContent>
          <AlertDialogHeader fontSize='xx-large'>You won!!!🥳🥳🥳🥳</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
              Come back tomorrow for a new word.
          </AlertDialogBody>
          <AlertDialogFooter>
          </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    <VStack>
    <Heading bgGradient='linear(to-r, red.100, yellow.300)' bgClip='text'>Wordy</Heading>
      {PastTries}
    </VStack>
    </>
  )
}
