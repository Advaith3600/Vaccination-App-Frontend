import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography, Select } from '@material-ui/core';
import { Button, TextField, MenuItem } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import styles from './styles';
import { genreData, languageData } from '../../../../../data/MovieDataService';
import {
  addMovie,
  updateMovie,
  removeMovie
} from '../../../../../store/actions';
import FileUpload from '../../../../../components/FileUpload/FileUpload';

class AddMovie extends Component {
  state = {
    title: '',
    image: null,
    genre: [],
    language: '',
    duration: '',
    description: '',
    director: '',
    cast: '',
    releaseDate: new Date(),
    endDate: new Date()
  };

  componentDidMount() {
    if (this.props.edit) {
      const {
        title,
        language,
        genre,
        director,
        cast,
        description,
        duration,
        releaseDate,
        endDate
      } = this.props.edit;
      this.setState({
        title,
        language,
        genre: genre.split(','),
        director,
        cast,
        description,
        duration,
        releaseDate,
        endDate
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.movie !== this.props.movie) {
      const { title, genre, language } = this.props.movie;
      this.setState({ title, genre, language });
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

  onAddMovie = () => {
    const { image, genre, ...rest } = this.state;
    const movie = { ...rest, genre: genre.join(',') };
    this.props.addMovie(image, movie);
  };

  onUpdateMovie = () => {
    const { image, genre, ...rest } = this.state;
    const movie = { ...rest, genre: genre.join(',') };
    this.props.updateMovie(this.props.edit._id, movie, image);
  };

  onRemoveMovie = () => this.props.removeMovie(this.props.edit._id);

  render() {
    const { classes, className } = this.props;
    const {
      title,
      image,
      genre,
      language,
      duration,
      description,
      director,
      cast,
      releaseDate,
      endDate
    } = this.state;

    const rootClassName = classNames(classes.root, className);
    const subtitle = this.props.edit ? 'Edit Movie' : 'Add Movie';
    const submitButton = this.props.edit ? 'Update Movie' : 'Save Details';
    const submitAction = this.props.edit
      ? () => this.onUpdateMovie()
      : () => this.onAddMovie();

    return (
      <div className={rootClassName}>
        <Typography className={classes.title} variant="h4">
          {subtitle}
        </Typography>
        <form autoComplete="off" noValidate>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              helperText="Please specify the title"
              label="Title"
              margin="dense"
              onChange={event =>
                this.handleFieldChange('title', event.target.value)
              }
              required
              value={title}
              variant="outlined"
            />
          </div>
          <div className={classes.field}>
            <Select
              className={classes.textField}
              displayEmpty
              label="Genre"
              margin="dense"
              multiple
              onChange={event =>
                this.handleFieldChange('genre', event.target.value)
              }
              required
              value={genre}
              variant="outlined"
            >
              {genreData.map((genreItem, index) => (
                <MenuItem key={genreItem + '-' + index} value={genreItem}>
                  {genreItem}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              fullWidth
              label="Description"
              margin="dense"
              multiline
              onChange={event =>
                this.handleFieldChange('description', event.target.value)
              }
              required
              value={description}
              variant="outlined"
            />
          </div>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              label="Language"
              margin="dense"
              onChange={event =>
                this.handleFieldChange('language', event.target.value)
              }
              required
              select
              value={language}
              variant="outlined"
            >
              {languageData.map((langItem, index) => (
                <MenuItem key={langItem + '-' + index} value={langItem}>
                  {langItem}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              className={classes.textField}
              label="Duration"
              margin="dense"
              onChange={event =>
                this.handleFieldChange('duration', event.target.value)
              }
              type="number"
              value={duration}
              variant="outlined"
            />
          </div>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              label="Director"
              margin="dense"
              onChange={event =>
                this.handleFieldChange('director', event.target.value)
              }
              required
              value={director}
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              label="Cast"
              margin="dense"
              onChange={event =>
                this.handleFieldChange('cast', event.target.value)
              }
              required
              value={cast}
              variant="outlined"
            />
          </div>
          <div className={classes.field}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
                className={classes.textField}
                id="release-date"
                inputVariant="outlined"
                label="Release Date"
                margin="normal"
                onChange={date =>
                  this.handleFieldChange('releaseDate', date._d)
                }
                value={releaseDate}
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
                onChange={date => this.handleFieldChange('endDate', date._d)}
                value={endDate}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className={classes.field}>
            <FileUpload
              className={classes.upload}
              file={image}
              onUpload={event => {
                const file = event.target.files[0];
                this.handleFieldChange('image', file);
              }}
            />
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
        {this.props.edit && (
          <Button
            className={classes.buttonFooter}
            color="secondary"
            onClick={this.onRemoveMovie}
            variant="contained"
          >
            Delete Movie
          </Button>
        )}
      </div>
    );
  }
}

AddMovie.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  movie: PropTypes.object
};

const mapStateToProps = ({ movieState }) => ({
  movies: movieState.movies
});

const mapDispatchToProps = { addMovie, updateMovie, removeMovie };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddMovie));
