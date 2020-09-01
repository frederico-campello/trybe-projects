import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends Component {
  render() {
    const { questions, questionIndex, questionsLoading } = this.props;
    const currentQuestion = questions.filter(
      (question, index) => index === questionIndex,
    );
    return questionsLoading ? (
      <h3>Loading...</h3>
    ) : (
      <div className="question-container">
        <div className="category-container">
          {currentQuestion.map((question) => (
            <p
              key={`${question.category}${question.type}`}
              className="question-category"
              data-testid="question-category"
            >
              {question.category}
            </p>
          ))}
        </div>
        {currentQuestion.map((question) => (
          <p
            key={`${question.question}${question.type}`}
            className="question"
            data-testid="question-text"
          >
            {question.question}
          </p>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questionIndex: state.questions.questionIndex,
  questions: state.questions.questionsItems,
  questionsLoading: state.questions.loading,
});

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  questionIndex: PropTypes.number.isRequired,
  questionsLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Questions);
