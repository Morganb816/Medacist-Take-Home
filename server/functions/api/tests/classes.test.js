const { Comment, Like, Storable } = require('../classes');

const expect = require('chai').expect;

describe('Back End Classes', () => {
    describe('Comment Class', () => {
        const userId = 'userId';
        const comment = 'comment';
        const postId = 'postId';
        const testComment = new Comment(userId, comment, postId);
        it('Should be an instance of comment', () => {
            expect(testComment).to.be.a.instanceof(Comment);
        })
        it('Should create a comment', () => {
            expect(testComment.userId).to.equal(userId);
            expect(testComment.comment).to.equal(comment);
            expect(testComment.postId).to.equal(postId);
            expect(testComment.likes).to.equal(0);
        });
        it('Should extend Storable', () => {
            expect(testComment).to.be.a.instanceof(Storable);
        });
    });
    
    describe('Like Class', () => {
        const userId = 'userId';
        const commentId = 'commentId';
        const isLike = true;
        const testLike = new Like(commentId, userId, isLike);
        it('Should be an instance of like', () => {
            expect(testLike).to.be.a.instanceof(Like);
        })
        it('Should create a like', () => {
            expect(testLike.commentId).to.equal(commentId);
            expect(testLike.userId).to.equal(userId);
            expect(testLike.isLike).to.equal(isLike);
        });
        it('Should extend Storable', () => {
            expect(testLike).to.be.a.instanceof(Storable);
        });
    });

    describe('Storable', () => {
        const paramsToNotStore = ['paramA', 'paramB', 'paramC'];
        const testStorable = new Storable(...paramsToNotStore);
        paramsToNotStore.forEach(param => testStorable[param] = true);
        const storable = testStorable.getStorable();
        const data = testStorable.getData();
        it('Should be an instance of Storable', () => {
            expect(testStorable).to.be.a.instanceof(Storable);
        });
        describe('Get Storable', () => {
            it('Should have a getStorable method', () => {
                expect(testStorable).to.have.property('getStorable');
                expect(typeof(testStorable.getStorable)).to.equal('function');
            });
            it('Should return a firestore storable object including only necesary properties', () => {
                expect(storable).to.not.be.a.instanceof(Storable);
                expect(storable).to.not.have.property('dontStore');
                paramsToNotStore.forEach(param => {
                    expect(storable).to.not.have.property(param);
                });
            });
        });
        describe('Get Data', () => {
            it('Should have a getData method', () => {
                expect(testStorable).to.have.property('getData');
                expect(typeof(testStorable.getData)).to.equal('function');
            });
            it('Should return a object including only necesary properties', () => {
                expect(data).to.not.be.a.instanceof(Storable);
                expect(data).to.not.have.property('dontStore');
                paramsToNotStore.forEach(param => {
                    expect(data).to.have.property(param);
                });
            });
        });
    });
});