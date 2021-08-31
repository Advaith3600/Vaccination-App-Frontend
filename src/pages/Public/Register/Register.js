import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../../store/actions';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Button,Checkbox, Grid, TextField, Typography } from '@material-ui/core';
import styles from './styles';
import Additionalcomp from './additionalcomp';

class Register extends Component {
  state = {
    values: {
      userFullName: '',
      email: '',
      mobileNumber: '',
      aadharNumber: '',
      password: '',
      age: '',
      dob: Additionalcomp.dob,
      gender: Additionalcomp.gender,
      address: '',
      image: null,
      isAdmin: true
    }
  };

  componentDidUpdate(prevProps) {
    const { isAuthenticated, history } = this.props;
    if (prevProps.isAuthenticated !== isAuthenticated || isAuthenticated)
      history.push('/');
  }

  componentDidMount() {
    const { isAuthenticated, history } = this.props;
    if (isAuthenticated) history.push('/');
  }

  handleBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState.values[field] = value;
    this.setState(newState);
  };

  handleRegister = () => {
    const newUser = this.state.values;
    this.props.register(newUser);
  };

  render() {
    const { classes } = this.props;
    const { values } = this.state;
    const isValid = values.policy;
    return (
      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid className={classes.bgWrapper} item lg={5}>
            <div className={classes.bg} />
          </Grid>
          <Grid className={classes.content} item lg={7} xs={12}>
            <div className={classes.content}>
              <div className={classes.contentBody}>
                <form className={classes.form}>
                  <Typography className={classes.title} variant="h2">
                    Create new account
                  </Typography>
                  <Typography className={classes.subtitle} variant="body1">
                    Enter the following fields to register in VaccineApp
                  </Typography>
                  <div className={classes.fields}>
                    <TextField
                      required
                      className={classes.textField}
                      label="Full name"
                      name="name"
                      onChange={(event) =>
                        this.handleFieldChange(
                          'userFullName',
                          event.target.value
                        )
                      }
                      value={values.userFullName}
                      variant="outlined"
                    />
                    <TextField
                      required
                      className={classes.textField}
                      label="Email address"
                      name="email"
                      onChange={(event) =>
                        this.handleFieldChange('email', event.target.value)
                      }
                      value={values.email}
                      variant="outlined"
                    />
                    <Additionalcomp></Additionalcomp>
                    <TextField
                      required
                      className={classes.textField}
                      label="Mobile Number"
                      name="mobileNumber"
                      onChange={(event) =>
                        this.handleFieldChange(
                          'mobileNumber',
                          event.target.value
                        )
                      }
                      value={values.mobileNumber}
                      variant="outlined"
                    />
                    <TextField
                      required
                      className={classes.textField}
                      label="Aadhar Number"
                      name="aadharNumber"
                      onChange={(event) =>
                        this.handleFieldChange(
                          'aadharNumber',
                          event.target.value
                        )
                      }
                      value={values.aadharNumber}
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      label="Address"
                      name="address"
                      onChange={(event) =>
                        this.handleFieldChange('address', event.target.value)
                      }
                      value={values.address}
                      variant="outlined"
                    />
                    <TextField
                      required
                      className={classes.textField}
                      label="Password"
                      onChange={(event) =>
                        this.handleFieldChange('password', event.target.value)
                      }
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />{' '}
                    <div className={classes.policy}>
                      <Checkbox
                        checked={values.policy}
                        className={classes.policyCheckbox}
                        color="primary"
                        name="policy"
                        onChange={() =>
                          this.handleFieldChange('policy', !values.policy)
                        }
                      />
                      <Typography
                        className={classes.policyText}
                        variant="body1">
                        I have read the &nbsp;
                        <Link className={classes.policyUrl} to="#">
                          Terms and Conditions
                        </Link>
                        .
                      </Typography>
                    </div>
                  </div>

                  <Button
                    className={classes.registerButton}
                    color="primary"
                    disabled={!isValid}
                    onClick={this.handleRegister}
                    size="large"
                    variant="contained">
                    Register now
                  </Button>

                  <Typography className={classes.login} variant="body1">
                    Have an account?{' '}
                    <Link className={classes.loginUrl} to="/login">
                      Login
                    </Link>
                  </Typography>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Register.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authState.isAuthenticated
});

export default withStyles(styles)(
  connect(mapStateToProps, { register })(Register)
);
