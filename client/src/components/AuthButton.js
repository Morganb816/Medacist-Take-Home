import { Button } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import ModalButton from './ModalButton';
import firebase from 'firebase';
import AuthModal from './AuthModal';

const AuthButton = () => {
    const isAuthenticated = useSelector(state => !!state.auth.user);
    const getAuthButtonText = () => isAuthenticated ? 'Logout' : 'Login';
    const logout = () => firebase.auth().signOut();
    return (
        isAuthenticated
            ? <Button onClick={logout}>Sign Out</Button>
            : <ModalButton title={getAuthButtonText()} Component={({closeModal}) => <AuthModal closeModal={closeModal}/>} />
    )
};

export default AuthButton;