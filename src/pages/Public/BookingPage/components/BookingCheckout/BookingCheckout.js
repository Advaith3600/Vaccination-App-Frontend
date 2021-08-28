import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Grid, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  bannerTitle: {
    fontSize: theme.spacing(1.4),
    textTransform: 'uppercase',
    color: 'rgb(93, 93, 97)',
    marginBottom: theme.spacing(1)
  },
  bannerContent: {
    fontSize: theme.spacing(2),
    textTransform: 'capitalize',
    color: theme.palette.common.white
  },
  [theme.breakpoints.down('sm')]: {
    hideOnSmall: {
      display: 'none'
    }
  }
}));

export default function BookingCheckout(props) {
  const classes = useStyles(props);
  const {
    user,
    ticketPrice,
    selectedSeats,
    seatsAvailable,
    onBookSeats
  } = props;

  return (
    <Box bgcolor="rgb(18, 20, 24)" marginTop={2}>
      <Grid container>
        <Grid item md={10} xs={8}>
          <Grid container spacing={3} style={{ padding: 20 }}>
            {user && user.name && (
              <Grid className={classes.hideOnSmall} item>
                <Typography className={classes.bannerTitle}>Name</Typography>
                <Typography className={classes.bannerContent}>
                  {user.name}
                </Typography>
              </Grid>
            )}
            <Grid item>
              <Typography className={classes.bannerTitle}>Tickets</Typography>
              {selectedSeats > 0 ? (
                <Typography className={classes.bannerContent}>
                  {selectedSeats} tickets
                </Typography>
              ) : (
                <Typography className={classes.bannerContent}>0</Typography>
              )}
            </Grid>
            <Grid item>
              <Typography className={classes.bannerTitle}>Price</Typography>
              <Typography className={classes.bannerContent}>
                {ticketPrice * selectedSeats} &euro;
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          md={2}
          style={{
            color: 'rgb(120, 205, 4)',
            background: 'black',
            display: 'flex'
          }}
          xs={4}
        >
          <Button
            color="inherit"
            disabled={seatsAvailable <= 0}
            fullWidth
            onClick={() => onBookSeats()}
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
