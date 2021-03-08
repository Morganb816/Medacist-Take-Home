import { Box, Divider, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../store/comments';
import { fetchMovies, movieSelector } from '../store/movie';
import { intToRomanNumeral } from '../utils';
import CommentForm from './CommentForm';
import Comments from './Comments';
import MovieCrawlText from './MovieCrawlText';
import PropTypes from 'prop-types';
import SkeletonLoader from './SkeletonLoader';

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.secondary.main
    },
}))

/**
 * @name Movie
 * @description Component to render a movie page. Displays data about the movie
 * @component
 */
const Movie = ({ match }) => {
    const movie = useSelector(movieSelector(match.params.movieId));
    const dispatch = useDispatch();
    const styles = useStyles();

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    useEffect(() => {
        if (movie) {
            dispatch(fetchComments(movie.episode_id))
        }
    }, [movie, dispatch])
    
    const getTitleText = () => movie?.title && `${movie?.title} | Episode ${intToRomanNumeral(movie?.episode_id)}`;
    const getReleaseText = () => movie?.release_date && `Release Date: ${movie?.release_date}`;
    
    return (
        <Box p={2} flex={1}>
            <Box p={1}>
                <Typography className={styles.title} variant='h5'>{getTitleText()}</Typography>
                <Typography variant='subtitle1'>{getReleaseText()}</Typography>
            </Box>
            <Divider/>
            <MovieCrawlText title={movie?.title} episodeId={intToRomanNumeral(movie?.episode_id)} text={movie?.opening_crawl} />
            <Divider/>
            <CommentForm episodeId={movie?.episode_id?.toString()}/>
            <Divider/>
            <Comments episodeId={movie?.episode_id}/>
        </Box>
    )
};
Movie.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            movieId: PropTypes.string
        })
    }).isRequired
};

export default Movie;