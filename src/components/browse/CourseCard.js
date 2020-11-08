import React from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles, withTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import '../../styles/browse.css';

const useStyles = makeStyles({
    root: {
      'background-color': '#9FF4FE',
      color: '#C4C4C4',
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

export default function CourseCard(props){
    const classes = useStyles();
    const history = useHistory();

    const bull = <span className={classes.bullet}>•</span>;
    const { course } = props;

    const handleEnroll = () => {
        console.log("Enrolling in a class");
        console.log(course.title);
        history.push(`/class/${course.title}`);
    }

    return (
        <li key={classes.title} className='course-card' onClick={handleEnroll}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {course.title}
            </Typography>
            <Typography variant="h5" component="h2">
              {course.description}
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button onClick={handleEnroll}size="small">Enroll</Button>
          </CardActions> */}
        </Card>
        </li>
      );
}
