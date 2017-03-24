// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';
// const Schema = mongoose.Schema;

// export default mongoose.model('User', new Schema({
//     name: { type: String },
//     email: { type: String, required: true },
//     password: { type: String, required: true },
// }));

import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    name: {
        type: String        
    },
    email: {
        type: String,        
        required: true
    },
    password: {
        type: String,
        required: true
    }

}, {
        toObject: {
            virtuals: true
        }, toJSON: {
            virtuals: true
        }
    });

UserSchema.pre('save', function (next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

export default mongoose.model('User', UserSchema);
