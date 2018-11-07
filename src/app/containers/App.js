import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class App extends Component {

  componentDidMount() {
    // Needed for onTouchTap
    // http://stackoverflow.com/a/34015469/988941
    injectTapEventPlugin();
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header/>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.object
};


export default connect(null, null)(App);
