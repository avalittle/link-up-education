import React from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles, withTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import '../../styles/matches.css';

const useStyles = makeStyles({
    root: {
      'background-color': '#C4C4C4',
      color: '#FFFFFF',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
      color: '#FFFFFF',
    },
    pos: {
      marginBottom: 12,
    },
  });

export default function MatchesCard(props){
    const matches = useStyles();
    const history = useHistory();

    const bull = <span className={matches.title}>•</span>;
    const { user } = props;

    const handleMatch = () => {
        history.matches(`/matches/${user.title}`);
    }


    return (
        <li key={matches.title} className='matches-card'>
        <Card className={matches.root} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h2" color="black"> 
                {user.name}
            </Typography>
            <Typography variant="h6" component="h2">
                {user.email}
            </Typography>
            <Typography variant="h6" component="h2">
                {user.course}
            </Typography>
            <Typography variant="h6" component="h2">
                {user.assignment}
            </Typography>
          </CardContent>
          <CardActions>
            {/* <Button onClick={handleMatch}size="small">${matches.root.button}</Button> */}
          </CardActions>
        </Card>
        </li>
      );
}