import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from './Link';
import {GroupFilters} from '../../actions/athleteActions';

export class FilterLinks extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
         <Link name="Tous" filter={GroupFilters.SHOW_ALL}/>
         <Link name="G1"  filter={GroupFilters.SHOW_GROUP1}/>
         <Link name="G2"  filter={GroupFilters.SHOW_GROUP2}/>
         <Link name="G3"  filter={GroupFilters.SHOW_GROUP3}/>
         <Link name="G4"  filter={GroupFilters
         .SHOW_GROUP4}/>
     </div>);
  }
}

export default connect(null, null)(FilterLinks);

