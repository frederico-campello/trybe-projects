import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  updateIsDisabled,
  updateScore,
  updateAssertions,
} from '../redux/actions';
import Timing from '../components/Timing';

import './AnswerOptions.css';

class AnswerOptions extends Component {
  // static saveLocalStorage(player) {
  //   localStorage.setItem('state', JSON.stringify({ player }));
  //   const test = JSON.parse(localStorage.getItem('state'));
  //   console.log(test);
  // }

  constructor(props) {
    super(props);

    this.createButtons = this.createButtons.bind(this);
    this.createCorrectButton = this.createCorrectButton.bind(this);
    this.createIncorrectButton = this.createIncorrectButton.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
  }

  componentDidUpdate() {
    const { player } = this.props;
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  calculateScore() {
    const { timer, questions, questionIndex, changeScore } = this.props;

    const difficulty = questions[questionIndex].difficulty;

    console.log(questions[questionIndex].difficulty);

    if (difficulty === 'hard') {
      changeScore(10 + (timer * 3));
    }
    if (difficulty === 'medium') {
      changeScore(10 + (timer * 2));
    }
    if (difficulty === 'easy') {
      changeScore(10 + (timer * 1));
    }
  }

  createCorrectButton(answer) {
    const {
      isDisabled,
      changeIsDisabled,
      intervalId,
      changeAssertions,
    } = this.props;

    return (
      <button
        type="button"
        key={answer}
        data-testid="correct-answer"
        onClick={() => {
          changeIsDisabled();
          clearInterval(intervalId);
          this.calculateScore();
          changeAssertions();
          // AnswerOptions.saveLocalStorage(player);
        }}
        disabled={isDisabled}
        className={isDisabled ? 'btn-answer correct-answer' : 'btn-answer'}
      >
        {answer}
      </button>
    );
  }

  createIncorrectButton(answer, index) {
    const { isDisabled, changeIsDisabled, intervalId } = this.props;
    return (
      <button
        type="button"
        key={answer}
        data-testid={`wrong-answer-${index}`}
        onClick={() => {
          changeIsDisabled();
          clearInterval(intervalId);
          // AnswerOptions.saveLocalStorage(player);
        }}
        disabled={isDisabled}
        className={isDisabled ? 'btn-answer incorrect-answer' : 'btn-answer'}
      >
        {answer}
      </button>
    );
  }

  createButtons(answer, index) {
    const { questions, questionIndex } = this.props;
    return answer === questions[questionIndex].correct_answer
      ? this.createCorrectButton(answer)
      : this.createIncorrectButton(answer, index);
  }

  render() {
    const { questionIndex, possibleAnswers } = this.props;
    return !possibleAnswers.length ? (
      <h3>Loading...</h3>
    ) : (
      <div className="order-buttons">
        {possibleAnswers[questionIndex].map((item, index) =>
          this.createButtons(item, index),
        )}
        <Timing />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questionIndex: state.questions.questionIndex,
  questions: state.questions.questionsItems,
  possibleAnswers: state.answers.options,
  isDisabled: state.answers.isDisabled,
  timer: state.time.time,
  intervalId: state.time.intervalId,
  player: state.userInfo.player,
});

const mapDispatchToProps = (dispatch) => ({
  changeIsDisabled: () => dispatch(updateIsDisabled()),
  changeScore: (payload) => dispatch(updateScore(payload)),
  changeAssertions: () => dispatch(updateAssertions()),
});

AnswerOptions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  questionIndex: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  changeIsDisabled: PropTypes.func.isRequired,
  possibleAnswers: PropTypes.arrayOf(PropTypes.array).isRequired,
  timer: PropTypes.number.isRequired,
  intervalId: PropTypes.number.isRequired,
  changeScore: PropTypes.func.isRequired,
  changeAssertions: PropTypes.func.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string,
    assertions: PropTypes.number,
    score: PropTypes.number,
    gravatarEmail: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnswerOptions);
