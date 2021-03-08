import { Drawer, List, ListItem, ListItemText, Toolbar, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, moviesSelector } from '../store/movie';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    navItemText: {
        color: theme.palette.primary.contrastText,
        fontWeight: theme.typography.fontWeightBold,
    },
    navItem: {
        width: '100%',
    },
    link: {
        textDecoration: 'none',
        fontWeight: 'theme.typography.fontWeightBold'
    }
}))

/**
 * @name NavItem
 * @description Component which renders a single nav item for the sidebar
 * @component
 */
const NavItem = ({movie}) => {
    const styles = useStyles();
    return (
        <Link className={styles.link} to={`/movie/${movie?.title}`}>
            <ListItem className={styles.navItem} button>
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
    <Skeleton key={`sidebar-skeleton-${i}`}>
        <NavItem />
    </Skeleton>
))

/**
 * @name NavItems
 * @description Component which renders nav items for the sidebar and handles showing skeleton items while real ones are loading.
 * @component
 */
const NavItems = ({movies}) => (
    movies.map(movie => (
        <NavItem movie={movie} key={`sidebar-nav-link-${movie?.title}`}/>
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
    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch])
    return (
        <Drawer anchor='left' variant='permanent' style={{zIndex: 0, width: 250}}>
            <Toolbar />
            <List style={{width: 250}}>
                {
                    !movies.length ? <LoadingNavItems /> : <NavItems movies={movies} />
                }
            </List>
        </Drawer>
    )
};

export default Sidebar;