import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Heading, HStack, PinInput, PinInputField, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export default function WordPad () {
  type letterType = 'correct' | 'incorrect' | 'unknown' | 'existent'
  interface Letter {
    value: string
    status: letterType
  }
  // type gameStatus = 'won' | 'playing' | 'lost'
  type Word = Letter[]
  // const noOfTries = 5
  const toast = useToast()
  // const [gameState,setGameState] = useState<gameStatus>('playing')
  const [wordList, setWordList] = useState<string[]>([])
  const [correctWord, setCorrectWord] = useState<string>('')
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
      <HStack key={indx}>
        <PinInput
          size='lg' isDisabled={indx !== currentTry} autoFocus={indx === currentTry} type='alphanumeric' value={(indx !== currentTry && w) || undefined}
          onComplete={(word: string) => {
            word = word.toUpperCase()
            if (word.length === wordLength && word !== correctWord) {
              if (wordList.includes(word)) {
                const procWord: Word = word.split('').map((letter, indx) => ({
                  value: letter,
                  status: (correctWord[indx] === letter && 'correct') || (correctWord.includes(letter) && 'existent') || 'incorrect'
                }))
                const updWords: Word[] = [...triedWords]
                updWords[currentTry] = procWord
                setTriedWords([...updWords, initialLetters])
                setCurrentTry(currentTry + 1)
              } else {
                toast.closeAll()
                toast({
                  variant: 'subtle',
                  description: 'Word not in the list😕',
                  status: 'warning',
                  duration: 1000
                })
              }
            } else if (word === correctWord) {
              const procWord: Word = word.split('').map((letter, indx) => ({
                value: letter,
                status: (correctWord[indx] === letter && 'correct') || (correctWord.includes(letter) && 'existent') || 'incorrect'
              }))
              const updWords: Word[] = [...triedWords]
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
  useEffect(() => {
    fetch('words.txt').then(async (t) => await t.text().then((wordsTxt) => {
      setWordList(wordsTxt.split('\n'))
    })).catch(err => console.error(err))
  }, [])
  useEffect(() => {
    if(wordList.length){
      const index = Math.floor(Math.random() * 3427)
      setCorrectWord(wordList[index])
    }
  }, [wordList])
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
          <AlertDialogFooter />
        </AlertDialogContent>
      </AlertDialog>
      <VStack>
        <Heading bgGradient='linear(to-r, red.100, yellow.300)' bgClip='text'>Wordy</Heading>
        {PastTries}
      </VStack>
    </>
  )
}
