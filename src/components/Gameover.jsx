import React, { useContext } from "react";
import { AppContext } from "../App";

const Gameover = () => {
  const { gameOver, setGameover, correctWord, currAttempt } =
    useContext(AppContext);
  return (
    <div className="gameOver">
      <h3>
        {gameOver.guessedWord
          ? "You guessed word correctly :< "
          : "You failed to guess!"}
      </h3>
      <h1>Correct word is : {correctWord} </h1>
      {gameOver.guessedWord && (
        <h3>you guessed in {currAttempt.attempt} attempts</h3>
      )}
    </div>
  );
};

export default Gameover;
