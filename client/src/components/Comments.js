import { Box, Divider, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dislikeComment, likeComment, movieComments } from '../store/comments';
import { ThumbUp, ThumbDown } from '@material-ui/icons';

const ICON_SIZE = '17px';
const LIKE_COUNT_SIZE = '15px';

const Comment = ({comment, likes, userName, date, docId, userLiked}) => {
    const dispatch = useDispatch();

    const handleLike = () => dispatch(likeComment(docId));
    const handleDislike = () => dispatch(dislikeComment(docId));

    const getLikedColor = (likeState) => userLiked === likeState ? 'primary' : 'default';

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
                <IconButton onClick={handleLike} size='small'>
                    <ThumbUp style={{fontSize: ICON_SIZE}} color={getLikedColor(2)} />
                </IconButton>
                <Box p={0.5} />
                <Typography style={{fontSize: LIKE_COUNT_SIZE}} >{likes}</Typography>
                <Box p={0.5} />
                <IconButton onClick={handleDislike} size='small'>
                    <ThumbDown style={{fontSize: ICON_SIZE}} color={getLikedColor(1)} />
                </IconButton>
            </Box>
        </Box>
    )
}

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