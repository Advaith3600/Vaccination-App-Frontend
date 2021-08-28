import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Button, TextField, Typography } from '@material-ui/core';
import styles from './styles';
import { Add } from '@material-ui/icons';
import {
  getCinemas,
  createCinemas,
  updateCinemas,
  removeCinemas
} from '../../../../../store/actions';
import { FileUpload } from '../../../../../components';

class AddCinema extends Component {
  state = {
    _id: '',
    name: '',
    image: null,
    ticketPrice: '',
    city: '',
    seatsAvailable: '',
    seats: [],
    notification: {}
  };

  componentDidMount() {
    if (this.props.editCinema) {
      const { image, ...rest } = this.props.editCinema;
      this.setState({ ...rest });
    }
  }

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState[field] = value;
    this.setState(newState);
  };

  onSubmitAction = async type => {
    const {
      getCinemas,
      createCinemas,
      updateCinemas,
      removeCinemas
    } = this.props;
    const {
      _id,
      name,
      image,
      ticketPrice,
      city,
      seatsAvailable,
      seats
    } = this.state;
    const cinema = { name, ticketPrice, city, seatsAvailable, seats };
    let notification = {};
    type === 'create'
      ? (notification = await createCinemas(image, cinema))
      : type === 'update'
        ? (notification = await updateCinemas(image, cinema, _id))
        : (notification = await removeCinemas(_id));
    this.setState({ notification });
    if (notification && notification.status === 'success') getCinemas();
  };

  handleSeatsChange = (index, value) => {
    if (value > 10) return;
    const { seats } = this.state;
    seats[index] = Array.from({ length: value }, () => 0);
    this.setState({
      seats
    });
  };

  onAddSeatRow = () => {
    this.setState(prevState => ({
      seats: [...prevState.seats, []]
    }));
  };

  renderSeatFields = () => {
    const { seats } = this.state;
    const { classes } = this.props;
    return (
      <>
        <div className={classes.field}>
          <Button onClick={() => this.onAddSeatRow()}>
            <Add /> add Seats
          </Button>
        </div>
        {seats.length > 0 &&
          seats.map((seat, index) => (
            <div className={classes.field} key={`seat-${index}-${seat.length}`}>
              <TextField
                className={classes.textField}
                inputProps={{
                  min: 0,
                  max: 10
                }}
                key={`new-seat-${index}`}
                label={
                  'Add number of seats for row : ' +
                  (index + 10).toString(36).toUpperCase()
                }
                margin="dense"
                onChange={event =>
                  this.handleSeatsChange(index, event.target.value)
                }
                required
                type="number"
                value={seat.length}
                variant="outlined"
              />
            </div>
          ))}
      </>
    );
  };

  render() {
    const { classes, className } = this.props;
    const {
      name,
      image,
      ticketPrice,
      city,
      seatsAvailable,
      notification
    } = this.state;

    const rootClassName = classNames(classes.root, className);
    const mainTitle = this.props.editCinema ? 'Edit Cinema' : 'Add Cinema';
    const submitButton = this.props.editCinema
      ? 'Update Cinema'
      : 'Save Details';
    const submitAction = this.props.editCinema
      ? () => this.onSubmitAction('update')
      : () => this.onSubmitAction('create');

    return (
      <div className={rootClassName}>
        <Typography className={classes.title} variant="h4">
          {mainTitle}
        </Typography>
        <form autoComplete="off" noValidate>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              helperText="Please specify the cinema name"
              label="Name"
              margin="dense"
              onChange={event =>
                this.handleFieldChange('name', event.target.value)
              }
              required
              value={name}
              variant="outlined"
            />

            <TextField
              className={classes.textField}
              fullWidth
              label="City"
              margin="dense"
              onChange={event =>
                this.handleFieldChange('city', event.target.value)
              }
              required
              value={city}
              variant="outlined"
            />
          </div>
          <div className={classes.field}>
            <FileUpload
              className={classes.textField}
              file={image}
              onUpload={event => {
                const file = event.target.files[0];
                this.handleFieldChange('image', file);
              }}
            />
          </div>

          <div className={classes.field}>
            <TextField
              className={classes.textField}
              label="Ticket Price"
              margin="dense"
              onChange={event =>
                this.handleFieldChange('ticketPrice', event.target.value)
              }
              type="number"
              value={ticketPrice}
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              label="Seats Available"
              margin="dense"
              onChange={event =>
                this.handleFieldChange('seatsAvailable', event.target.value)
              }
              required
              value={seatsAvailable}
              variant="outlined"
            />
          </div>
          {this.renderSeatFields()}
        </form>

        <Button
          className={classes.buttonFooter}
          color="primary"
          onClick={submitAction}
          variant="contained"
        >
          {submitButton}
        </Button>
        {this.props.editCinema && (
          <Button
            className={classes.buttonFooter}
            color="secondary"
            onClick={() => this.onSubmitAction('remove')}
            variant="contained"
          >
            Delete Cinema
          </Button>
        )}

        {notification && notification.status ? (
          notification.status === 'success' ? (
            <Typography
              className={classes.infoMessage}
              color="primary"
              variant="caption"
            >
              {notification.message}
            </Typography>
          ) : (
            <Typography
              className={classes.infoMessage}
              color="error"
              variant="caption"
            >
              {notification.message}
            </Typography>
          )
        ) : null}
      </div>
    );
  }
}

AddCinema.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = null;
const mapDispatchToProps = {
  getCinemas,
  createCinemas,
  updateCinemas,
  removeCinemas
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddCinema));
