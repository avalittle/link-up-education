import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import { Auth } from 'aws-amplify';

const Navigation = ({auth}) => {
   const history = useHistory();

   const handleLogout = async () => {
      await Auth.signOut();
      auth(false);
      history.push('/');
   }

    return (
       <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/browse">Browse</NavLink>
          <Button onClick={handleLogout} >Log Out</Button>
       </div>
    )
}
 
export default Navigation;