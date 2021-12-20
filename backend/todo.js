const {Schema, model} = require('mongoose');

const todoSchema = new Schema({
    title: String,
    isCompleted: Boolean
})

//model
const Todo = model('Todo', todoSchema)

module.exports = Todo