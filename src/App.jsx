import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import { createContext } from "react";
import Gameover from "./components/Gameover";

export const AppContext = createContext();

function App() {
  const [board, setboard] = useState(boardDefault);
  const [currAttempt, setcurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordset] = useState(new Set());

  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameover] = useState({
    gameOver: false,
    guessedWord: false,
  });

  const [correctWord, setcorrectWord] = useState("");

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordset(words.wordSet);
      setcorrectWord(words.todaysWord);
    });
  }, []);

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    if (wordSet.has(currWord.toLowerCase())) {
      setcurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    } else {
      alert("Word not Found");
    }

    if (currWord === correctWord) {
      setGameover({ gameOver: true, guessedWord: true });
      return;
    }

    if (currAttempt.attempt === 5) {
      setGameover({ gameOver: true, guessedWord: false });
    }
  };

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setboard(newBoard);
    setcurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setboard(newBoard);
    setcurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setboard,
          currAttempt,
          setcurrAttempt,
          onDelete,
          onEnter,
          onSelectLetter,
          correctWord,
          disabledLetters,
          setDisabledLetters,
          gameOver,
          setGameover,
        }}
      >
        <div className="game">
          <Board />
          {gameOver.gameOver ? <Gameover /> : <Keyboard />}
          {/* <Keyboard />
          <Gameover /> */}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
