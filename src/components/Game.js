import { useState, useRef } from "react";

// styles
import "./Game.css";

const Game = ({
  verifyLetter,
  pickedCategory,
  pickedWord,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);

    setLetter("");

    letterInputRef.current.focus();
  };

  return (
    <div className="game">
      <p className="points">
        <span className="score">Pontuação</span>: <span className="scorepoints">{score}</span>
      </p>
      <h1>Advinhe a palavra:</h1>
      <h3 className="tip">
        Dica: <span className="tip">{pickedCategory}!</span>
      </h3>
      <p className="frasetry">Você ainda tem
        <span className="tentativas">

        {guesses === 5 ? ( <span className="t5"> {guesses} </span>): null}
        {guesses === 4 ? ( <span className="t4"> {guesses} </span>): null}
        {guesses === 3 ? ( <span className="t3"> {guesses} </span>): null}
        {guesses === 2 ? ( <span className="t2"> {guesses} </span>): null}
        {guesses === 1 ? ( <span className="t1"> {guesses} </span>): null}
</span>
        tentativa(s).</p>
      <div className="wordContainer">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span className="letter" key={i}>
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Tente adivnhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            onChange={(e) => setLetter(e.target.value)}
            required
            value={letter}
            ref={letterInputRef}
          />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>
    </div>
  );
};

export default Game;
