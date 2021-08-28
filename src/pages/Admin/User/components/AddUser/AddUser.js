import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography } from '@material-ui/core';
import { Button, TextField, MenuItem } from '@material-ui/core';
import styles from './styles';
import { addShowtime, updateShowtime } from '../../../../../store/actions';

class AddUser extends Component {
  state = {
    name: '',
    username: '',
    email: '',
    password: '',
    role: '',
    phone: ''
  };

  componentDidMount() {
    if (this.props.selectedUser) {
      const {
        name,
        username,
        email,
        password,
        role,
        phone
      } = this.props.selectedUser;
      this.setState({
        name,
        username,
        email,
        password,
        role,
        phone
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

  onAddUser = () => {
    const user = { ...this.state };
    this.props.addUser(user);
  };

  onUpdateUser = () => {
    const user = { ...this.state };
    this.props.updateUser(user, this.props.selectedUser._id);
  };

  render() {
    const { classes, className, selectedUser } = this.props;
    const { name, username, email, password, role, phone } = this.state;

    const rootClassName = classNames(classes.root, className);
    const title = selectedUser ? 'Edit User' : 'Add User';
    const submitButton = selectedUser ? 'Update User' : 'Add User';
    const submitAction = selectedUser
      ? () => this.onUpdateUser()
      : () => this.onAddUser();

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
              helperText="Please specify the Full Name"
              label="Full Name"
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
              label="Username"
              margin="dense"
              onChange={event =>
                this.handleFieldChange('username', event.target.value)
              }
              required
              value={username}
              variant="outlined"
            />
          </div>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              fullWidth
              label="Email"
              margin="dense"
              onChange={event =>
                this.handleFieldChange('email', event.target.value)
              }
              required
              value={email}
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              fullWidth
              label="Password"
              margin="dense"
              onChange={event =>
                this.handleFieldChange('password', event.target.value)
              }
              required
              value={password}
              variant="outlined"
            />
          </div>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              fullWidth
              label="Phone"
              margin="dense"
              onChange={event =>
                this.handleFieldChange('phone', event.target.value)
              }
              required
              value={phone}
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              fullWidth
              helperText="Admin or Guest"
              label="Role"
              margin="dense"
              onChange={event =>
                this.handleFieldChange('role', event.target.value)
              }
              required
              select
              value={role}
              variant="outlined"
            >
              {['admin', 'guest'].map(role => (
                <MenuItem key={`role-${role}`} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
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

AddUser.propTypes = {
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
)(withStyles(styles)(AddUser));
