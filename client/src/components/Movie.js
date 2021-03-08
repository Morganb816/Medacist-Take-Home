import { Box, Divider, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../store/comments';
import { fetchMovies, movieSelector } from '../store/movie';
import { intToRomanNumeral } from '../utils';
import CommentForm from './CommentForm';
import Comments from './Comments';
import MovieCrawlText from './MovieCrawlText';
import PropTypes from 'prop-types';

/**
 * @name Movie
 * @description Component to render a movie page. Displays data about the movie
 * @component
 */
const Movie = ({ match }) => {
    const movie = useSelector(movieSelector(match.params.movieId));
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    useEffect(() => {
        if (movie) {
            dispatch(fetchComments(movie.episode_id))
        }
    }, [movie, dispatch])
    
    const getTitleText = () => `${movie?.title} | Episode ${intToRomanNumeral(movie?.episode_id)}`

    return (
        <Box p={2} flex={1}>
            <Box p={1}>
                <Typography variant='h5'>{getTitleText()}</Typography>
                <Typography variant='subtitle1'>Release Date: {movie?.release_date}</Typography>
            </Box>
            <Divider/>
            <MovieCrawlText>
                {movie?.opening_crawl}
            </MovieCrawlText>
            <Divider/>
            <CommentForm episodeId={movie?.episode_id?.toString()}/>
            <Divider/>
            <Comments />
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