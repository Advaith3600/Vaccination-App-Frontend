import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography } from '@material-ui/core';
import styles from './styles';
import { AddShowtime, ShowtimesToolbar, ShowtimesTable } from './components';
import {
  getShowtimes,
  toggleDialog,
  selectShowtime,
  selectAllShowtimes,
  deleteShowtime
} from '../../../store/actions';
import { ResponsiveDialog } from '../../../components';

class ShowtimeList extends Component {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { showtimes, getShowtimes } = this.props;
    if (!showtimes.length) getShowtimes();
  }

  handleDeleteShowtime = () => {
    const { selectedShowtimes, deleteShowtime } = this.props;
    selectedShowtimes.forEach(element => deleteShowtime(element));
  };

  render() {
    const {
      classes,
      showtimes,
      selectedShowtimes,
      openDialog,
      toggleDialog,
      selectShowtime,
      selectAllShowtimes
    } = this.props;

    return (
      <div className={classes.root}>
        <ShowtimesToolbar
          deleteShowtime={this.handleDeleteShowtime}
          selectedShowtimes={selectedShowtimes}
          showtimes={showtimes}
          toggleDialog={toggleDialog}
        />
        <div className={classes.content}>
          {!showtimes.length ? (
            <Typography variant="h6">There are no showtimes</Typography>
          ) : (
            <ShowtimesTable
              onSelectShowtime={selectShowtime}
              selectAllShowtimes={selectAllShowtimes}
              selectedShowtimes={selectedShowtimes}
              showtimes={showtimes}
            />
          )}
        </div>
        <ResponsiveDialog
          handleClose={() => toggleDialog()}
          id="Add-showtime"
          open={openDialog}
        >
          <AddShowtime
            selectedShowtime={showtimes.find(
              showtime => showtime._id === selectedShowtimes[0]
            )}
          />
        </ResponsiveDialog>
      </div>
    );
  }
}

const mapStateToProps = ({ showtimeState }) => ({
  openDialog: showtimeState.openDialog,
  showtimes: showtimeState.showtimes,
  selectedShowtimes: showtimeState.selectedShowtimes
});

const mapDispatchToProps = {
  getShowtimes,
  toggleDialog,
  selectShowtime,
  selectAllShowtimes,
  deleteShowtime
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ShowtimeList));
