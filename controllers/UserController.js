import UserModel from "../models/user";
import jwt from 'jsonwebtoken';
import config from '../config/config';

/** 
 *  User class with methods for user management
 */
export class UserController {

    /**
     * constructor to initialize the properties
     */
    constructor(userModel) {

        this.userModel = userModel;
    }

    /**
     * Method to login user and return user details object
     */
    postLogin = (req, res, next) => {

        return new Promise((resolve, reject) => {
            let data = {
                email: req.body.email,
                password: req.body.password
            };

            this.userModel
                .findOne(data)
                .select('-password -__v')
                .then((user) => {
                    if (user) {
                        let token = jwt.sign(user.toObject(), config.jwt_secret, {
                            expiresIn: 1440 // expires in 1 hour
                        });
                        resolve(user);
                        res.json({ status: true, token, user, "message": "Authentication successful" });
                        next();
                    } else {
                        reject("Invalid credentials");
                        reject(res.json({ status: false, error: "Invalid credentials" }));
                        next();
                    }
                })
                .catch((error) => {
                    next(error);
                });
        });

    }


    /**
     * Method to create new user if no other user with same email exist
     */
    postSignup = (req, res, next) => {
        return new Promise((resolve, reject) => {
            this.userModel
                .findOne({ email: req.body.email })
                .then((user) => {
                    let returnObj;

                    if (user) {
                        returnObj = { status: false, error: "User already exists" };
                        resolve(returnObj);
                        res.json(returnObj);
                        next();
                    } else {
                        const newUser = new this.userModel({
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.password
                        });
                        newUser.save()
                            .then((user) => {
                                returnObj = { status: true, user };
                                resolve(returnObj);
                                res.json({ status: true, user });
                                next();
                            })
                            .catch((error) => {
                                next(error);
                            });
                    }
                })
                .catch((error) => {
                    next(error);
                });
        });
    }

    /**
     * Method to find user by id
     */
    findUserById = (req, res, next) => {
        let id = req.params.id;
        return new Promise((resolve, reject) => {
            this.userModel
                .findOne({
                    _id: id
                })
                .select('-password -__v')
                .then((user) => {
                    if (user) {
                        resolve(user);
                        res.json({ status: true, user, "message": "User found" });
                        next();
                    } else {
                        reject("No User not found!");
                        reject(res.json({ status: false, error: "No User not found!" }));
                        next();
                    }
                })
                .catch((error) => {
                    next(error);
                });
        });

    }
}

const userController = new UserController(UserModel);
export default userController;