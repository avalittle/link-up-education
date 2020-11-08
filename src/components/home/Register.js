import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Dropdown from '../global/Dropdown'

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

const fakeSchools = ['Queen\'s University', 'Western University', 'University of Ottawa', 'Dalhousie University'];

export default function RegisterPopup(props) {
  const classes = useStyles();
  const { onClose, open } = props;
  const [userInfo, setUserInfo] = useState({});

  const handleClose = () => {
    onClose();
  };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [school, setSchool] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');


  const handleFirstNameChange = (e) => { setFirstName(e.target.value); };
  const handleLastNameChange = (e) => { setLastName(e.target.value); };
  const handleSchoolChange = (e) => { setSchool(e.target.value); };
  const handleEmailChange = (e) => { setEmail(e.target.value); };
  const handlePasswordChange = (e) => { setPassword(e.target.value); };
  const handlePasswordConfirmChange = (e) => { setPasswordConfirm(e.target.value); };


  const handleRegister = () => {
    console.log("Registered!");
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(password);
    console.log(passwordConfirm);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Register</DialogTitle>
      <List className="inputs">
        <ListItem>
          <TextField
            id="standard-basic"
            label="First Name"
            onChange={handleFirstNameChange}
            value={firstName}
          />
        </ListItem>
        <ListItem>
          <TextField
            id="standard-basic"
            label="Last Name"
            onChange={handleLastNameChange}
            value={lastName}
          />
        </ListItem>
        <ListItem>
          <Dropdown data={fakeSchools} prompt={"Select a School"}>
            id="standard-basic"
            label="School"
            onChange={handleSchoolChange}
            value={school}
          </Dropdown>
        </ListItem>
        <ListItem>
          <TextField
            id="standard-basic"
            label="Email"
            onChange={handleEmailChange}
            value={email}
          />
        </ListItem>
        <ListItem>
          <TextField

            id="standard-basic"
            label="Password"
            onChange={handlePasswordChange}
            value={password}
            type="password"
          />
        </ListItem>
        <ListItem>
          <TextField
            id="standard-basic"
            label="Password Confirm"
            onChange={handlePasswordConfirmChange}
            value={passwordConfirm}
            type="password"
          />
        </ListItem>
        <ListItem>
          <Button onClick={handleRegister}>Login</Button>
        </ListItem>
      </List>
    </Dialog>
  );
}
