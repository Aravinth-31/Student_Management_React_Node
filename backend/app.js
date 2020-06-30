// const Staff=require('./models').Staff;
// const Student=require('./models').Student;
// const Sequelize=require('sequelize');

// Staff.findAll({raw:true,
//   attributes: { 
//       include: [[Sequelize.fn("COUNT", Sequelize.col("Students")), "studentCount"]] 
//   },
//   include: [{
//       model: Student, attributes: []
//   }],
//   group: ['Staff.id'],
//   order:[['id','ASC']]
// })
// .then(res=>{
//   res.map(obj=>{
//   console.log(obj.studentCount);
//   })
// })
// .catch(err=>console.log(err));


var express = require('express');
var indexRouter = require('./routes/index');

var app = express();

//Allow cross-origin Resource Sharing
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
});

app.use(express.json());
app.use('/', indexRouter);

app.listen(3000);