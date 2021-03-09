const { initializeApp, createSeeder, deleteCollections, runMultipleParalellTimes, getAllDocIdsInCollection } = require("./utils");
const { Comment, Like } = require('../functions/api/classes');
const faker = require('faker');

const COMMENT_COLLECTION_PATH = 'comments';
const LIKES_COLLECTION_PATH = 'likes';

const seedSettings = {
    maxComments: 25,
    maxLikesPerComment: 25
};

const createComment = () => new Comment(
    faker.random.alphaNumeric(10),
    faker.name.firstName() + faker.name.lastName(),
    faker.random.words(10),
    faker.random.number(6).toString(),
    Date.now()
).getStorable();

const createLike = (commentId) => new Like(
    commentId,
    faker.random.alphaNumeric(10),
    faker.random.boolean()
).getStorable();

const commentSeeder = createSeeder(COMMENT_COLLECTION_PATH, createComment);

(async () => {
    await initializeApp();

    await deleteCollections(COMMENT_COLLECTION_PATH, LIKES_COLLECTION_PATH);

    await runMultipleParalellTimes(commentSeeder, seedSettings.maxComments);

    const commentIds = await getAllDocIdsInCollection(COMMENT_COLLECTION_PATH);
    
    await Promise.all(commentIds.map(comment => {
        const commentLikeSeeder = createSeeder(LIKES_COLLECTION_PATH, () => createLike(comment))
        return runMultipleParalellTimes(commentLikeSeeder, seedSettings.maxLikesPerComment)
    }));
})();