import { Box, Divider, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dislikeComment, likeComment, movieComments } from '../store/comments';
import { ThumbUp, ThumbDown } from '@material-ui/icons';
import PropTypes from 'prop-types';

/**
 * @name Comment
 * @description Component to render one comment for a episode.
 * @component
 */
const Comment = ({comment, likes, userName, date, docId, userLiked}) => {

    const likeCountSize = '15px';
    const iconSize = '17px';

    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => !!state.auth.user);
    const handleLike = () => dispatch(likeComment(docId));
    const handleDislike = () => dispatch(dislikeComment(docId));

    const getLikedColor = (likeState) => userLiked === likeState ? 'secondary' : 'inherit';

    return (
        <Box p={1}>
            <Box display='flex' flexDirection='row'>
                <Typography variant='body2' style={{fontWeight: 'bold'}}>
                    {userName}
                </Typography>
                <Typography variant='body2' style={{paddingLeft: 5}}>
                    {new Date(date).toDateString()}
                </Typography>
            </Box>
            <Typography variant='body2'>
                {comment}
            </Typography>
            <Box display='flex' flexDirection='row' alignItems='center'>
                <IconButton disabled={!isAuthenticated} onClick={handleLike} size='small'>
                    <ThumbUp style={{fontSize: iconSize}} color={getLikedColor(2)} />
                </IconButton>
                <Box p={0.5} />
                <Typography style={{fontSize: likeCountSize}} >{likes}</Typography>
                <Box p={0.5} />
                <IconButton disabled={!isAuthenticated} onClick={handleDislike} size='small'>
                    <ThumbDown style={{fontSize: iconSize}} color={getLikedColor(1)} />
                </IconButton>
            </Box>
        </Box>
    )
}
Comment.propTypes = {
    comment: PropTypes.string,
    likes: PropTypes.number,
    userName: PropTypes.string,
    date: PropTypes.number,
    docId: PropTypes.string,
    userLiked: PropTypes.number
}

/**
 * @name Comments
 * @description Renders the array of comments that are in our redux store.
 * @component
 */
const Comments = () => {
    const comments = useSelector(movieComments());
    return (
        <Box p={2}>
            {
                !!comments.length && comments.map((comment, i) => (
                    <React.Fragment key={`comment-${comment.userId}-${comment.comment}`} >
                        <Comment {...comment} />
                        {
                            i !== comments.length && <Divider/>
                        }
                    </React.Fragment>
                ))
            }
        </Box>
    )
};

export default Comments;