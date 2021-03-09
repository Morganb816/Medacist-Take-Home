import { Drawer, List, ListItem, ListItemText, Toolbar, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, moviesSelector } from '../store/movie';
import PropTypes from 'prop-types';
import useDimensions from '../hooks/useWindowSize';
import { sidebarOpen, toggleSidebar } from '../store/general';

const useStyles = makeStyles((theme) => ({
    navItemText: {
        color: theme.palette.primary.contrastText,
        fontWeight: theme.typography.fontWeightBold,
    },
    navItem: {
        width: '100%',
    },
    link: {
        width: '100%',
        textDecoration: 'none',
        fontWeight: 'theme.typography.fontWeightBold'
    },
    drawer: {
        zIndex: 0,
        width: '250px'
    }
}))

/**
 * @name NavItem
 * @description Component which renders a single nav item for the sidebar
 * @component
 */
const NavItem = ({movie, handleClose}) => {
    const styles = useStyles();
    return (
        <Link className={styles.link} to={`/movie/${movie?.title}`}>
            <ListItem onClick={handleClose} className={styles.navItem} button>
                <ListItemText className={styles.navItemText} primary={movie?.title}/>
            </ListItem>
        </Link>
    )
};
NavItem.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string
    })
};


/**
 * @name LoadingNavItems
 * @description Component which renders an array of fake nav items while real ones are loading.
 * @component
 */
const LoadingNavItems = () => new Array(5).fill(null).map((x, i) => (
    <Skeleton width='90%' height='50px' key={`sidebar-skeleton-${i}`}>
        <NavItem />
    </Skeleton>
))

/**
 * @name NavItems
 * @description Component which renders nav items for the sidebar and handles showing skeleton items while real ones are loading.
 * @component
 */
const NavItems = ({movies, handleClose}) => (
    movies.map(movie => (
        <NavItem movie={movie} key={`sidebar-nav-link-${movie?.title}`} handleClose={handleClose} />
    ))
)
NavItems.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string
        })
    )
};

/**
 * @name Sidebar
 * @description Component which renders the sidebar for the application.
 * @component
 */
const Sidebar = () => {
    const movies = useSelector(moviesSelector());
    const dispatch = useDispatch();
    const dimensions = useDimensions();
    const isOpen = useSelector(sidebarOpen());

    const mobileWidth = 750;

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);
    
    const handleClose = () => {
        dispatch(toggleSidebar())
    }

    return (
        <Drawer
            anchor='left'
            variant={dimensions.width <= mobileWidth ? 'temporary' : 'permanent'}
            open={isOpen}
            onClose={handleClose}
            style={{zIndex: 0, width: 250}}
        >
            <Toolbar />
            <List style={{width: 250, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {
                    !movies.length ? <LoadingNavItems /> : <NavItems movies={movies} handleClose={handleClose}/>
                }
            </List>
        </Drawer>
    )
};

export default Sidebar;