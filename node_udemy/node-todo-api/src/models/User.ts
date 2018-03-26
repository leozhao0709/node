import mongoose from '../db/mongoose';
import * as validator from 'validator';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { environment } from '../environment/environment';

export interface IUser extends mongoose.Document {
    _id: string;
    email: string;
    password: string;
    tokens: { access: string, token: string }[];
    generateAuthToken: () => Promise<string>;
    removeToken: (token: string) => Promise<void>;
}

export interface IUserModel extends mongoose.Model<IUser> {
    findByToken: (token: string) => Promise<IUser>;
    findByCrediential: (email: string, password: string) => Promise<IUser>;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{Value} is not a valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.pre('save', function (this: IUser, next: mongoose.HookNextFunction) {
    const user: IUser = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10)
            .then(salt => {
                return bcrypt.hash(user.password, salt);
            })
            .then(hash => {
                user.password = hash;
                next();
            })
            .catch(err => {
                return Promise.reject(err);
            });
    } else {
        next();
    }
});

userSchema.methods.toJSON = function () {
    const user: IUser = this;
    const { _id, email } = user;

    return { _id, email };
};

userSchema.methods.removeToken = function (token: string) {
    const user: IUser = this;
    return user.update({
        $pull: {
            tokens: { token }
        }
    });
};

userSchema.methods.generateAuthToken = function () {
    const user: IUser = this;
    const access = 'auth';
    const token = jwt.sign({ _id: user._id, access }, environment.AUTH_SECRET);
    user.tokens = [...user.tokens, { access, token }];

    return user.save().then(() => {
        return token;
    }).catch(err => {
        return Promise.reject(err);
    });
};

userSchema.statics.findByToken = function (token: string) {
    const user: IUserModel = this;
    let decode;
    try {
        decode = jwt.verify(token, environment.AUTH_SECRET);
    } catch (error) {
        return Promise.reject(error);
    }

    const { _id, access } = decode;

    return user.findOne({
        _id,
        'tokens.token': token,
        'tokens.access': access
    });
};

userSchema.statics.findByCrediential = function (email: string, password: string) {
    const user: IUserModel = this;
    const notFoundMessage = { error: 'no user find' };
    return user.findOne({ email }).then(doc => {
        if (!doc) {
            return Promise.reject(notFoundMessage);
        }

        return bcrypt.compare(password, doc.password)
            .then(result => {
                if (result) {
                    return Promise.resolve(doc);
                }
                return Promise.reject(notFoundMessage);
            }).catch(err => {
                return Promise.reject(err);
            });
    }).catch(err => {
        return Promise.reject(err);
    });
};

export const User = mongoose.model<IUser, IUserModel>('User', userSchema);