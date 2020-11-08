import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

const emails = ["username@gmail.com", "user02@gmail.com"];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function Register(props) {
  const classes = useStyles();
  const { onClose, open } = props;
  const [userInfo, setUserInfo] = useState({});

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose();
  };

  const onSubmit = (userData) => {
    setUserInfo(userData);
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
          <label>
            First Name:
            <input type="text" firstName="firstName" />
          </label>
        </ListItem>
        <ListItem>
          <label>
            Last Name:
            <input type="text" lastName="lastName" />
          </label>
        </ListItem>
        <ListItem>
          <label for="school">School:</label>
          <select>
            <option value="queens">Queens</option>
          </select>
        </ListItem>
        <ListItem>
          <label>
            Email:
            <input type="email" email="email" />
          </label>
        </ListItem>
        <ListItem>
          <label>
            Password:
            <input type="password" password="password" />
          </label>
        </ListItem>
        <ListItem>
          <label>
            Confirm Password:
            <input type="text" confirmPassword="Confirm Password" />
          </label>
        </ListItem>
        <ListItem>
          <input type="submit" login="Login" />
        </ListItem>
      </List>
    </Dialog>
  );
}
