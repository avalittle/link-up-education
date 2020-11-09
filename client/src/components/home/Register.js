import React, { useState } from "react";
import { Auth, API } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import { Button, DialogContent, useScrollTrigger } from "@material-ui/core";
import Dropdown from '../global/Dropdown'

const fakeSchools = ['Queens', 'Western'];

export default function Register(props) {
  const { onClose, open } = props;
  const history = useHistory();
  const [firstClick, setFirstClick] = useState(true);

  const handleClose = () => {
    onClose();
  };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [school, setSchool] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');


  const handleFirstNameChange = (e) => { setFirstName(e.target.value); };
  const handleLastNameChange = (e) => { setLastName(e.target.value); };
  const handleEmailChange = (e) => { setEmail(e.target.value); };
  const handlePasswordChange = (e) => { setPassword(e.target.value); };
  const handlePasswordConfirmChange = (e) => { setPasswordConfirm(e.target.value); };
  const handleConfirmationCodeChange = (e) => { setConfirmationCode(e.target.value); };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Registering new user!");
    let user = {
      firstName,
      lastName,
      email,
      school,
      program: "Engineering",
    };

    try {
      await Register({ user });
    } catch (e) {
      console.log(e);
    }
    setFirstClick(false);
  };

  const Register = async (user) => {
    const newUser = await Auth.signUp({
      username: email,
      password: password,
    }).catch(err => {
      console.log(err);
    })
    console.log(newUser);
  }

  const confirmRegister = async (e) => {
    console.log("Confirming User!");
    e.preventDefault();
    try {
      await Auth.confirmSignUp(email, confirmationCode);
      await Auth.signIn(email, password);
      onClose();
      history.push("/browse");
    } catch (e) {
      console.log(e);
    }
    setFirstClick(true);
  }
  const handleBack = () => {
    setFirstClick(true);
  }
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      { firstClick ?
        <>
          <DialogTitle id="simple-dialog-title">Register</DialogTitle>
          <DialogContent>
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
                <Dropdown data={fakeSchools} prompt={"School"} handleChange={setSchool} />
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
                  <Button onClick={handleRegister}>Register</Button>
              </ListItem>
            </List>
          </DialogContent>
        </>
        :
        <>
          <DialogTitle id="simple-dialog-title">Confirm Registration</DialogTitle>
          <DialogContent>
            <List className="inputs">
              <ListItem>
                <TextField
                  id="standard-basic"
                  label="Confirmation Code"
                  onChange={handleConfirmationCodeChange}
                  value={confirmationCode}
                />
              </ListItem>
              <ListItem>
                <Button onClick={handleBack}>Back</Button>
                <Button onClick={confirmRegister}>Confirm</Button>
              </ListItem>
            </List>
          </DialogContent>
        </>
      }
    </Dialog>
  );
}
