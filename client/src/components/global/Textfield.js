import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function Textfield({ prompt }) {
    const classes = useStyles();
    const [text, setText] = React.useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-basic" label={prompt} 
                value={text}
                onChange={handleChange}
            />
        </form>
    );
}