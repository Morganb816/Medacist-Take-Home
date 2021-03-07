const { authorized, validateSchema } = require('../middleware');
const TestSchema = require('./testSchema.json');

const expect = require('chai').expect;

describe('Back End Middleware', () => {
    describe('Validate Schema', () => {
        const testObject = {
            propertyA: 'Good property',
            propertyB: 42,
            propertyC: false
        };
        const validator = validateSchema(TestSchema);
        it('Should validate a object against a provided schema', () => {
            let called = false;
            let error = false;
            validator({body: testObject}, {
                status: () => ({ send: () => called = false})
            }, () => {
                called = true;
            });
            expect(called).to.equal(true);
            expect(error).to.equal(false);
            validator({body: {yes: true}}, {
                status: () => ({ send: () => {
                    error = true;
                    called = false;
                }})
            }, () => {
                called = true;
            });
            expect(called).to.equal(false);
            expect(error).to.equal(true);
        });
    });
});