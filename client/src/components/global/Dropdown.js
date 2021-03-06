import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
    },
}));


export default function Dropdown({ data, prompt, handleChange }) {
    const classes = useStyles();
    const [option, setOption] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleDropdownChange= (event) => {
        setOption(event.target.value);
        handleChange(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label" value={prompt}>{prompt}</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={option}
                    onChange={handleDropdownChange}
                >
                    {
                        data.map(item =>
                            <MenuItem key={item} value={item}>{item}</MenuItem>
                        )
                    }
                </Select>
            </FormControl>
        </div>
    );
}

