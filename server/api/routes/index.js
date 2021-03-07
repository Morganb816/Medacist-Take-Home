const express = require('express');
const commentRouter = require('./comments');
const mainRouter = express.Router();

mainRouter.use('/comment', commentRouter);

module.exports = mainRouter;