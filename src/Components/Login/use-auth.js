import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState, useEffect } from "react";

firebase.initializeApp(firebaseConfig);

const getUser = user => {
    const { displayName, email, photoURL, emailVerified } = user;
    return { name: displayName, email, photo: photoURL, emailVerified };
}

const Auth = () => {
    const [user, setUser] = useState(null);

    const provider = new firebase.auth.GoogleAuthProvider();

    const signInWithGoogle = () => {
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const signedInUser = getUser(res.user);
                setUser(signedInUser)
                return res.user;
            })
            .catch(err => {
                setUser(null);
                return err.message;
            })
    }

    const signOut = () => {
        firebase.auth().signOut().then(() => {
            setUser(null);
            return true;
        })
            .catch(() => {
                return false;
            });
    }

    const is_valid_email = email => /(.+)@(.+){2,}\.(.+){2,}/.test(email);
    const hasNumber = input => /\d/.test(input);

    const handleChange = event => {
        const newUserInfo = { ...user };
        let isValidEmail = true;
        let isValidPassword = true;
        if (event.target.name === "email") {
            isValidEmail = is_valid_email(event.target.value);
        }
        if (event.target.name === "password") {
            isValidPassword = event.target.value.length > 7 && hasNumber(event.target.value);
        }
        newUserInfo[event.target.name] = event.target.value
        newUserInfo.isValidEmail = isValidEmail;
        newUserInfo.isValidPassword = isValidPassword;
        setUser(newUserInfo)
    }

    const createAccount = (event) => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(() => {
                firebase.auth().currentUser.updateProfile({
                    displayName: user.name
                })
                    .then(() => {
                        const createdUser = { ...user };
                        createdUser.isSignedIn = true;
                        createdUser.error = "";
                        setUser(createdUser);
                    })
                    .then(() => {
                        firebase.auth().currentUser.sendEmailVerification()
                            .then(res => {
                                console.log("Email Sent");
                            })
                            .catch(err => {
                                console.log(err.message);
                            })
                    })
            })
            .catch(err => {
                const createdUser = { ...user };
                createdUser.isSignedIn = false;
                createdUser.error = err.message;
                setUser(createdUser);
            });
    }

    const sendEmailVerification = () => {
        firebase.auth().currentUser.sendEmailVerification()
        .then(res => {
            console.log("Email Sent");
        })
        .catch(err => {
            console.log(err.message);
        })
    }

    const signInUser = event => {
        if (user) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(() => {
                    const createdUser = { ...user };
                    createdUser.isSignedIn = true;
                    createdUser.errors = "";
                    setUser(createdUser);
                })
                .catch(err => {
                    const createdUser = { ...user };
                    createdUser.isSignedIn = false;
                    createdUser.error = err.message;
                    setUser(createdUser);
                })
        }
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                const currUser = getUser(user);
                setUser(currUser);
            } else {
                // No user is signed in.
            }
        });
    }, [])

    return {
        user,
        signInWithGoogle,
        createAccount,
        handleChange,
        signOut,
        signInUser,
        sendEmailVerification
    }
}

export default Auth