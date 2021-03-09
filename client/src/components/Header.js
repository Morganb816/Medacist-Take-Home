import React from 'react';
import { AppBar, Box, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AuthButton from './AuthButton';
import { Menu } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../store/general';
import useWindowSize from '../hooks/useWindowSize';

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
    const dispatch = useDispatch();
    const dimensions = useWindowSize();
    const mobileSize = 750;

    const handleMenuPress = () => {
        dispatch(toggleSidebar());
    }

    return (
        <AppBar position='fixed'>
            <Toolbar>
                <Typography
                    variant={dimensions.width <= mobileSize ? 'h6' : 'h5'}
                    className={styles.title}
                    component={Link}
                    to='/'
                >
                    StarWars Episodes
                </Typography>
                <Box flex={1} />
                <AuthButton />
                <Box p={1} />
                {
                    dimensions.width <= mobileSize && (
                        <Button
                            name='menu'
                            color='secondary'
                            variant='outlined'
                            onClick={handleMenuPress}
                        >
                            <Menu />
                        </Button>
                    )
                }
            </Toolbar>
        </AppBar>
    )
}

export default Header;