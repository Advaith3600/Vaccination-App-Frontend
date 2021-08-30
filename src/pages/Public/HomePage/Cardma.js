import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { lightBlue } from '@material-ui/core/colors';
import CardHeader from '@material-ui/core/CardHeader';
import Slot from './Slot';
const useStyles = makeStyles({
  root: {
    margin: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: ' center',
    alignItems: 'center',
  },
  head: {
    color: lightBlue[300],
  },
  rootcard: {
    minHeight: 460,
    maxWidth: 510,
    background: 'rgb(36, 35, 35)',
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
  const [value, setValue] = useState(true);
  const [postId, setPostId] = useState(null);

  const sessions = item.sessions;
  console.log(sessions);
  const handleSubmit = (e) => {
    e.preventDefault();
    setValue(!value);
  };
  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React Hooks POST Request Example' })
    };
    fetch('https://vaccination-app-backend.herokuapp.com/api/pdf/pdf', requestOptions)
      .then(response => response.json())
      .then(data => setPostId(data.id));
  }, []
  );
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
            return <Slot {...session} key={session.session_id} />;
          })}
        </CardContent>
        <CardActions style={{ paddingLeft: '1rem' }}>
          <form onSubmit={handleSubmit}>
            <Button color="primary" type="submit" variant="contained">
							Book Now
            </Button>
          </form>
					Returned Id: {postId};
        </CardActions>
      </Card>
    </div>
  );
}
