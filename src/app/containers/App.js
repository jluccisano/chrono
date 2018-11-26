import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import {connect} from 'react-redux';
import MainMenu from '../components/chrono/MainMenu';

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
           <Header/>
           <MainMenu/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(null, null)(App);
