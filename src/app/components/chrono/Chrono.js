/* eslint-disable no-debugger */

import React from 'react';
import {connect} from 'react-redux';
import './_Chrono.scss';
import * as AthleteActions from '../../actions/athleteActions';
import PropTypes from 'prop-types';
import uuidv4 from  'uuid/v4';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import {GridList, GridTile} from 'material-ui/GridList';
import Play from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
import Reset from 'material-ui/svg-icons/av/replay';
import FloatingActionButton from 'material-ui/FloatingActionButton';
//import ElapsedTime from './ElapsedTime';

const styles = {
  chip: {
    margin: 4
  },
  button:{
    marginRight: 5,
  }
};

class Chrono extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  componentDidMount() {
    this.resume();
  }

  componentWillUnmount() {
		if (this._interval) cancelAnimationFrame(this._interval);
	}

  getInitialState() {
      return {
        startTS: 0,
        diff: 0,
        suspended: 0,
      };
  }

	nextInterval(currentTime) {

    var nextIndex = this.props.athlete.program.stepIndex + 1;

    if(this.props.programSteps.length > 0) {

        if(nextIndex <= this.props.programSteps.length) {
          var nextStep =  this.props.programSteps[nextIndex-1];
          if(nextStep.type == 2) {
             var expireAt = nextStep.duration * 1000; //sec to milliseconds
             this.props.startInterval(this.props.athlete.id, 0 , currentTime + expireAt, nextIndex, true);
             this.setState({
                 startTS: currentTime + expireAt
             });
          } else {
             this.props.startInterval(this.props.athlete.id, 0, currentTime, nextIndex, false);
             this.setState({
                startTS: currentTime,
                suspended: 0
             });
          }

        } else {
             //Training finish
             //lap
             //stop
             this.props.stopTimer(this.props.athlete.id);
             //notification
             this.pause();
             this.props.showNotification('Fini ' + this.props.athlete.firstName  + ' !!!', 3000);
        }

    } else {
         this.props.startInterval(this.props.athlete.id,0, currentTime, nextIndex);
              this.setState({
                startTS: currentTime,
                suspended: 0
              });
    }
	}

	tick = () => {
    if(this.props.athlete.program.countdown) {
        if(this.state.diff <= 0) {
            this.props.showNotification('Allez ' + this.props.athlete.firstName  + ' !!!', 3000);
            this.setState(this.getInitialState());
            this.nextInterval(Date.now());
        }
        this.setState({
           diff: new Date((this.state.startTS - Date.now()))
        });
    } else {
        this.setState({
           diff: new Date(Date.now() - this.state.startTS)
        });
    }

    this._interval = requestAnimationFrame(this.tick);
  }

  start() {
     var currentTime = Date.now() - this.state.suspended;
//     this.setState({
//           startTS: currentTime,
//           suspended: 0
//     });

     //this.props.startTimer(this.props.athlete.id);

     if(!this.props.athlete.timer.isOn) {
        this.nextInterval(currentTime);
     }

     //this.props.startInterval(this.props.athlete.id,0, currentTime, 0);

     this._interval = requestAnimationFrame(this.tick);
  }

  resume() {
      this.setState({
        startTS: this.props.athlete.program.startTS + (+this.props.athlete.program.offset),
        diff: Date.now() - (+new Date() - this.props.athlete.program.offset)
      });
      if(this.props.athlete.program.isOn) {
        this._interval = requestAnimationFrame(this.tick);
      }
  }

	pause() {
    cancelAnimationFrame(this._interval);
    this.setState({
       suspended: +this.state.diff
    });
    this.props.pauseInterval(this.props.athlete.id, this.state.diff);
    this.setState({
        startTS: 0,
        suspended: +this.state.diff
    });
  }


	lap() {
     var currentTime = Date.now();
     this.props.addAthleteLap(this.props.athlete.id, this.formatLap(this.state.diff));
     this.nextInterval(currentTime);
     this.props.updateOrder(this.props.athlete.id);
  }

  reset() {
    //cancelAnimationFrame(this._interval);

    cancelAnimationFrame(this.state.interval);
    this.setState(this.getInitialState());

    //this.props.resetTimer(this.props.athlete.id);
  }

  stop() {
      //cancelAnimationFrame(this._interval);
      cancelAnimationFrame(this.state.interval);
      this.setState({
        startTS: null,
        suspended: +this.state.diff
      });
  }


  format(time) {
    const pad = (time, length) => {
      while (time.length < length) {
        time = '0' + time;
      }
      return time;
    };

    time = new Date(time);
    let m = pad(time.getMinutes().toString(), 2);
    let s = pad(time.getSeconds().toString(), 2);
    let cs = pad(Math.round(time.getMilliseconds()/10, 2));


    return `${m}:${s}:${cs}`;
  }


  formatLap(time) {
    const pad = (time, length) => {
      while (time.length < length) {
        time = '0' + time;
      }
      return time;
    };

    time = new Date(time);
    let m = pad(time.getMinutes().toString(), 2);
    let s = pad(time.getSeconds().toString(), 2);
    let ms = pad(time.getMilliseconds().toString(), 3);

    return `${m}:${s}:${ms}`;
  }

  render() {
    var lapsList = this.props.athlete.laps.map((lap, index) => {
        return <GridTile style={{'fontSize': '0.70em'}} key={uuidv4()}>{index+1 + ': ' + lap}</GridTile>;
    });
//          <ElapsedTime athlete={this.props.athlete}/>
    return (
      <div>
        <section className="Chrono">
          <Chip style={styles.chip}>
             <Avatar size={32}>{this.props.athlete.firstName.substring(0,1)}</Avatar>{this.props.athlete.firstName}
          </Chip>
          <h1 style={{backgroundColor: this.props.athlete.program.countdown ? 'rgba(202, 51,86, .3)' : 'rgba(51, 178, 202, .3)'}}>{this.format(this.state.diff)}</h1>
          <span>{this.props.athlete.program.stepIndex}</span>
          <div>
            <FloatingActionButton mini={true} style={styles.button} onClick={() => {this.props.athlete.program.isOn ? this
            .pause() : this.start();}}>
              { this.props.athlete.program.isOn ? <Pause/> : <Play/>}
             </FloatingActionButton>
            <FloatingActionButton mini={true} style={styles.button} onClick={() => this.lap()}>
                  <Reset/>
             </FloatingActionButton>
          </div>
          <GridList cols={2} cellHeight={'auto'} padding={1}>
              { lapsList }
          </GridList>
        </section>
      </div>
    );
  }

}

Chrono.propTypes = {
  addAthleteLap: PropTypes.func,
  athlete: PropTypes.object,
  startTimer: PropTypes.func,
  resetTimer: PropTypes.func,
  showNotification: PropTypes.func,
  programSteps: PropTypes.array,
  nextStep: PropTypes.func,
  startInterval: PropTypes.func,
  pauseInterval: PropTypes.func,
  stopTimer: PropTypes.func,
  updateOrder: PropTypes.func,
  setOffset: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return {
    addAthleteLap: (id,lap) => dispatch(AthleteActions.addAthleteLap(id, lap)),
    resetTimer: id => dispatch(AthleteActions.resetTimer(id)),
    showNotification: (message, duration) => dispatch(AthleteActions.showNotification(message, duration)),
    nextStep: (id,stepIndex,countdown,time,offset) => dispatch(AthleteActions.nextStep(id,stepIndex,countdown,time,offset)),
    startInterval: (id, time, startTS,stepIndex,countdown) => dispatch(AthleteActions.startInterval(id, time, startTS,stepIndex,countdown )),
    startTimer: (id, offset) => dispatch(AthleteActions.startTimer(id, offset )),
    stopTimer: id => dispatch(AthleteActions.stopTimer(id)),
    pauseInterval: (id,offset) => dispatch(AthleteActions.pauseInterval(id, offset)),
    updateOrder: id => dispatch(AthleteActions.updateOrder(id)),
    setOffset: (id, offset) => dispatch(AthleteActions.setOffset(id, offset))
  };
};

const mapStateToProps = state => ({
  programSteps: state.programSteps
});


export default connect(mapStateToProps, mapDispatchToProps)(Chrono);
