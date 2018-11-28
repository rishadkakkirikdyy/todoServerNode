const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    todo_id: { type: String, required: true },
    name: { type: String, required: true },
    reg_date:{ type: String },
    entry_status: { type: Number,default:1 },
    status: { type: Number,default:0 }





});
//unique:true
module.exports = mongoose.model('todos', todoSchema);
