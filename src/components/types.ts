export type letterType = 'correct' | 'incorrect' | 'unknown' | 'existent'
export interface Letter {
  value: string
  status: letterType
}
export type gameStatus = 'won' | 'playing' | 'lost'
export type Word = Letter[]
export interface StoredData {
  time: number
  triedWords: Word[]
  correctWord: string
  gameState: gameStatus
}
