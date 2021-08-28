import React from 'react';
import { Grid, Box, TextField, MenuItem, Typography } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

export default function BookingForm(props) {
  const {
    cinemas,
    showtimes,
    selectedCinema,
    onChangeCinema,
    selectedDate,
    onChangeDate,
    times,
    selectedTime,
    onChangeTime
  } = props;

  const showtime = showtimes.find(
    showtime => showtime.cinemaId === selectedCinema
  );

  if (!cinemas.length)
    return (
      <Box
        alignItems="center"
        display="flex"
        height={1}
        justifyContent="center"
        width={1}
      >
        <Typography align="center" color="inherit" variant="h2">
          No Cinema Available.
        </Typography>
      </Box>
    );

  return (
    <Grid container spacing={3}>
      <Grid item xs>
        <TextField
          fullWidth
          label="Select Cinema"
          onChange={onChangeCinema}
          select
          value={selectedCinema}
          variant="outlined"
        >
          {cinemas.map(cinema => (
            <MenuItem key={cinema._id} value={cinema._id}>
              {cinema.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      {showtime && (
        <Grid item xs>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              fullWidth
              id="start-date"
              inputVariant="outlined"
              label="Start Date"
              margin="none"
              maxDate={new Date(showtime.endDate)}
              minDate={new Date(showtime.startDate)}
              onChange={date => onChangeDate(date._d)}
              value={selectedDate}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      )}
      {selectedDate && (
        <Grid item xs>
          <TextField
            fullWidth
            label="Select Time"
            onChange={onChangeTime}
            select
            value={selectedTime}
            variant="outlined"
          >
            {times.map((time, index) => (
              <MenuItem key={time + '-' + index} value={time}>
                {time}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      )}
    </Grid>
  );
}
