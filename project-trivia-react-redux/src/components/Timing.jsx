import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  updateTimer,
  saveIntervalId,
  updateIsDisabled,
} from '../redux/actions';

class Timing extends React.Component {
  componentDidMount() {
    const { changeTimer, changeIntervalId } = this.props;

    this.intervalID = setInterval(() => changeTimer(), 1000);
    changeIntervalId(this.intervalID);
  }

  render() {
    const { timer, intervalId, changeIsDisabled } = this.props;
    if (timer < 1) {
      clearInterval(intervalId);
      changeIsDisabled();
    }
    return (
      <div>
        <p>Time: {timer}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  timer: state.time.time,
  intervalId: state.time.intervalId,
});

const mapDispatchToProps = (dispatch) => ({
  changeTimer: () => dispatch(updateTimer()),
  changeIntervalId: (payload) => dispatch(saveIntervalId(payload)),
  changeIsDisabled: () => dispatch(updateIsDisabled()),
});

Timing.propTypes = {
  changeTimer: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  changeIntervalId: PropTypes.func.isRequired,
  intervalId: PropTypes.number.isRequired,
  changeIsDisabled: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timing);
