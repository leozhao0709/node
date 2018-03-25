import mongoose from '../db/mongoose';
import * as validator from 'validator';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { environment } from '../environment/environment';

export interface IUser extends mongoose.Document {
    _id: string;
    email: string;
    password: string;
    tokens: [{ _id: string, access: string, token: string }];
    generateAuthToken: () => Promise<string>;
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
    if (this.isModified('password')) {
        bcrypt.genSalt(10)
            .then(salt => {
                return bcrypt.hash(this.password, salt);
            })
            .then(hash => {
                this.password = hash;
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
    const { _id, email } = this;

    return { _id, email };
};

userSchema.methods.generateAuthToken = function () {
    const access = 'auth';
    const token = jwt.sign({ _id: this._id, access }, environment.AUTH_SECRET);
    this.tokens = [...this.tokens, { access, token }];

    return this.save().then(() => {
        return token;
    }).catch(err => {
        return Promise.reject(err);
    });
};

userSchema.statics.findByToken = function (token: string) {
    let decode;
    try {
        decode = jwt.verify(token, environment.AUTH_SECRET);
    } catch (error) {
        return Promise.reject(error);
    }

    const { _id, access } = decode as any;

    return this.findOne({
        _id,
        'tokens.token': token,
        'tokens.access': access
    });
};

userSchema.statics.findByCrediential = function (email: string, password: string) {
    const notFoundMessage = { error: 'no user find' };
    return User.findOne({ email }).then(user => {
        if (!user) {
            return Promise.reject(notFoundMessage);
        }

        return bcrypt.compare(password, user.password)
            .then(result => {
                if (result) {
                    return Promise.resolve(user);
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