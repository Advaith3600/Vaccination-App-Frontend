import { useEffect, useState } from 'react';
import './App.css';
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
//const pin=window.prompt("Enter your Pincode: ");

//413104
//600053
const deim = '06/05/2021';
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
});
function App() {
  const classes = useStyles();
  const [arr, setArr] = useState([]);
  const [pind, setPind] = useState(560000);

  const [value, setValue] = useState(true);
  const [selectedDate, setSelectedDate] = useState(deim);
  const handleDateChange = (date) => {
    console.log(date);
    const dateObj = date;
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const output = day + '/' + month + '/' + year;
    setSelectedDate(output);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setValue(!value);
  };
  useEffect(() => {
    const fetchMoviesBadStatus = async () => {
      const response = await fetch(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pind}&date=${selectedDate}`
      );

      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      console.log(data);
      const vim = data.centers;

      setArr(vim);
    };
    fetchMoviesBadStatus();
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
                  format="MM/dd/yyyy"
                  id="date-picker-inline"
                  label="Date of Appointment"
                  margin="normal"
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

export default App;
