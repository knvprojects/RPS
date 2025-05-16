import {Component} from 'react'
import Popup from 'reactjs-popup'
import {Score, Button, Cbutton} from './Styled'
import './index.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class Game extends Component {
  state = {game: true, opponent: {}, bot: {}, text: '', score: 0}

  checkGame = id => {
    const opponent = choicesList.find(i => i.id === id)
    const bot = choicesList[Math.floor(Math.random() * 3)]

    const botWin =
      (bot.id === 'ROCK' && opponent.id === 'SCISSORS') ||
      (bot.id === 'SCISSORS' && opponent.id === 'PAPER') ||
      (bot.id === 'PAPER' && opponent.id === 'ROCK')

    if (opponent.id === bot.id) {
      this.setState({
        opponent,
        bot,
        text: 'IT IS DRAW',
        game: false,
      })
    } else if (botWin) {
      this.setState(prev => ({
        opponent,
        bot,
        text: 'YOU LOSE',
        game: false,
        score: prev.score - 1,
      }))
    } else {
      this.setState(prev => ({
        opponent,
        bot,
        text: 'YOU WON',
        game: false,
        score: prev.score + 1,
      }))
    }
  }

  gameOn = () => (
    <ul className="gameItems">
      {choicesList.map(i => (
        <li key={i.id}>
          <Button
            type="button"
            onClick={() => this.checkGame(i.id)}
            data-testid={`${i.id.toLowerCase()}Button`}
          >
            <img src={i.imageUrl} alt={i.id} className="rps" />
          </Button>
        </li>
      ))}
    </ul>
  )

  play = () => {
    this.setState({game: true, opponent: {}, bot: {}, text: ''})
  }

  results = () => {
    const {opponent, bot, text} = this.state
    return (
      <div className="resultMain">
        <div className="results">
          <div className="resultCard">
            <h1 className="resultWho">You</h1>
            <img src={opponent.imageUrl} className="rps" alt="your choice" />
          </div>
          <div className="resultCard">
            <h1 className="resultWho">Opponent</h1>
            <img src={bot.imageUrl} className="rps" alt="opponent choice" />
          </div>
        </div>
        <p className="resultWho">{text}</p>
        <button className="rules" type="button" onClick={this.play}>
          Play Again
        </button>
      </div>
    )
  }

  render() {
    const {game, score} = this.state
    return (
      <div className="main">
        <div className="first">
          <div className="scoreDiv">
            <div>
              <h1 className="head">Rock Paper Scissors</h1>
            </div>
            <div className="scoreCard">
              <p className="score">Score</p>
              <Score>{score}</Score>
            </div>
          </div>
        </div>
        <div className="gameList">{game ? this.gameOn() : this.results()}</div>
        <div className="last">
          <Popup
            modal
            trigger={
              <button className="rules" type="button">
                Rules
              </button>
            }
          >
            {close => (
              <div className="gamerule">
                <div className="gamerules">
                  <div className="upp">
                    <Cbutton type="button" onClick={close}>
                      <p className="upara">X</p>
                    </Cbutton>
                  </div>
                  <div className="image">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                      alt="rules"
                      className="rulesImg"
                    />
                  </div>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    )
  }
}

export default Game
