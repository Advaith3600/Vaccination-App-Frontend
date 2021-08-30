import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { green, orange, red } from '@material-ui/core/colors';
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 1px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  displ: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridGap: '0.5rem'
  },
  slot: {
    fontSize: 14,
    marginTop: '0.5rem',
    background: (cap) => {
      if (cap < 5) {
        return red[600];
      } else if (cap > 5 && cap < 10) {
        return orange[600];
      }
      else {
        return green[600];
      }
    },
    border: (cap) => {
      if (cap < 5) {
        return '1px solid red';
      }
      else if (cap > 5 && cap < 10) {
        return '1px solid orange'
      }
      else {
        return '1px solid green';
      }
    },
    padding: '5px',
    borderRadius: 'var(--radius)',
  },
});
export default function Slot({ available_capacity, min_age_limit, date, vaccine }) {
  const cap = available_capacity;
  const classes = useStyles(cap);

  return (
    <div className={classes.displ}>
      <div className={classes.slot} color="textSecondary">
				Date: {date}
      </div>
      <div className={classes.slot} color="textSecondary">
				Available - {available_capacity}
      </div>
      <div className={classes.slot} color="textSecondary">
        {min_age_limit}+
      </div>
      <div className={classes.slot} color="textSecondary">
        {vaccine}
      </div>
    </div>
  );
}
