const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Todo=require('../Models/TodoMDL');

var autoIncrement = require("mongodb-autoincrement");
var db=mongoose.connection;

  router.post('/CreateTodo',(req,res,next)=>{

    autoIncrement.getNextSequence(db, "todos", function (err, autoIndex) {
    var dateTime = require('node-datetime');
  var dt = dateTime.create();
  dt.format('m/d/Y H:M:S');

  var date_string=dt.now().toString();
    const todo=new Todo({
      _id: new mongoose.Types.ObjectId(),
      name:req.body.name,

      reg_date:date_string,

      todo_id:autoIndex
    });
    todo.save().then( todos=>{

        return res.status(200).json({
          message:"Created todo successfully",
          todo:todos
      });
  }
  //return res.status(200).json({message:"Created user successfully",state:State});

    ).catch(err=>
      { return res.status(404).json({"message":err.message});
  });
  });


  });


  router.get('/TodoListWithStatus',function(req,res){
  Todo.find({entry_status:1}).exec().then(todo =>{
    console.log(todo);

    return res.status(200).json({
      "TodoList": todo
    });


  }).catch(err=>{
  res.status(404).json({"error":err.message});
  });

  });




  router.post('/MakeAsComplete',(req,res,next)=>{
    Todo.find({todo_id:req.body.todo_id})
      .exec()
      .then(TodoList => {

        if (TodoList.length >= 1)
        {

  Todo.update({todo_id:req.body.todo_id},{$set:{status:0}}).exec().then(Todo_updated=>{
    return res.status(200).json({"message":"successfully Updated",
  "Todo":Todo_updated
  });
  }).catch(err=>{
    return res.status(404).json({
      "message": err.message
  });
  });
  }
  else {
    return res.status(208).json({
      message: "ID not found"
  });
  }
  }).catch(err=>{
  res.status(404).json({"message":err.message});
  });
  });

    router.post('/todoRemove',(req,res,next)=>{
      Todo.find({todo_id:req.body.todo_id})
        .exec()
        .then(TodoList => {

          if (TodoList.length >= 1)
          {

    Todo.update({todo_id:req.body.todo_id},{$set:{entry_status:0}}).exec().then(Todo_updated=>{
      return res.status(200).json({"message":"successfully Updated",
    "Todo":Todo_updated
    });
    }).catch(err=>{
      return res.status(404).json({
        "message": err.message
    });
    });
    }
    else {
      return res.status(208).json({
        message: "ID not found"
    });
    }
    }).catch(err=>{
    res.status(404).json({"message":err.message});
    });
    });



    router.post('/ChangeName',(req,res,next)=>{
      Todo.find({todo_id:req.body.todo_id})
        .exec()
        .then(TodoList => {

          if (TodoList.length >= 1)
          {

    Todo.update({todo_id:req.body.todo_id},{$set:{name:req.body.name}}).exec().then(Todo_updated=>{
      return res.status(200).json({"message":"successfully Updated",
    "Todo":Todo_updated
    });
    }).catch(err=>{
      return res.status(404).json({
        "message": err.message
    });
    });
    }
    else {
      return res.status(208).json({
        message: "ID not found"
    });
    }
    }).catch(err=>{
    res.status(404).json({"message":err.message});
    });
    });
  module.exports = router;
