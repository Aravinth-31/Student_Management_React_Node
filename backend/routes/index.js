var express = require('express');
var router = express.Router();
const Controller=require('../controllers/Controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login',async(req,res)=>{
  try{
    const result=await Controller.login(req.body);
    res.json(result);
  }
  catch(err){
    console.log(err);
    res.json(err);
  }
})

router.post('/addstudent',async function(req,res){
  try{
    const result=await Controller.addstudent(req.body);
    res.json(result);
  }
  catch(err){
    console.log(err);
    res.json(err);
  }
});

router.post('/addstaff',async function(req,res){
  try{
    const result = await Controller.addstaff(req.body);
    return res.json(result);
  }
  catch(err){
    console.log(err);
    return res.json(err);
  }
})

router.post("/students",async(req,res)=>{
  try{
    const result=await Controller.students();
    res.json(result);
  }
  catch(err){
    console.log(err);
    res.json(err);
  }
})

router.post("/staff",async(req,res)=>{
  try{
    const result=await Controller.staffs();
    res.json(result);
  }
  catch(err){
    console.log(err);
    res.json(err);
  }
})

router.post("/editstudent-edit",async function(req,res){
  try{
    const ans=await Controller.editstudent_edit(req.body);
    res.json(ans);
  }
  catch(err){
    console.log(err);
    res.json(err);
  }
})

router.post("/editstudent-delete",async function(req,res){
  try{
    const ans=await Controller.editstudent_delete(req.body);
    res.json(ans);
  }
  catch(err){
    console.log(err);
    res.json(err);
  }
})

router.post("/editstaff-edit",async function(req,res){
  try{
    const ans=await Controller.editstaff_edit(req.body);
    res.json(ans);
  }
  catch(err){
    console.log(err);
    res.json(err);
  }
})

router.post("/editstaff-delete",async function(req,res){
  try{
    const ans=await Controller.editstaff_delete(req.body);
    res.json(ans);
  }
  catch(err){
    console.log(err);
    res.json(err);
  }
})

router.post("/getStudents",async function(req,res){
  try{
    const ans=await Controller.getStudents(req.body);
    res.json(ans.Students);
  }
  catch(err){
    console.log(err);
    res.json(err);
  }
})

module.exports = router;
