import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SWAPI from '../api/SWAPI';

export const movieComments = () => state => state.comments;

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

export const postComment = createAsyncThunk(
    'comments/postComment',
    async ({comment, episodeId}) => {
        const result = await SWAPI.postComment(comment, episodeId);
        return result;
    }
);

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

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    (episodeId, thunkAPI) => SWAPI.getComments(episodeId, !!thunkAPI.getState().auth.user)
);


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
            console.log('test');
            state.unshift(action.payload);
        }
    }
});

export default commentsSlice.reducer;