import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, TextField, Grid, Button, Box } from '@material-ui/core';
import { Paper } from '../../../../../components';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3)
  },
  paper: { padding: theme.spacing(4) },
  gridContainer: {
    marginTop: theme.spacing(4)
  },
  successInfo: { margin: theme.spacing(3) },
  ignoreButton: {
    marginLeft: theme.spacing(3)
  }
}));

const convertToAlphabet = value => (value + 10).toString(36).toUpperCase();

export default function BookingInvitation(props) {
  const classes = useStyles(props);
  const {
    selectedSeats,
    sendInvitations,
    ignore,
    invitations,
    onSetInvitation,
    onDownloadPDF
  } = props;

  const notValidInvitations = !Object.keys(invitations).length;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography align="center" variant="h4">
          Guest Invitation
        </Typography>
        <Typography
          align="center"
          className={classes.successInfo}
          variant="body1"
        >
          You have successfuly booked your seats. Please fill the emails below,
          to send invitations to your friends!
        </Typography>
        <Box textAlign="center" width={1}>
          <Button
            color="primary"
            onClick={() => onDownloadPDF()}
            variant="outlined"
          >
            Download Pass
          </Button>
        </Box>
        <Grid className={classes.gridContainer} container spacing={3}>
          {selectedSeats.map((seat, index) => (
            <Grid item key={'seat-' + index} lg={4} md={6} xs={12}>
              <TextField
                fullWidth
                helperText={`Please select an Email for Row : ${convertToAlphabet(
                  seat[0]
                )} - Seat Number : ${seat[1]}`}
                label="email"
                margin="dense"
                name={`${convertToAlphabet(seat[0])}-${seat[1]}`}
                onChange={event => onSetInvitation(event)}
                required
                value={
                  invitations[`${convertToAlphabet(seat[0])}-${seat[1]}`] || ''
                }
                variant="outlined"
              />
            </Grid>
          ))}
          <Grid container item xs={12}>
            <Grid item>
              <Button
                color="primary"
                disabled={notValidInvitations}
                onClick={() => sendInvitations()}
                variant="outlined"
              >
                Send Invitations
              </Button>
            </Grid>
            <Grid item>
              <Button
                className={classes.ignoreButton}
                color="secondary"
                onClick={() => ignore()}
                variant="outlined"
              >
                Ignore
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
