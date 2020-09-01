import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SessionHeader from '../components/SessionHeader';

import { resetQuestionIndex, resetPlayer } from '../redux/actions';

const feedbackMessage = (assertions) => {
  const result = assertions >= 3 ? 'Mandou bem!' : 'Podia ser melhor...';
  return result;
};

// const feedbackResults = (score, assertions) => (
//   <div>
//     <h3>Assertions</h3>
//     <p data-testid="feedback-total-question">
//       You got {assertions} assertions!
//     </p>
//     <h3>Your Score</h3>
//     <p data-testid="feedback-total-score">Your score is {score}</p>
//   </div>
// );

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.createPlayAgainButton = this.createPlayAgainButton.bind(this);
    this.createSeeRankingButton = this.createSeeRankingButton.bind(this);
  }

  createPlayAgainButton() {
    const { resetIndex, resetPlayerInfo } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-play-again"
        onClick={() => {
          resetIndex();
          resetPlayerInfo();
        }}
      >
        JOGAR NOVAMENTE
      </button>
    );
  }

  createSeeRankingButton() {
    const { resetIndex, resetPlayerInfo } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-ranking"
        onClick={() => {
          resetIndex();
          resetPlayerInfo();
        }}
      >
        VER RANKING
      </button>
    );
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <h1>Feedback</h1>
        <SessionHeader />
        <h3 data-testid="feedback-text">{feedbackMessage(assertions)}</h3>
        {/* {feedbackResults(score, assertions)} */}
        <div>
          <h3>Assertions</h3>
          <p data-testid="feedback-total-question">{assertions}</p>
          <h3>Your Score</h3>
          <p data-testid="feedback-total-score">{score}</p>
        </div>
        <Link to="/">{this.createPlayAgainButton()}</Link>
        <Link to="/ranking">{this.createSeeRankingButton()}</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.userInfo.player.assertions,
  score: state.userInfo.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  resetIndex: () => dispatch(resetQuestionIndex()),
  resetPlayerInfo: () => dispatch(resetPlayer()),
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  resetIndex: PropTypes.func.isRequired,
  resetPlayerInfo: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
