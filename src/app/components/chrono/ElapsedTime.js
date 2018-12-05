/* eslint-disable no-debugger */
import React from 'react';
import {connect} from 'react-redux';
import './_Chrono.scss';
import {startTimer, stopTimer, resetTimer, tick} from '../../actions/athleteActions';
import PropTypes from 'prop-types';

const fps = 30;
var then = Date.now();
var interval = 1000/fps;

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
    this._interval = requestAnimationFrame(this.progress);
    var now = Date.now();
    var delta = now - then;

    if (delta > interval) {

        //debugger;
        // update time stuffs

        // Just `then = now` is not enough.
        // Lets say we set fps at 10 which means
        // each frame must take 100ms
        // Now frame executes in 16ms (60fps) so
        // the loop iterates 7 times (16*7 = 112ms) until
        // delta > interval === true
        // Eventually this lowers down the FPS as
        // 112*10 = 1120ms (NOT 1000ms).
        // So we have to get rid of that extra 12ms
        // by subtracting delta (112) % interval (100).
        // Hope that makes sense.

        then = now - (delta % interval);

        // ... Code for Drawing the Frame ...
       this.props.tick(this.props.athlete.id, Date.now());
    }
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
