/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import './home.css';
import Appbar from './Appbar';
import Button from '@material-ui/core/Button';
import Cardma from './Cardma';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import vaccine from './vaccine.svg';
import Faq from './Faq';
import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

var dateObj = new Date();
var dd = dateObj.getDate();
var mm = dateObj.getMonth() + 1;

var yyyy = dateObj.getFullYear();
if (dd < 10) {
	dd = '0' + dd;
}
if (mm < 10) {
	mm = '0' + mm;
}
var diem = null;

diem = dd + '/' + mm + '/' + yyyy;
// const deim = '08/12/2021'
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
});
function Home() {
  const classes = useStyles();
  const [arr, setArr] = useState([]);
  const [pind, setPind] = useState(560000);

	const [value, setValue] = useState(true);
  const [selectedDate, setSelectedDate] = useState(diem);
    const handleDateChange = (date) => {
      console.log(date);
      const dateObj = date;
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      const year = dateObj.getFullYear();
      const output = day + '-' + month + '-' + year;
      setSelectedDate(output);
    };
  const handleSubmit = (e) => {
    e.preventDefault();
    setValue(!value);
  };
  useEffect(async () => {
    const response = await fetch(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pind}&date=${selectedDate}`
	);
	
	  console.log(response);

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      alert(message);
      throw new Error(message);
    }

    const data = await response.json();
    console.log(data);

    setArr(data.centers);
  }, [value]);

  return (
    <div>
      <Appbar />
      <div className="hero">
        <div>
          <div className="formdata">
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <TextField
                className={classes.field}
                fullWidth
                label="Enter area Pincode"
                onChange={(e) => {
                  setPind(e.target.value);
                }}
                required
                type="number"
                variant="outlined"
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  disableToolbar
                  format="dd-MM-yyyy"
                  id="date-picker-inline"
                  margin="normal"
                //   label="Date of Appointment"
                  minDate
                  okLabel
                  onChange={handleDateChange}
                  value={selectedDate}
                  variant="inline"
                />
              </MuiPickersUtilsProvider>
              <Button color="primary" type="submit" variant="contained">
								Submit
              </Button>
            </form>
          </div>
        </div>
        <div>
          <img alt="covin" height="450px" src={vaccine} />
        </div>
      </div>
      <div className="cardcl">
        {arr.map((item) => {
          return <Cardma item={item} key={item.center_id} />;
        })}
      </div>

      <Faq />
    </div>
  );
}

export default Home;
