import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

import "../../styles/login.css";

const emails = ["username@gmail.com", "user02@gmail.com"];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function LoginPopup(props) {
  const classes = useStyles();
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Login</DialogTitle>
      <List className='inputs'>
        <ListItem>
          <label>
            Email:
            <input type="text" email="email" />
          </label>
        </ListItem>
        <ListItem>
          <label>
            Password:
            <input type="text" email="password" />
          </label>
        </ListItem>
        <ListItem>
        <input type="submit" value="Login" />
        </ListItem>

      </List>
    </Dialog>
  );
}
