import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography } from '@material-ui/core';
import { Button, TextField, MenuItem } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import styles from './styles';
import { addShowtime, updateShowtime } from '../../../../../store/actions';

class AddShowtime extends Component {
  state = {
    startAt: '',
    startDate: null,
    endDate: null,
    movieId: '',
    cinemaId: ''
  };

  componentDidMount() {
    if (this.props.selectedShowtime) {
      const {
        startAt,
        startDate,
        endDate,
        movieId,
        cinemaId
      } = this.props.selectedShowtime;
      this.setState({
        startAt,
        startDate,
        endDate,
        movieId,
        cinemaId
      });
    }
  }

  handleChange = e => {
    this.setState({
      state: e.target.value
    });
  };

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState[field] = value;
    this.setState(newState);
  };

  onAddShowtime = () => {
    const { startAt, startDate, endDate, movieId, cinemaId } = this.state;
    const showtime = {
      startAt,
      startDate,
      endDate,
      movieId,
      cinemaId
    };
    this.props.addShowtime(showtime);
  };

  onUpdateShowtime = () => {
    const { startAt, startDate, endDate, movieId, cinemaId } = this.state;
    const showtime = {
      startAt,
      startDate,
      endDate,
      movieId,
      cinemaId
    };
    this.props.updateShowtime(showtime, this.props.selectedShowtime._id);
  };

  onFilterMinDate = () => {
    const { nowShowing } = this.props;
    const { movieId } = this.state;
    const selectedMovie = nowShowing.find(movie => movie._id === movieId);
    if (selectedMovie) return selectedMovie.startDate;
    return new Date();
  };

  onFilterMaxDate = () => {
    const { nowShowing } = this.props;
    const { movieId } = this.state;
    const selectedMovie = nowShowing.find(movie => movie._id === movieId);
    if (selectedMovie) return new Date(selectedMovie.endDate);
    return false;
  };

  render() {
    const { nowShowing, cinemas, classes, className } = this.props;
    const { startAt, startDate, endDate, movieId, cinemaId } = this.state;

    const rootClassName = classNames(classes.root, className);
    const title = this.props.selectedShowtime
      ? 'Edit Showtime'
      : 'Add Showtime';
    const submitButton = this.props.selectedShowtime
      ? 'Update Showtime'
      : 'Save Details';
    const submitAction = this.props.selectedShowtime
      ? () => this.onUpdateShowtime()
      : () => this.onAddShowtime();

    return (
      <div className={rootClassName}>
        <Typography className={classes.title} variant="h4">
          {title}
        </Typography>
        <form autoComplete="off" noValidate>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              fullWidth
              helperText="Please specify the Time"
              label="Time"
              margin="dense"
              onChange={event =>
                this.handleFieldChange('startAt', event.target.value)
              }
              required
              select
              value={startAt}
              variant="outlined"
            >
              {['18:00', '19:00', '20:00', '21:00', ' 22:00', '23:00'].map(
                time => (
                  <MenuItem key={`time-${time}`} value={time}>
                    {time}
                  </MenuItem>
                )
              )}
            </TextField>
          </div>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              fullWidth
              label="Movie"
              margin="dense"
              onChange={event =>
                this.handleFieldChange('movieId', event.target.value)
              }
              required
              select
              value={movieId}
              variant="outlined"
            >
              {nowShowing.map(movie => (
                <MenuItem key={movie._id} value={movie._id}>
                  {movie.title}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              className={classes.textField}
              fullWidth
              label="Cinema"
              margin="dense"
              onChange={event =>
                this.handleFieldChange('cinemaId', event.target.value)
              }
              required
              select
              value={cinemaId}
              variant="outlined"
            >
              {cinemas.map(cinema => (
                <MenuItem key={cinema._id} value={cinema._id}>
                  {cinema.name}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className={classes.field}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
                className={classes.textField}
                id="start-date"
                inputVariant="outlined"
                label="Start Date"
                margin="normal"
                maxDate={this.onFilterMaxDate()}
                minDate={new Date()}
                onChange={date => this.handleFieldChange('startDate', date._d)}
                value={startDate}
              />

              <KeyboardDatePicker
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
                className={classes.textField}
                id="end-date"
                inputVariant="outlined"
                label="End Date"
                margin="normal"
                maxDate={this.onFilterMaxDate()}
                minDate={new Date(startDate)}
                onChange={date => this.handleFieldChange('endDate', date._d)}
                value={endDate}
              />
            </MuiPickersUtilsProvider>
          </div>
        </form>

        <Button
          className={classes.buttonFooter}
          color="primary"
          onClick={submitAction}
          variant="contained"
        >
          {submitButton}
        </Button>
      </div>
    );
  }
}

AddShowtime.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ movieState, cinemaState }) => ({
  movies: movieState.movies,
  nowShowing: movieState.nowShowing,
  cinemas: cinemaState.cinemas
});

const mapDispatchToProps = { addShowtime, updateShowtime };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddShowtime));
