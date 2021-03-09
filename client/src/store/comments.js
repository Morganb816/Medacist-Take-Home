import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SWAPI from '../api/SWAPI';

/**
 * @name movieComments
 * @description Retrieves the current comments in redux
 * @returns {object[]} array of comments in redux
 */
export const movieComments = () => state => state.comments;

/**
 * @name likeComment
 * @description Thunk for liking a comment
 * @returns {void}
 */
export const likeComment = createAsyncThunk(
    'comments/likeComment',
    async (commentId, thunkAPI) => {
        const currentLikeState = thunkAPI.getState().comments[thunkAPI.getState().comments.findIndex(comment => comment.docId === commentId)].userLiked;
        if (currentLikeState === 2) {
            SWAPI.unlikeComment(commentId);
        } else {
            SWAPI.likeComment(commentId);
        }
        return commentId;
    }
);

/**
 * @name postComment
 * @description Thunk for creating a comment
 * @returns {void}
 */
export const postComment = createAsyncThunk(
    'comments/postComment',
    async ({comment, episodeId}) => {
        const result = await SWAPI.postComment(comment, episodeId);
        return result;
    }
);

/**
 * @name dislikeComment
 * @description Thunk for disliking a comment
 * @returns {void}
 */
export const dislikeComment = createAsyncThunk(
    'comments/dislikeComment',
    async (commentId, thunkAPI) => {
        const currentLikeState = thunkAPI.getState().comments[thunkAPI.getState().comments.findIndex(comment => comment.docId === commentId)].userLiked;
        if (currentLikeState === 1) {
            SWAPI.unlikeComment(commentId)
        } else {
            SWAPI.dislikeComment(commentId);
        }
        return commentId;
    }
);

/**
 * @name fetchComments
 * @description Thunk for fetching comments for a given episode
 * @returns {void}
 */
export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    (episodeId, thunkAPI) => SWAPI.getComments(episodeId, !!thunkAPI.getState().auth.user)
);

/**
 * @name commentsSlice
 * @description Redux slice that manages our comment state
 */
const commentsSlice = createSlice({
    name: 'comments',
    initialState: null,
    reducers: {},
    extraReducers: {
        [fetchComments.fulfilled]: (state, action) => {
            if (action.payload) {
                state = action.payload;
            }
            return state;
        },
        [likeComment.fulfilled]: (state, action) => {
            const currentLikeState = state[state.findIndex(comment => comment.docId === action.payload)].userLiked;
            
            const adjustLookup = { 2: -1, 1: 2, 0: 1 };
            const likeStateLookup = { 2: 0, 1: 2, 0: 2};
            
            const comment = state[state.findIndex(comment => comment.docId === action.payload)]
            comment.likes += adjustLookup[currentLikeState];
            comment.userLiked = likeStateLookup[currentLikeState];
        },
        [dislikeComment.fulfilled]: (state, action) => {
            const currentLikeState = state[state.findIndex(comment => comment.docId === action.payload)].userLiked;
            
            const adjustLookup = {2: -2, 1: 1, 0: -1};
            const likeStateLookup = {2: 1, 1: 0, 0: 1};
            
            const comment = state[state.findIndex(comment => comment.docId === action.payload)]
            comment.likes += adjustLookup[currentLikeState];
            comment.userLiked = likeStateLookup[currentLikeState];
        },
        [postComment.fulfilled]: (state, action) => {
            state.unshift(action.payload);
        }
    }
});

export default commentsSlice.reducer;