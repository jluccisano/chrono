import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import AddAthlete from './AddAthlete';
import AthleteTable from './AthleteTable';
import Serie from './Serie';
import Program from './Program';

export class MainMenu extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return ( <Tabs>
                <Tab label="Runners">
                  <AddAthlete/>
                  <AthleteTable/>
                </Tab>
                <Tab label="Intervals">
                  <Program/>
                </Tab>
                <Tab label="Chrono">
                  <Serie/>
                </Tab>
             </Tabs>);
  }
}

export default MainMenu;

