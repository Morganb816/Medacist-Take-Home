import { Box, Button, Divider, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { GitHub as GitHubIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    linkText: {
        textDecoration: 'none'
    },
    linkContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        margin: theme.spacing(1),
    },
    buttonInnerContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: theme.spacing(1),
    }
}))

/**
 * @name Home
 * @description Component to render the home page of our application
 * @component
 */
const Home = () => {
    const styles = useStyles();
    return (
        <Box p={2} flex={1}>
            <Typography variant='h5'>Welcome to StarWars Episodes</Typography>
            <Box p={1}>
                <Divider />
            </Box>
            <Typography variant='body1'>
                This application was built as a take home assesment. 
            </Typography>
            <Box p={1}>
                <Divider />
            </Box>
            <Box className={styles.linkContainer}>
            <a className={styles.linkText} href='https://github.com/Morganb816/Medacist-Take-Home'>
                <Button className={styles.button} variant='outlined'>
                    <Box className={styles.buttonInnerContainer}>
                        <GitHubIcon />
                        <Box p={1} />
                        <Typography variant='body1'>Check out the code!</Typography>
                    </Box>
                </Button>
            </a>
            </Box>
        </Box>
    )
};

export default Home;