import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import './additionalcomp.css';
import MenuItem from '@material-ui/core/MenuItem';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
const currencies = [
  {
    value: 'Female',
    label: 'Female'
  },
  {
    value: 'Male',
    label: 'Male'
  }
];

function Additional() {
  // The first commit of Material-UI
  const [dob, setdob] = React.useState(new Date());
  const [gender, setGender] = React.useState();
  const handleDateChange = (date) => {
    setdob(date);
  };
  const handleChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <div className="rowC">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justifyContent="space-around">
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Enter your Date of Birth"
            format="dd/MM/yyyy"
            value={dob}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <br />
      <TextField
        required
        id="outlined-select-gender"
        select
        label="Select"
        value={gender}
        onChange={handleChange}
        helperText="Please select your gender"
        variant="outlined">
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <br />
    </div>
  );
}
export default Additional;
