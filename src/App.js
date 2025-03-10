import { useCallback, useEffect, useState } from "react";

// components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";
import ScoreUp from "./components/ScoreUp";

// styles
import "./App.css";

// data 
import { wordsList } from "./data/words";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
  { id: 4, name: "win" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(5);
  const [score, setScore] = useState(0);


  const pickWordAndCategory = useCallback(() => {
    // pick a random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // pick a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];


    return { category, word };
  }, [words]);

  // start the game
  const startGame = useCallback(() => {
    // clear all letters
    clearLettersStates();

    // choose a word
    const { category, word } = pickWordAndCategory();


    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());


    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  // process letter input
    const verifyLetter = (letter) => {
      const normalizedLetter = letter.toLowerCase();

      // check if letter has already been utilized
      if (
        guessedLetters.includes(normalizedLetter) ||
        wrongLetters.includes(normalizedLetter)
      ) {
        return;
      }

      // push guessed letter or remove a chance
      if (letters.includes(normalizedLetter)) {
        setGuessedLetters((actualGuessedLetters) => [
          ...actualGuessedLetters,
          letter,
        ]);
      } else {
        setWrongLetters((actualWrongLetters) => [
          ...actualWrongLetters,
          normalizedLetter,
        ]);

        setGuesses((actualGuesses) => actualGuesses - 1);
      }
    };


  // restart the game
  const retry = () => {
    setScore(0);
    setGuesses(5);
    setGameStage(stages[0].name);
  };

  // clear letters state
  const clearLettersStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // check if guesses ended
  useEffect(() => {
    if (guesses === 0) {
      // game over and reset all states
      clearLettersStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];


    // win condition
    if (guessedLetters.length === uniqueLetters.length) {
      // add score
      if(gameStage ==="game"){
        setScore((actualScore) => (actualScore += 100));
        }


      if(gameStage ==="game"){
        setGameStage(stages[3].name);
      }
      // restart game with new word
    }
  }, [guessedLetters, letters]);

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver pickedWord={pickedWord} retry={retry} score={score} />}
      {gameStage === "win" && <ScoreUp startGame={startGame} pickedWord={pickedWord} score={score} />}
    </div>
  );
}

export default App;
