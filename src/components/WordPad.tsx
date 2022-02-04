import { Heading, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { gameStatus, StoredData, Word } from './types'
import WelcomeScreen from './WelcomeScreen'
import WinDialog from './WinDialog'
import WordRow from './WordRow'

export default function WordPad (): JSX.Element {
  // const noOfTries = 5
  // game variables
  const [gameState, setGameState] = useState<gameStatus>('playing')
  const [wordList, setWordList] = useState<string[]>([])
  const [correctWord, setCorrectWord] = useState<string>('')
  const [currentTry, setCurrentTry] = useState<number>(0)
  const wordLength = 5

  // for win dialog
  const { isOpen, onOpen, onClose } = useDisclosure()

  // for welcome dialog
  const { isOpen: isWelcomeAlertOpen, onOpen: onWelcomeAlertOpen, onClose: onWelcomeAlertClose } = useDisclosure()

  const toast = useToast()

  const initialLetters: Word = Array(wordLength).fill({
    value: '',
    status: 'unknown'
  })
  const [triedWords, setTriedWords] = useState<Word[]>([initialLetters])
  const handleComplete = (word: string): void => {
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
        // as state is not garunteed to update by this time use explicit values
        // write to localstorage on every try
        localStorage.setItem('data', JSON.stringify({
          time: Date.now(),
          triedWords: [...updWords, initialLetters],
          correctWord,
          gameState: 'playing'
        }))
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
      // const index = Math.floor(Math.random() * 3427)
      // setCorrectWord(wordList[index])
      // setCorrectWord('HELLO')
      setCurrentTry(-1)
      setGameState('won')
      // write to localstorage on win
      localStorage.setItem('data', JSON.stringify({
        time: Date.now(),
        triedWords: updWords,
        correctWord,
        gameState: 'won'
      }))
    }
  }

  const PastTries = triedWords.map(
    (word: Word, indx: number) => <WordRow key={indx} indx={indx} word={word} currentTry={currentTry} handleComplete={handleComplete} />)
  // on initial load
  useEffect(() => {
    try {
      // either load the data or throw error
      const storedData: StoredData = JSON.parse(localStorage.getItem('data') ?? '')
      // only if user logs back in within 12 hrs load previous state
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
      localStorage.clear()
      onWelcomeAlertOpen()
    }
    fetch('words.txt').then(async (t) => await t.text().then((wordsTxt) => {
      setWordList(wordsTxt.split('\n'))
    })).catch(err => console.error(err))
  }, [onWelcomeAlertOpen])

  // on every try and initially
  useEffect(() => {
    if (gameState === 'won') {
      onOpen()
    }
  }, [gameState, currentTry, correctWord, triedWords, onOpen])

  // whenever wordlist is updated
  useEffect(() => {
    // if wordlist is loaded but correctword is not ie. after every 12hrs
    if (wordList.length > 0 && correctWord === '') {
      const index = Math.floor(Math.random() * 3427)
      setCorrectWord(wordList[index])
      // setCorrectWord('HELLO')
    }
  }, [wordList, correctWord])
  return (
    <><WelcomeScreen isOpen={isWelcomeAlertOpen} onClose={onWelcomeAlertClose} />
      <WinDialog isOpen={isOpen} onOpen={onOpen} onClose={onClose} noOfTries={triedWords.length} />
      <VStack>
        <Heading bgGradient='linear(to-r, red.100, yellow.300)' bgClip='text'>Wordy</Heading>
        {PastTries}
      </VStack>
    </>
  )
}
