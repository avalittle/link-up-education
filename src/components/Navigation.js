import React, { useContext } from 'react';

import { NavLink } from 'react-router-dom';
 
const Navigation = () => {

    return (
       <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/browse">Browse</NavLink>
       </div>
    );
}
 
export default Navigation;