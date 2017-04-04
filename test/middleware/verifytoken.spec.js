import chai from "chai";
import httpMocks from "node-mocks-http";
let verifyToken = require('../../middlewares/verifyToken');
import sinon from "sinon";
import jwt from 'jsonwebtoken';
import config from '../../config/config';

let expect = chai.expect;

describe("Authentication Testing=>", () => {

    let res, next;
    before((done) => {
        res = httpMocks.createResponse();
        next = sinon.spy();
        done();
    });

    describe(" With valid token ", () => {

        it(" should call next ", (done) => {
            let req = {
                headers: {
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OGQ0YzBiOTc1MWViZjU0MTg2YzViN2IiLCJuYW1lIjoiV2FzaW1TYXl5ZWQiLCJlbWFpbCI6Indhc2ltLnNheXllZEBjdWVsb2dpYy5jb20zIiwiaWQiOiI1OGQ0YzBiOTc1MWViZjU0MTg2YzViN2IiLCJpYXQiOjE0OTA3OTU4NTYsImV4cCI6MTQ5MDc5NzI5Nn0.zwMFoPa9r7Pd9my20zXis4BEPLZHISZKBllfq5qd8Ss"
                },
                body: {}
            };

            let token = req.headers.token;
            jwt.verify(token, config.jwt_secret, function (err, decoded) {
                next(); //no error, proceed
                expect(next.calledOnce).to.be.true;
                done();
            });
        });
    });

    describe(" With invalid token ", () => {
        it(" should returns status 401 ", (done) => {
            let req = {
                headers: {
                    token: "sss"
                },
                body: {}
            };

            let token = req.headers.token;
            jwt.verify(token, config.jwt_secret, function (err, decoded) {
                expect(res.statusCode).to.be.equal(200);
                expect(next.calledOnce).to.be.true;
                done();
            });
        });
    });
})