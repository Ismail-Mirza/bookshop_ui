import React from 'react';
import './VerifyEmail.css';
import FullHeight from 'react-full-height'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck, faCheck } from '@fortawesome/free-solid-svg-icons';
import Auth from '../Login/use-auth';
import { Button } from '@material-ui/core';

const VerifyEmail = () => {
    const auth = Auth();

    return (
        <FullHeight className="verifyEmail">
            <div className="verifyEmailDetails">
                <FontAwesomeIcon className="verifyEmailImg" icon={faUserCheck} />
                <h3>Verify Your Email</h3>
                <h4><FontAwesomeIcon className="checkFont" icon={faCheck} /> A verification link has been send to your email account</h4>
                <div>
                    <Button onClick={auth.sendEmailVerification}>Resend</Button>
                    <Button onClick={() => window.location.reload()}>Reload</Button>
                </div>
                <p>Please click on the link that has just been send to your email account to verify your email and continue the registration process.</p>
            </div>
        </FullHeight>

    );
};

export default VerifyEmail;