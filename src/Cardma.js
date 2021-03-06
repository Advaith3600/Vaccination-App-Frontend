import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {  deepPurple } from '@material-ui/core/colors';
import CardHeader from '@material-ui/core/CardHeader';
import Slot from './Slot';
import Link from '@material-ui/core/Link';
const useStyles = makeStyles({
  root: {
    margin: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: ' center',
    alignItems: 'center',
  },
  head: {
    color: deepPurple[600],
  },
  rootcard: {
    minHeight: 460,
    maxWidth: 510,
    background:'white',
    boxShadow: 'var(--light-shadow)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  displ: {
    display: 'flex',
    flexDirection: 'row',
  },
  slot: {
    fontSize: 14,
    margin: '5px',
  },
  linkt: {
    color: 'white'
  },
});

export default function Cardma({ item }) {
  const classes = useStyles();

  const sessions = item.sessions;
  console.log(sessions);
  return (
    <div className={classes.root}>
      <Card className={classes.rootcard} elevation={3}>
        <CardHeader
          className={classes.head}
          subheader={item.fee_type}
          title={item.name}
        />
        <CardContent>
          <Typography color="textSecondary" variant="body2">
            From {item.from} to {item.to}
          </Typography>
          {sessions.map((session) => {
            return <Slot {...session} key={session.session_id}/>;
          })}
        </CardContent>
        <CardActions style={{ paddingLeft: '1rem' }}>
          <Button color="primary" size="small" style={{ padding: '0.5rem 1rem' }} variant="contained">
            <Link
              className={classes.linkt}
              href="https://selfregistration.cowin.gov.in/"
              underline="none"
            >
              Book Now
            </Link>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
