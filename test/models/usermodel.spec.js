import sinon from 'sinon';
import chai from 'chai';
const expect = chai.expect;

import mongoose from 'mongoose';
require('sinon-mongoose');

//Importing our user model for our unit testing.
import User from '../../models/user';

let assert = chai.assert;

describe("User Schema", () => {
    let users;
    before(() => {
        users = new User();
    })    

    it("should have property email", (done) => {
        users.validate((err) => {
            expect(err.errors).to.have.property("email");
            done();
        })
    })

    it("should have property password", (done) => {
        users.validate((err) => {
            expect(err.errors).to.have.property("password");
            done();
        })
    })    
})

describe("Get all users", () => {
    // Test will pass if we get all users
    it("should return all users", done => {
        const UserMock = sinon.mock(User);
        const expectedResult = {
            status: true, users: [{
                "_id": "58d4b8db689f0f3ff1faed39",
                "name": "WasimSayyed",
                "email": "wasim.sayyed@cuelogic.com2",
                "id": "58d4b8db689f0f3ff1faed39"
            }]
        };
        UserMock.expects('find').yields(null, expectedResult);
        User.find((err, result) => {
            UserMock.verify();
            UserMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
});