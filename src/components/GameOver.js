import "./GameOver.css";

const GameOver = ({ retry, score, pickedWord }) => {
  return (
    <div className="gameover">
      <h1>Fim de jogo!</h1>
      <h3>A palavra era {pickedWord}</h3>
      <h2>
        A sua pontuação foi: <span>{score}</span>
      </h2>
      <button onClick={retry}>Reiniciar</button>
    </div>
  );
};

export default GameOver;
