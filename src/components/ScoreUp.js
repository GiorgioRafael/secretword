import React from 'react'


const ScoreUp = ({startGame, pickedWord, score}) => {
  return (
    <div>
    <div>
      <h1>Você acertou! a palavra era {pickedWord}</h1>
      <p>Você ganhou 100 pontos!</p>
      <p>Sua pontuação agora é {score}</p>
      <button onClick={startGame}>Continuar</button>

      </div>
    </div>
  )
}

export default ScoreUp
