import React, { useState } from 'react';

// Import Components
import Button from '@material-ui/core/Button';
import LoginPopup from './Login';
import RegisterPopup from './Register';

// Import styling
import '../../styles/home.css'

const title = 'School Work Partner Finder'
const subtitle = 'Your one stop shop for never being sewered by a bad lab partner again!'

export default function Home(){
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);

    const openLogin = () => {
        setLoginOpen(true);
    }

    const openRegister = () => {
        setRegisterOpen(true);
    }

    const handleClose = () => {
        setLoginOpen(false);
        setRegisterOpen(false);
    }

    return (
        <div className='container'>
            <div className='title'>
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
            </div>
            <div className='login'>
                <Button onClick={openLogin} variant='contained'>Login</Button>
                <br></br>
                <Button onClick={openRegister} variant='contained'>Register</Button>
            </div>
            <Login open={loginOpen} onClose={handleClose} />
            <Register open={registerOpen} onClose={handleClose} />
        </div>
    );
}
