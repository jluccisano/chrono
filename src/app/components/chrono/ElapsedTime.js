/* eslint-disable no-debugger */
import React from 'react';
import {connect} from 'react-redux';
import './_Chrono.scss';
import {startTimer, stopTimer, resetTimer, tick} from '../../actions/athleteActions';
import PropTypes from 'prop-types';

class ElapsedTime extends React.Component {

  constructor(props) {
    super(props);

    if(this.props.athlete.timer.isOn) {
        this.progress();
    }
  }

  componentWillUnmount() {
		if (this._interval) cancelAnimationFrame(this._interval);
	}

	componentDidUpdate(prevProps) {
    if(prevProps.athlete.timer.isOn != this.props.athlete.timer.isOn) {
      if(this.props.athlete.timer.isOn) {
        this.progress();
      } else {
         cancelAnimationFrame(this._interval);
      }
    }
	}

  start() {
    this._interval = requestAnimationFrame(this.progress);
  }

	progress = () => {
    this.props.tick(this.props.athlete.id, Date.now());
    this._interval = requestAnimationFrame(this.progress);
	}

  reset() {
    cancelAnimationFrame(this._interval);
    this.props.resetTimer(this.props.athlete.id);
  }

  format(time) {
    const pad = (time, length) => {
      while (time.length < length) {
        time = '0' + time;
      }
      return time;
    };

    time = new Date(time);
    let h = pad(time.getUTCHours().toString(), 2);
    let m = pad(time.getUTCMinutes().toString(), 2);
    let s = pad(time.getUTCSeconds().toString(), 2);
    return `${h}:${m}:${s}`;
  }
  render() {
    return (
      <div>
        <h3 style={{textAlign: 'center'}}>{this.format(this.props.athlete.timer.time)}</h3>
      </div>
    );
  }
}

ElapsedTime.propTypes = {
  athlete: PropTypes.object,
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,
  resetTimer: PropTypes.func,
  tick: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
  return {
    startTimer: (id, offset) => dispatch(startTimer(id, offset)),
    stopTimer: id => dispatch(stopTimer(id)),
    resetTimer: id => dispatch(resetTimer(id)),
    tick: (id,time) => dispatch(tick(id,time)),
  };
};

export default connect(null, mapDispatchToProps)(ElapsedTime);
