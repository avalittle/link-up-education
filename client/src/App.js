import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

import { AppContext } from './libs/contextLib';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Routes from './Routes';
import Navigation from './components/Navigation';

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    setIsAuthenticating(false);
  }
  return (
    !isAuthenticating && 
      <div>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          { isAuthenticated ? <Navigation auth={userHasAuthenticated}/> : <></> }
          <Routes />
        </AppContext.Provider>
      </div>
  );
}

export default App;
