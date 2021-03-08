import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AuthButton from './AuthButton';

const Header = () => {
    return (
        <AppBar position='fixed'>
            <Toolbar>
                <Typography component={Link} to='/'>StarWars Episodes</Typography>
                <Box flex={1} />
                <AuthButton />
            </Toolbar>
        </AppBar>
    )
}

export default Header;