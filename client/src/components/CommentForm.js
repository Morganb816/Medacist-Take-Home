import { Box, Button, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postComment } from '../store/comments';
import PropTypes from 'prop-types';

/**
 * @name CommentForm
 * @description Component containing a form that allows users who are signed in to post comments to a episodes comment fourm.
 * @component 
 */
const CommentForm = ({episodeId}) => {
    const [commentButtonShowing, setCommentButtonShowing] = useState(false);
    const [comment, setComment] = useState('');

    const isAuthenticated = useSelector(state => !!state.auth.user);
    const dispatch = useDispatch();
    
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(postComment({comment, episodeId}));
    }

    useEffect(() => {
        if (comment.length) {
            setCommentButtonShowing(true);
        }
    }, [comment])

    const handleChange = e => {
        setComment(e.target.value);
    }

    const handleCancel = () => {
        setComment('');
        setCommentButtonShowing(false);
    }

    const handleBlur = () => {
        if (!comment.length) {
            setCommentButtonShowing(false);
        }
    };

    return (
        <Box p={1}>
            {
                isAuthenticated ? (
                    <form name='comment-form' onSubmit={handleSubmit} autoComplete='off'>
                        <TextField value={comment} onChange={handleChange} onBlur={handleBlur} label='Post a public comment...' fullWidth multiline/>
                        <Box p={1} />
                        <Box display='flex' flexDirection='row'>
                            <Box flex={1} />
                            {
                                commentButtonShowing && (
                                    <>
                                        <Button onClick={handleCancel} variant='outlined' color='secondary'>Cancel</Button>
                                        <Box p={1} />
                                        <Button type='submit' variant='outlined' color='primary'>Comment</Button>
                                    </>
                                )
                            }
                        </Box>
                    </form>
                ) : (
                    <Typography variant='body2'>Please login to post a comment</Typography>
                )
            }
        </Box>
    )
};
CommentForm.propTypes = {
    episodeId: PropTypes.string.isRequired
}

export default CommentForm;