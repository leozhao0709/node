import mongoose from '../db/mongoose';

export interface ITodo extends mongoose.Document {
    text: string;
    completed?: boolean;
    completedAt?: number | null;
    _creator: mongoose.Schema.Types.ObjectId;
}

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

export const Todo = mongoose.model<ITodo>('Todo', todoSchema);
