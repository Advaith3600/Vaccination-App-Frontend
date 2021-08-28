import React, { useEffect, useState } from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3)
  }
}));

function Checkin(props) {
  const reservationId = props.match.params.reservationId;
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    checkinReservations(reservationId);
  }, [reservationId]);

  const checkinReservations = async id => {
    try {
      const token = localStorage.getItem('jwtToken');
      const url = '/reservations/checkin/' + id;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const reservation = await response.json();
      if (response.ok) {
        setReservation(reservation);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const classes = useStyles(props);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography className={classes.title} color="inherit" variant="h2">
          Check In
        </Typography>
        {reservation && reservation.checkin ? (
          <Typography align="center" color="primary" variant="body1">
            Check in for user: {reservation.username} was successful.
          </Typography>
        ) : (
          <Typography align="center" color="error" variant="body1">
            Something went wrong...
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default Checkin;
