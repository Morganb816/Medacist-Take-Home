import { Drawer, List, ListItem, ListItemText, Toolbar } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, moviesSelector } from '../store/movie';

const NavItem = ({movie}) => (
    <Link to={`/movie/${movie?.title}`}>
        <ListItem style={{width: '100%'}} button>
            <ListItemText primary={movie?.title}/>
        </ListItem>
    </Link>
)

const LoadingNavItems = () => new Array(5).fill(null).map((x, i) => (
    <Skeleton key={`sidebar-skeleton-${i}`}>
        <NavItem />
    </Skeleton>
))

const NavItems = ({movies}) => movies.map(movie => <NavItem movie={movie} key={`sidebar-nav-link-${movie?.title}`}/>)

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