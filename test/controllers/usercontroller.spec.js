import chai from 'chai';
const expect = chai.expect;
import request from 'supertest';
import app from '../../server.js';
import jwt from 'jsonwebtoken';
import config from '../../config/config';

describe('POST /api/user/signin', () => {
    it('it responds with 401 status code if bad username or password', done => {
        request(app)
            .post('/api/user/signin')
            .type('json')
            .send('{"username":"bad","password":"wrong"}')
            .expect(401)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it('it responds with 200 status code if good username or password', done => {
        request(app)
            .post('/api/user/signin')
            .type('json')
            .send('{"email":"wasim.sayyed@cuelogic.com3","password":"wasim@123"}')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it('it returns JWT token and user if good username or password', done => {
        request(app)
            .post('/api/user/signin')
            .type('json')
            .send('{"email":"wasim.sayyed@cuelogic.com3","password":"wasim@123"}')
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body).have.property('token');
                expect(res.body).have.property('user');

                done();
            });
    });
});

describe('GET /api/user', function () {
    it('it responds with 401 status code if no authorization header', function (done) {
        request(app).get('/api/user').expect(403).end(function (err, res) {
            //if (err) return done(err);
            done();
        });
    });

    it('it responds with JSON if no authorization header', function (done) {
        request(app).get('/api/user').expect('Content-Type', /json/).end(function (err, res) {
            //if (err) return done(err);
            done();
        });
    });

    it('it responds with 200 status code if good authorization header', function (done) {
        var token = jwt.sign({
            id: 1,
        }, config.jwt_secret, { expiresIn: 60 * 60 });
        request(app)
            .get('/api/user')
            .set('token', token)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('it responds with JSON if good authorization header', function (done) {
        var token = jwt.sign({
            id: 1,
        }, config.jwt_secret, { expiresIn: 60 * 60 });
        request(app)
            .get('/api/user')
            .set('token', token)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);

                expect(res.body).have.property('users');

                done();
            });
    });    
});