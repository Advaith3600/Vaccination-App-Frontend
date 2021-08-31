import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { lightBlue } from '@material-ui/core/colors';
import CardHeader from '@material-ui/core/CardHeader';
import login from '../../../store/actions/auth'
// import axios from 'axios';
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
  aadharCard: {
    display: 'none'
  },
});


export default function Cardma({ item }) {
  const classes = useStyles();
  //   const [value, setValue] = useState(true);

  const sessions = item.sessions;
  console.log(sessions);
  //   const fetchPDF = (e) => {
  //     e.preventDefault();
  //     axios.post('https://vaccination-app-backend.herokuapp.com/api/pdf/pdf', { 'aadharNumber': '768411442314' })
  //       .then((response) => response.blob())
  //       .then((blob) => {
  //         // Create blob link to download
  //         const url = window.URL.createObjectURL(
  //           new Blob([blob]),
  //         );
  //         const link = document.createElement('a');
  //         link.href = url;
  //         link.setAttribute(
  //           'download',
  //           'FileName.pdf',
  //         );

  //         // Append to html link element page
  //         document.body.appendChild(link);

  //         // Start download
  //         link.click();

  //         // Clean up and remove the link
  //         link.parentNode.removeChild(link);
  //       });
  //     console.log('Done');
  //     setValue(!value);
  //   };
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
          <form action="https://vaccination-app-backend.herokuapp.com/api/pdf/pdf" encType="application/json" method="post">
            <div name="aadharCard">
              <input name="aadharNumber" placeholder="aadharNumber" type="hidden" value={login.aadharNumber} />
            </div>

            <Button color="primary" type="submit" variant="contained">
							Book Now
            </Button>
          </form>
        </CardActions>
      </Card>
    </div>
  );
}
