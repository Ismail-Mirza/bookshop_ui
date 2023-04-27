import React from 'react';
import './LogOut.css';
import { Button } from '@material-ui/core';
import Auth from '../Login/use-auth';

const LogOut = () => {
    const auth = Auth();

    const handleClick = async () => {
        await auth.signOut();
        window.location.reload();
    }


    return (
        <div className="logOut">
            <Button className="logOutBtn" onClick={handleClick}>Log Out</Button>
        </div>
    );
};

export default LogOut;