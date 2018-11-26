/* eslint-disable no-debugger */

import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {CSVLink} from 'react-csv';
import _ from 'underscore';
import FlatButton from 'material-ui/FlatButton';

class PropDataUpdatedCSVLink extends CSVLink {
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		const { data, headers, separator, uFEFF } = nextProps;
		this.setState({ href: this.buildURI(data, uFEFF, headers, separator) });
	}
}

export class Header extends Component {
  csvLink = React.createRef();

  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  flattenData(athletes) {
     var result = _.map(athletes, function(athlete) {
         var athleteCopy = _.clone(athlete);
         _.each(athleteCopy.laps, function(lap, i) {
                athleteCopy['lap'+i]=lap;
          });
         delete athleteCopy['laps'];
         return athleteCopy;
     });
    return result;
  }

  onClickCsv(athletes) {
    var athletesToCsv = this.flattenData(athletes);
    this.setState({data: athletesToCsv}, () => {
        this.csvLink.current.link.click();
    });
  }

  render() {
    return (<header>
      <PropDataUpdatedCSVLink ref={this.csvLink} data={this.state.data} filename={'my-file.csv'} style={{display:'none'}}
      target="_blank" ></PropDataUpdatedCSVLink>
      <AppBar iconElementRight={<FlatButton label="Export" onClick={() => this.onClickCsv(this.props.athletes)}/>}/>
    </header>);
  }
}
Header.propTypes = {
  athletes: PropTypes.array
};

const mapStateToProps = state => ({
  athletes: state.athletes
});

export default connect(mapStateToProps, null)(Header);
