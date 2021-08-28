import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { SearchInput, ResponsiveDialog } from '../../../../../components';
import styles from './styles';
import AddCinema from '../AddCinema/AddCinema';

class CinemaToolbar extends Component {
  state = {
    openAddDialog: false
  };

  OpenAddDialog() {
    this.setState({ openAddDialog: true });
  }

  CloseAddDialog() {
    this.setState({ openAddDialog: false });
  }

  render() {
    const { openAddDialog } = this.state;
    const { classes, className, search, onChangeSearch } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Fragment>
        <div className={rootClassName}>
          <div className={classes.row}>
            <SearchInput
              className={classes.searchInput}
              onChange={onChangeSearch}
              placeholder="Search cinema"
              value={search}
            />
            <Button
              color="primary"
              onClick={() => this.OpenAddDialog()}
              size="small"
              variant="outlined"
            >
              Add
            </Button>
          </div>
        </div>
        <ResponsiveDialog
          handleClose={() => this.CloseAddDialog()}
          id="Add-cinema"
          open={openAddDialog}
        >
          <AddCinema />
        </ResponsiveDialog>
      </Fragment>
    );
  }
}

CinemaToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CinemaToolbar);
