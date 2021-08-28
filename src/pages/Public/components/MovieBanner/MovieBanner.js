import React from 'react';
import classnames from 'classnames';
import { Rating } from '@material-ui/lab';
import {
  Box,
  Typography,
  Button,
  makeStyles,
  withStyles
} from '@material-ui/core';
import { textTruncate } from '../../../../utils';
import { Link } from 'react-router-dom';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import styles from './styles';

const useStyles = makeStyles(styles);

const StyledRating = withStyles({
  iconFilled: {
    color: '#fff'
  },
  iconEmpty: {
    color: '#fff'
  }
})(Rating);

function MovieBanner(props) {
  const { movie, fullDescription } = props;
  const classes = useStyles(props);
  if (!movie) return null;

  return (
    <div className={classes.movieHero}>
      <div className={classes.infoSection}>
        <header className={classes.movieHeader}>
          {fullDescription && (
            <Box alignItems="center" display="flex" flexWrap="wrap" mb={3}>
              {movie.genre.split(',').map((genre, index) => (
                <Typography
                  className={classes.tag}
                  color="inherit"
                  key={`${genre}-${index}`}
                  variant="body1"
                >
                  {genre}
                </Typography>
              ))}

              <StyledRating
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                readOnly
                size="small"
                value={4}
              />
            </Box>
          )}
          <Typography
            className={classes.movieTitle}
            color="inherit"
            variant="h1"
          >
            {movie.title}
          </Typography>
          <Typography
            className={classes.descriptionText}
            color="inherit"
            variant="body1"
          >
            {textTruncate(movie.description, 450)}
          </Typography>
          <Typography className={classes.director} color="inherit" variant="h4">
            By: {movie.director}
          </Typography>
          <Typography
            className={classes.duration}
            color="inherit"
            variant="body1"
          >
            {movie.duration} min
          </Typography>
          <Typography className={classes.genre} color="inherit" variant="body1">
            {movie.genre}
          </Typography>
        </header>
      </div>
      <div
        className={classes.blurBackground}
        style={{
          backgroundImage: `url(${movie.image})`
        }}
      />
      <div className={classes.movieActions}>
        {fullDescription ? (
          <Link style={{ textDecoration: 'none' }} to={`booking/${movie._id}`}>
            <Button className={classes.button} variant="contained">
              Buy Tickets
              <ArrowRightAlt className={classes.buttonIcon} />
            </Button>
          </Link>
        ) : (
          <Link style={{ textDecoration: 'none' }} to={`movie/${movie._id}`}>
            <Button className={classnames(classes.button, classes.learnMore)}>
              Learn More
              <ArrowRightAlt className={classes.buttonIcon} />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default MovieBanner;
