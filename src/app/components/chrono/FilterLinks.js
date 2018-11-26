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
         <Link name="All"     filter={GroupFilters.SHOW_ALL}/>
         <Link name="Group 1" filter={GroupFilters.SHOW_GROUP1}/>
         <Link name="Group 2" filter={GroupFilters.SHOW_GROUP2}/>
         <Link name="Group 3" filter={GroupFilters.SHOW_GROUP3}/>
         <Link name="Group 4" filter={GroupFilters.SHOW_GROUP4}/>
     </div>);
  }
}

export default connect(null, null)(FilterLinks);

