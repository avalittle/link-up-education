import React, { useState } from 'react';

// Import Components
import Button from '@material-ui/core/Button';
import Login from './Login';
import Register from './Register';

// Import styling
import '../../styles/home.css'
import leftSide from './waves.png';

const title = 'Login'

console.log(leftSide)

export default function Home() {
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
            <div className='left-half'>
                <img src={leftSide} alt="leftside" className='image'></img>
            </div>
            <div className='right-half'>
                <div className='title'>
                    <h1>{title}</h1>
                </div>
                <div className='login'>
                    <Button onClick={openLogin} size="large" variant='contained'>Login</Button>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Button onClick={openRegister} size="large" variant='contained'>Register</Button>
                </div>
                <LoginPopup open={loginOpen} onClose={handleClose} />
                <RegisterPopup open={registerOpen} onClose={handleClose} />
            </div>
            <Login open={loginOpen} onClose={handleClose} />
            <Register open={registerOpen} onClose={handleClose} />
        </div>
    );
}
