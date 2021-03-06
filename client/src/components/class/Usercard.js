import React from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles, withTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import '../../styles/coursepage.css';

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
      fontSize: 28,
      color: '#FFFFFF',
    },
    pos: {
      marginBottom: 12,
    },
    match: {
      justifyContent: 'center'
    }
  }); 

export default function UserCard(props){
    const users = useStyles();
    const history = useHistory();

    const bull = <span className={users.title}>•</span>;
    const { user } = props;
    console.log(user);

    const handleMatch = () => {
      
        // history.users(`/users/${user.title}`);
    }


    return (
        <li key={users.title} className='user-card'>
        <Card className={users.root} variant="outlined">
          <CardContent>
            <Typography className={users.title} color="textSecondary" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="h5" component="h2">
              {user.description}
            </Typography>
            <Typography variant="h5" component="h2">
              {user.assignment}
            </Typography>
          </CardContent>
          <CardActions classes={users.match}>
            <Button onClick={handleMatch}size="small">Match with {user.name.split(' ')[0]}</Button>
          </CardActions>
        </Card>
        </li>
      );
}
