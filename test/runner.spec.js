process.env.NODE_ENV = 'test';

var base = process.env.PWD;
var config = require(base + '/config/config'),
    mongoose = require('mongoose'),
    userController = require(base + '/controllers/UserController'),
    userModel = require(base + '/models/user'),
    should = require('should');

describe("USER API", function () {    
    before(function (done) {
        mongoose.connect("mongodb://" + config.MONGODB_HOST + "/" + config.MONGODB_TEST_COLLECTION_NAME, function () {            
            console.log("Dummy database -------------------------------------------------------------------------- ")
            done();
        });

        dummyUser = new userModel({
            "name": "test",
            "email": "test@gmail.com",
            "password": "test@123"
        });

        dummyUser.save(function (err, user) {
            if (err) {
                console.log(err)
            }
            id = user._id;
        })
    })
})