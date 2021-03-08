import React from 'react';
import { AppBar, Box, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AuthButton from './AuthButton';

const useStyles = makeStyles(theme => ({
    title: {
        color: theme.palette.secondary.main,
        fontWeight: theme.typography.fontWeightBold,
        textDecoration: 'none'
    }
}))

/**
 * @name Header
 * @description Header component for our site
 * @component
 */
const Header = () => {
    const styles = useStyles();
    return (
        <AppBar position='fixed'>
            <Toolbar>
                <Typography
                    variant='h5'
                    className={styles.title}
                    component={Link}
                    to='/'
                >
                    StarWars Episodes
                </Typography>
                <Box flex={1} />
                <AuthButton />
            </Toolbar>
        </AppBar>
    )
}

export default Header;