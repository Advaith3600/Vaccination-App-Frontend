import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../../store/actions';
import classnames from 'classnames';
import { withStyles, Typography } from '@material-ui/core';

// Component styles
import styles from './styles';

class Navbar extends Component {
  state = { showMenu: false, scrollPos: window.pageYOffset };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    this.setState({
      scrollPos: window.pageYOffset
    });
  };

  render() {
    const { showMenu, scrollPos } = this.state;
    const { classes, isAuth, user, logout } = this.props;
    return (
      <Fragment>
        <nav
          className={classnames({
            [classes.navbar]: true,
            [classes.navbarColor]: scrollPos > 30
          })}>
          <Link className={classes.logoLink} to='/'>
            <Typography className={classes.logo} variant='h2'>
              Vaccination App
            </Typography>
          </Link>

          <div className={classes.navLinks}>
            {isAuth ? (
              <Link className={classes.navLink} onClick={logout} to='/'>
                Logout
              </Link>
            ) : (
              <Link className={classes.navLink} to='/login'>
                Login
              </Link>
            )}
          </div>
        </nav>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.authState.isAuthenticated,
  user: state.authState.user
});

const mapDispatchToProps = {
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Navbar));
