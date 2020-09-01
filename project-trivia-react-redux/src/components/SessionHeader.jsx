import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import emailHash from '../services/genEmailHash';
import './SessionHeader.css';

class SessionHeader extends Component {
  render() {
    const { email, name, score } = this.props;
    return (
      <header className="session-header">
        <div className="player-info">
          <img
            src={`https://www.gravatar.com/avatar/${emailHash(email)}`}
            alt=""
            data-testid="header-profile-picture"
            className="gravatar-icon"
          />
          <h3 data-testid="header-player-name" className="header-player-name">
            {name}
          </h3>
        </div>
        <h3 data-testid="header-score">{score}</h3>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  score: state.userInfo.player.score,
  name: state.userInfo.player.name,
  email: state.userInfo.player.gravatarEmail,
});

SessionHeader.propTypes = {
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(SessionHeader);
