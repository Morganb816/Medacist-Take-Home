import { Box, Button, Divider, TextField, Typography } from '@material-ui/core';
import React, { useReducer, useState } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';

const SET_PASSWORD_AGAIN_ERROR = 'SET_PASSWORD_AGAIN_ERROR';
const SET_DISPLAY_NAME_ERROR = 'SET_DISPLAY_NAME_ERROR';
const SET_PASSWORD_AGAIN = 'SET_PASSWORD_AGAIN';
const SET_PASSWORD_ERROR = 'SET_PASSWORD_ERROR';
const SET_DISPLAY_NAME = 'SET_DISPLAY_NAME';
const SET_EMAIL_ERROR = 'SET_EMAIL_ERROR';
const SET_PASSWORD = 'SET_PASSWORD';
const SET_EMAIL = 'SET_EMAIL';

const PASSWORD_MATCH_ERROR = 'Passwords do not match. Please try again';
const FIELD_CANNOT_BE_EMPTY = 'Field cannot be empty.';

const initialState = {
    passwordAgain: { value: '', error: '' },
    displayName: { value: '', error: '' },
    password: { value: '', error: '' },
    email: { value: '', error: '' },
};

const setPasswordAgainError = (passwordAgain) => ({type: SET_PASSWORD_AGAIN_ERROR, payload: passwordAgain});
const setDisplayNameError = (displayName) => ({type: SET_DISPLAY_NAME_ERROR, payload: displayName});
const setPasswordAgain = (passwordAgain) => ({type: SET_PASSWORD_AGAIN, payload: passwordAgain});
const setDisplayName = (displayName) => ({type: SET_DISPLAY_NAME, payload: displayName});
const setPasswordError = (password) => ({type: SET_PASSWORD_ERROR, payload: password});
const setPassword = (password) => ({type: SET_PASSWORD, payload: password});
const setEmailError = (email) => ({type: SET_EMAIL_ERROR, payload: email});
const setEmail = (email) => ({type: SET_EMAIL, payload: email});

const authReducer = (state, action) => {
    switch (action.type) {
        case SET_EMAIL: 
            return {...state, email: { value: action.payload, error: ''}};
        case SET_DISPLAY_NAME: 
            return {...state, displayName: {value: action.payload, error: ''}};
        case SET_DISPLAY_NAME_ERROR: 
            return {...state, displayName: {...state.displayName, error: action.payload}};
        case SET_PASSWORD: 
            return {...state, password: { value: action.payload, error: ''}};
        case SET_PASSWORD_AGAIN: 
            return {...state, passwordAgain: { value: action.payload, error: ''} };
        case SET_EMAIL_ERROR: 
            return {...state, email: { ...state.email, error: action.payload}};
        case SET_PASSWORD_ERROR: 
            return {...state, password: { ...state.password, error: action.payload}};
        case SET_PASSWORD_AGAIN_ERROR: 
            return {...state, passwordAgain: { ...state.passwordAgain, error: action.payload}};
        default: 
            return {...state}
    }
}


/**
 * @name AuthModal
 * @description Modal containing a form that lets users log in or sign up
 * @component
 */
const AuthModal = ({closeModal}) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [isSignup, setIsSignup] = useState(false);

    const checkFormForErrors = () => {
        let foundErrors = false;
        const handleFoundError = (func) => {
            foundErrors = true;
            func();
        } 

        if (!state.email.value.length) {
            handleFoundError(() => dispatch(setEmailError(FIELD_CANNOT_BE_EMPTY)));
        }
        if (!state.displayName.value.length && isSignup) {
            handleFoundError(() => dispatch(setDisplayNameError(FIELD_CANNOT_BE_EMPTY)));
        }
        if ((state.password.value !== state.passwordAgain.value) && isSignup) {
            handleFoundError(() => dispatch(setPasswordAgainError(PASSWORD_MATCH_ERROR)));
        }
        if (!state.password.value.length) {
            handleFoundError(() => dispatch(setPasswordError(FIELD_CANNOT_BE_EMPTY)));
        }
        if (!state.passwordAgain.value.length && isSignup) {
            handleFoundError(() => dispatch(setPasswordAgainError(FIELD_CANNOT_BE_EMPTY)));
        }
        return foundErrors;
    }

    const handleFirebaseAuthErrors = error => {
        if (error.code.includes('password')) {
            dispatch(setPasswordError(error.message));
        }
        if (error.code.includes('email') || error.code.includes('user')) {
            dispatch(setEmailError(error.message));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (checkFormForErrors()) {
            return;
        }
        try {
            if (isSignup) {
                await new Promise((resolve, reject) => {
                    firebase.auth().createUserWithEmailAndPassword(state.email.value, state.password.value).then(resolve).catch(reject);
                });
                firebase.auth().currentUser.updateProfile({ displayName: state.displayName.value });
            }
            if (!isSignup) {
                await new Promise((resolve, reject) => {
                    firebase.auth().signInWithEmailAndPassword(state.email.value, state.password.value).then(resolve).catch(reject);
                });
            }
            closeModal();
        } catch (err) {
            handleFirebaseAuthErrors(err);
        }
    }
    const toggleSignup = () => setIsSignup(!isSignup);
    const getAuthSubmitButtonText = () => isSignup ? 'Sign Up' : 'Login';
    const getToggleText = () => isSignup ? 'Login' : 'Sign Up';

    return (
        <>
            <form name='auth-form' autoComplete='off' onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
                <TextField
                    onChange={e => dispatch(setEmail(e.target.value))}
                    label='Email'
                    name='user-email'
                    value={state.email.value}
                    error={!!state.email.error}
                    helperText={state.email.error}
                    autoComplete='new-password'
                />
                <Box p={1} />
                {
                    isSignup && (
                        <TextField
                            onChange={e => dispatch(setDisplayName(e.target.value))}
                            label='Display Name'
                            value={state.displayName.value}
                            error={!!state.displayName.error}
                            helperText={state.displayName.error}
                            name='display-name'
                            autoComplete='new-password'
                        />
                    )
                }
                <Box p={1} />
                <TextField
                    onChange={e => dispatch(setPassword(e.target.value))}
                    label='Password'
                    name='user-password'
                    type='password'
                    value={state.password.value}
                    error={!!state.password.error}
                    helperText={state.password.error}
                    autoComplete='new-password'
                />
                <Box p={1} />
                {
                    isSignup && (
                        <TextField
                            onChange={e => dispatch(setPasswordAgain(e.target.value))}
                            label='Password Again'
                            type='password'
                            value={state.passwordAgain.value}
                            error={!!state.passwordAgain.error}
                            helperText={state.passwordAgain.error}
                            name='password-again'
                            autoComplete='new-password'
                        />
                    )
                }
                <Box p={1} />
                <Button variant='contained' type='submit'>{getAuthSubmitButtonText()}</Button>
            </form>
            <Box p={1} />
            <Divider />
            <Box p={1} />
            <Button fullWidth onClick={toggleSignup}><Typography variant='body2' color='secondary'>{getToggleText()}</Typography></Button> 
            <Box p={1} />
            <Box p={2}>
                <Typography variant='body2'>pst... you can use starwarsnerd@gmail.com and 'password' to log in</Typography>
            </Box>
        </>
    )
};
AuthModal.propTypes = {
    closeModal: PropTypes.func.isRequired
};

export default AuthModal;