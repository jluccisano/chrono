import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import {hideNotification} from '../../actions/athleteActions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Notification extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
        <Snackbar
          open={this.props.notification.state == 'OPEN' ? true : false}
          message={this.props.notification.message}
          autoHideDuration={this.props.notification.duration}
        />
    );
  }
}

Notification.propTypes = {
  hideNotification: PropTypes.func,
  notification: PropTypes.object
};

const mapStateToProps = state => ({
  notification: state.notification
});


const mapDispatchToProps = dispatch => {
  return {
      hideNotification: () => dispatch(hideNotification())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
