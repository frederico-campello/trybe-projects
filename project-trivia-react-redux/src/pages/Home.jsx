import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { saveUserInfo, saveToken } from '../redux/actions/index';

import { getToken } from '../services/api';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      token: '',
      redirectPlay: false,
      redirectConfig: false,
      score: '',
      picture: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderInputs = this.renderInputs.bind(this);
    this.renderBtnPlay = this.renderBtnPlay.bind(this);
    this.renderBtnConfig = this.renderBtnConfig.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleConfig = this.handleConfig.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handlePlay() {
    const { saveInfo, setToken } = this.props;
    const { email, username, score, picture } = this.state;
    getToken().then((json) => {
      setToken(json.token);
      localStorage.setItem('token', json.token);
      this.setState({ redirectPlay: true, token: json.token });
    });

    localStorage.setItem(
      'ranking',
      JSON.stringify([{ name: username, score, picture }]),
    );

    localStorage.setItem(
      'state',
      JSON.stringify({
        player: { name: '', assertions: '', score: '', gravatarEmail: '' },
      }),
    );

    saveInfo({ player: { name: username, gravatarEmail: email } });
  }

  handleConfig() {
    this.setState({
      redirectConfig: true,
    });
  }

  renderInputs() {
    return (
      <div>
        <label htmlFor="email">
          Email do Gravatar:
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            onChange={this.handleInputChange}
          />
        </label>
        <label htmlFor="username">
          Nome do Jogador:
          <input
            data-testid="input-player-name"
            type="text"
            name="username"
            onChange={this.handleInputChange}
          />
        </label>
      </div>
    );
  }

  renderBtnPlay() {
    const { email, username } = this.state;
    return (
      <button
        data-testid="btn-play"
        type="button"
        onClick={this.handlePlay}
        disabled={!email || !username}
      >
        JOGAR!
      </button>
    );
  }

  renderBtnConfig() {
    return (
      <div>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={this.handleConfig}
        >
          Configurações
        </button>
      </div>
    );
  }

  render() {
    const { redirectConfig, redirectPlay } = this.state;

    if (redirectPlay) return <Redirect to="/game" />;
    if (redirectConfig) return <Redirect to="/settings" />;
    return (
      <div>
        {this.renderInputs()}
        {this.renderBtnPlay()}
        {this.renderBtnConfig()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveInfo: (payload) => dispatch(saveUserInfo(payload)),
  setToken: (payload) => dispatch(saveToken(payload)),
});

Home.propTypes = {
  saveInfo: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Home);
