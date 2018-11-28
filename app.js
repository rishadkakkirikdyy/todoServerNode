const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
var dateTime = require('node-datetime');


const TodoPath = require("./Server/Routes/Todo");

mongoose.connect(
"mongodb://localhost/todo_db"
);
mongoose.Promise = global.Promise;
app.use(bodyParser.json());





app.use("/todo", TodoPath);

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {




  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use((req,res,next)=>{
  const error = new Error('Not Found');
  error.status(404);
  next(error);

});
app.use((error,req,res,next)=>{
  res.status(error.status || 500);
  res.json({"message":error.message
  }
);
});



app.listen(process.env.port || 5000,function(){
	console.log('NOW LISTENING OUR TODO CAR WASH ON 5000');
});
