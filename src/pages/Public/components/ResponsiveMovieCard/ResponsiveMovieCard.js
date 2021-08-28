import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, Typography } from '@material-ui/core';
import styles from './styles';
// import ShareIcon from '@material-ui/icons/Share';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import CaledarIcon from '@material-ui/icons/CalendarToday';
import { textTruncate } from '../../../../utils';
import { Link } from 'react-router-dom';

const MovieCard = props => {
  const { classes, movie } = props;

  return (
    <Link style={{ textDecoration: 'none' }} to={`/movie/${movie._id}`}>
      <Paper className={classes.movieCard} elevation={20}>
        <div className={classes.infoSection}>
          <header className={classes.movieHeader}>
            <Typography
              className={classes.movieTitle}
              color="inherit"
              variant="h1"
            >
              {movie.title}
            </Typography>
            <Typography
              className={classes.director}
              color="inherit"
              variant="h4"
            >
              By: {movie.director}
            </Typography>
            <Typography
              className={classes.duration}
              color="inherit"
              variant="body1"
            >
              {movie.duration} min
            </Typography>
            <Typography
              className={classes.genre}
              color="inherit"
              variant="body1"
            >
              {movie.genre}
            </Typography>
          </header>

          <div className={classes.description}>
            <Typography
              className={classes.descriptionText}
              color="inherit"
              variant="body1"
            >
              {textTruncate(movie.description, 250)}
            </Typography>
          </div>
          {/* <div className={classes.footer}>
            <div className={classes.icons}>
              <ShareIcon fontSize="small" />
            </div>
            <div className={classes.icons}>
              <FavoriteIcon fontSize="small" />
            </div>
            <div className={classes.icons}>
              <CaledarIcon fontSize="small" />
            </div>
          </div> */}
        </div>
        <div
          className={classes.blurBackground}
          style={{
            backgroundImage: `url(${movie.image})`
          }}
        />
      </Paper>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired
};
export default withStyles(styles)(MovieCard);
