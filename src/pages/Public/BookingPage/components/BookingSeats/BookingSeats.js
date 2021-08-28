import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  row: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  seat: {
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.7)',
    borderRadius: 2,
    padding: theme.spacing(2),
    margin: theme.spacing(0.5),
    fontWeight: 600,
    '&:hover': {
      background: 'rgb(120, 205, 4)'
    }
  },
  seatInfoContainer: {
    width: '50%',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#eee'
  },

  seatInfo: { marginRight: theme.spacing(2) },

  seatInfoLabel: {
    marginRight: theme.spacing(1),
    display: 'inline-block',
    width: 10,
    height: 10
  },

  [theme.breakpoints.down('sm')]: {
    seat: { padding: theme.spacing(1.2), margin: theme.spacing(0.5) },
    seatInfoContainer: { width: '100%', display: 'block' },
    seatInfo: { marginTop: theme.spacing(2) }
  }
}));

export default function BookingSeats(props) {
  const classes = useStyles(props);
  const { seats, onSelectSeat } = props;

  return (
    <Fragment>
      <Box pt={15} width={1}>
        {seats.length > 0 &&
          seats.map((seatRows, indexRow) => (
            <div className={classes.row} key={indexRow}>
              {seatRows.map((seat, index) => (
                <Box
                  bgcolor={
                    seat === 1
                      ? 'rgb(65, 66, 70)'
                      : seat === 2
                        ? 'rgb(120, 205, 4)'
                        : seat === 3
                          ? 'rgb(14, 151, 218)'
                          : 'rgb(96, 93, 169)'
                  }
                  className={classes.seat}
                  key={`seat-${index}`}
                  onClick={() => onSelectSeat(indexRow, index)}
                >
                  {index + 1}
                </Box>
              ))}
            </div>
          ))}
      </Box>
      <Box mt={10} width={1}>
        <div className={classes.seatInfoContainer}>
          <div className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: 'rgb(96, 93, 169)' }}
            />
            Seat Available
          </div>
          <div className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: 'rgb(65, 66, 70)' }}
            />
            Reserved Seat
          </div>
          <div className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: 'rgb(120, 205, 4)' }}
            />
            Selected Seat
          </div>
          <div className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: 'rgb(14, 151, 218)' }}
            />
            Recommended Seat
          </div>
        </div>
      </Box>
    </Fragment>
  );
}
