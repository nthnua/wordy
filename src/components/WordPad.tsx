import { Heading, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { gameStatus, StoredData, Word } from './types'
import WinDialog from './WinDialog'
import WordRow from './WordRow'

export default function WordPad () {
  // const noOfTries = 5
  const toast = useToast()
  const [gameState, setGameState] = useState<gameStatus>('playing')
  const [wordList, setWordList] = useState<string[]>([])
  const [correctWord, setCorrectWord] = useState<string>('')
  const [currentTry, setCurrentTry] = useState<number>(0)
  const wordLength = 5
  // for modal
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialLetters: Word = Array(wordLength).fill({
    value: '',
    status: 'unknown'
  })
  const [triedWords, setTriedWords] = useState<Word[]>([initialLetters])
  const handleComplete = (word: string) => {
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
          description: 'Word is not in the list😕',
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
      const index = Math.floor(Math.random() * 3427)
      setCorrectWord(wordList[index])
      // setCorrectWord('HELLO')
      setCurrentTry(-1)
      setGameState('won')
      localStorage.setItem('data', JSON.stringify({
        time: Date.now(),
        triedWords: updWords,
        correctWord,
        gameState: 'won'
      }))
    }
  }
  const PastTries = triedWords.map((word: Word, indx: number) => <WordRow indx={indx} word={word} currentTry={currentTry} handleComplete={handleComplete} />)
  useEffect(() => {
    if (gameState === 'won') {
      onOpen()
    } else if (gameState === 'playing' && triedWords.length > 1) {
      localStorage.setItem('data', JSON.stringify({
        time: Date.now(),
        triedWords,
        correctWord,
        gameState
      }))
    }
  }, [gameState, currentTry, correctWord, triedWords, onOpen])
  useEffect(() => {
    try {
      const storedData: StoredData = JSON.parse(localStorage.getItem('data') || '')
      console.log('now:', new Date(Date.now()).toUTCString(), '\nsaved:', new Date(storedData.time).toUTCString(), '\ncomback at:', new Date(storedData.time + 43200000).toUTCString())
      if (Date.now() < storedData.time + 43200000) {
        if (storedData.gameState === 'won') {
          setCurrentTry(-1)
        } else {
          setCurrentTry(storedData.triedWords.length - 1)
        }
        setCorrectWord(storedData.correctWord)
        setGameState(storedData.gameState)
        setTriedWords(storedData.triedWords)
      }
    } catch (e) {
      console.error(e)
      localStorage.clear()
    }
    fetch('words.txt').then(async (t) => await t.text().then((wordsTxt) => {
      setWordList(wordsTxt.split('\n'))
    })).catch(err => console.error(err))
  }, [])
  useEffect(() => {
    if (wordList.length > 0 && !correctWord) {
      const index = Math.floor(Math.random() * 3427)
      setCorrectWord(wordList[index])
    }
  }, [wordList, correctWord])
  return (
    <><WinDialog isOpen={isOpen} onOpen={onOpen} onClose={onClose} noOfTries={triedWords.length} />
      <VStack>
        <Heading bgGradient='linear(to-r, red.100, yellow.300)' bgClip='text'>Wordy</Heading>
        {PastTries}
      </VStack>
    </>
  )
}
