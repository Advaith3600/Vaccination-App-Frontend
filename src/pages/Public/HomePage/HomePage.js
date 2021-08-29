import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  getMovies,
  getShowtimes,
  getMovieSuggestion
} from '../../../store/actions';
import styles from './styles';

import LoginForm from '../Login/components/LoginForm';

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: '1000px',
    margin: '6rem auto'
  }
}));

const HomePage = ({ user, isAuth }) => {

  const classes = useStyles();

  return (
    <Fragment>
      {isAuth ? (
        <div>You are logged in as {user.userFullName}</div>
      ) : (
        <div className={classes.container}>
          <LoginForm />
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = ({ authState }) => ({
  isAuth: authState.isAuthenticated,
  user: authState.user
});

const mapDispatchToProps = { getMovies, getShowtimes, getMovieSuggestion };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HomePage));
