import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CustomizedSnackbar from '../CustomizedSnackbar/';

const Alert = ({ alerts }) =>
  alerts.length > 0 &&
  alerts.map((alert, index) => (
    <CustomizedSnackbar
      horizontal="right"
      isOpen
      key={`custom-alert-${index}-${alert.id}`}
      message={alert.msg}
      variant={alert.alertType}
      vertical="top"
    />
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

Alert.defaultProps = {
  alerts: []
};

const mapStateToProps = state => ({
  alerts: state.alertState.alerts
});
export default connect(mapStateToProps)(Alert);
