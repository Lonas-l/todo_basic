const {Schema, model} = require('mongoose')

const TodoSchema = new Schema({
    id: { type: Number },
    title: { type: String },
    description: { type: String },
    status: { type: String },
    due_date: { type: String },
});

const User = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    todos: [TodoSchema],
})

module.exports = model('User', User)
