import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const { rank } = this.props;
    localStorage.setItem('ranking', JSON.stringify(rank));

    const compare = (a, b) => {
      let comparison = 0;
      if (a.score < b.score) {
        comparison = 1;
      } else if (a.score > b.score) {
        comparison = -1;
      }
      return comparison;
    };

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/">
          <button data-testid="btn-go-home" type="button">
            Voltar ao Início
          </button>
        </Link>
        {rank.sort(compare).map(({ name, score, picture }, index) => (
          <div>
            <img src={picture} alt={`${name} gravatar`} />
            <p data-testid={`player-name-${index}`}>{name}</p>
            <p data-testid={`player-score-${index}`}>{score}</p>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rank: state.ranking.ranking,
});

Ranking.propTypes = {
  rank: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Ranking);
