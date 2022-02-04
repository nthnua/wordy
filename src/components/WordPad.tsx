import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Heading, HStack, PinInput, PinInputField, ScaleFade, SlideFade, Text, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { gameStatus, Word } from './types'
import WinDialog from './WinDialog'
import WordRow from './WordRow'

export default function WordPad () {
  // const noOfTries = 5
  const toast = useToast()
  const [gameState,setGameState] = useState<gameStatus>('playing')
  const [wordList, setWordList] = useState<string[]>([])
  const [correctWord, setCorrectWord] = useState<string>('')
  const [currentTry, setCurrentTry] = useState<number>(0)
  const wordLength = 5
  useEffect(()=>{
    try{
      const storedData: string = JSON.parse(localStorage.getItem('data') || "")
    }
    catch(e){
      console.error(e)
      localStorage.clear()
    }
  },[])
  // for modal
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialLetters: Word = Array(wordLength).fill({
    value: '',
    status: 'unknown'
  })
  const [triedWords, setTriedWords] = useState<Word[]>([initialLetters])
  const handleComplete = (word: string)=>{
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
  }
  const PastTries = triedWords.map((word: Word, indx: number) => {

    return (
      <WordRow indx={indx} word={word} currentTry={currentTry} handleComplete={handleComplete}></WordRow>
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
      //setCorrectWord(wordList[index])
      setCorrectWord('HELLO')
    }
  }, [wordList])
  return (
    <><WinDialog isOpen={isOpen} onOpen={onOpen} onClose={onClose} noOfTries={triedWords.length} ></WinDialog>
      <VStack>
        <Heading bgGradient='linear(to-r, red.100, yellow.300)' bgClip='text'>Wordy</Heading>
        {PastTries}
      </VStack>
    </>
  )
}
