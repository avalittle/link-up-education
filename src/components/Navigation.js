import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import { Auth } from 'aws-amplify';

import '../styles/nav.css';
const Navigation = ({ auth }) => {
   const history = useHistory();

   const handleLogout = async () => {
      await Auth.signOut();
      auth(false);
      history.push('/');
   }

   return (
      <div className="nav-container">
         <div className="home">
            <NavLink to="/">Home</NavLink>
         </div>
         <div className="pages">
            <ul>
               {/* <li>
                  <NavLink to="/about">About</NavLink>
               </li> */}
               <li>
                  <NavLink to="/browse">Browse</NavLink>
               </li>
               <li>
                  <NavLink to="/matches">Matches</NavLink>
               </li>
               <li>
                  <a href="/" onClick={handleLogout}>Log Out</a>
               </li>
            </ul>
         </div>

      </div>
   )
}

export default Navigation;