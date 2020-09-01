import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  updateQuestionIndex,
  fetchQuestions,
  updateIsDisabled,
  updateTimer,
  saveIntervalId,
  resetTimer,
  updateRanking,
} from '../redux/actions';
import SessionHeader from '../components/SessionHeader';
import Questions from '../components/Questions';
import AnswerOptions from '../components/AnswerOptions';
import './Game.css';

import emailHash from '../services/genEmailHash';

class Game extends Component {
  constructor(props) {
    super(props);
    this.renderNextButton = this.renderNextButton.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
  }

  componentDidMount() {
    const { getQuestions, player } = this.props;
    getQuestions();
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  componentWillUnmount() {
    const { intervalId } = this.props;
    clearInterval(intervalId);
  }

  handleTimer() {
    const { newTimer, changeTimer, changeIntervalId } = this.props;
    this.intervalID = setInterval(() => changeTimer(), 1000);
    changeIntervalId(this.intervalID);
    newTimer();
  }

  renderNextButton() {
    const { changeQuestionIndex, isDisabled, changeIsDisabled } = this.props;
    return (
      isDisabled && (
        <button
          data-testid="btn-next"
          onClick={() => {
            changeQuestionIndex();
            changeIsDisabled();
            this.handleTimer();
          }}
          className="btn-next"
        >
          Próxima
        </button>
      )
    );
  }

  render() {
    const { questionIndex, changeRanking, name, score, email } = this.props;
    if (questionIndex === 5) {
      const imgAvatar = `https://www.gravatar.com/avatar/${emailHash(email)}`;
      changeRanking({ name, score, picture: imgAvatar });
      return <Redirect to="/feedback" />;
    }
    return (
      <div className="game-page-container">
        <SessionHeader />
        <div className="page-container">
          <div className="left-container">
            <Questions />
          </div>
          <div className="right-container">
            <AnswerOptions />
            {this.renderNextButton()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isDisabled: state.answers.isDisabled,
  questionIndex: state.questions.questionIndex,
  intervalId: state.time.intervalId,
  name: state.userInfo.player.name,
  score: state.userInfo.player.score,
  email: state.userInfo.player.gravatarEmail,
  player: state.userInfo.player,
});

const mapDispatchToProps = (dispatch) => ({
  changeQuestionIndex: () => dispatch(updateQuestionIndex()),
  getQuestions: () => dispatch(fetchQuestions()),
  changeIsDisabled: () => dispatch(updateIsDisabled()),
  changeTimer: () => dispatch(updateTimer()),
  changeIntervalId: (intervalId) => dispatch(saveIntervalId(intervalId)),
  newTimer: () => dispatch(resetTimer()),
  changeRanking: (payload) => dispatch(updateRanking(payload)),
});

Game.propTypes = {
  changeQuestionIndex: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  changeIsDisabled: PropTypes.func.isRequired,
  questionIndex: PropTypes.number.isRequired,
  getQuestions: PropTypes.func.isRequired,
  changeTimer: PropTypes.func.isRequired,
  changeIntervalId: PropTypes.func.isRequired,
  newTimer: PropTypes.func.isRequired,
  changeRanking: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  intervalId: PropTypes.number.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    assertions: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
