const staff=require('../models').Staff;
const student=require('../models').Student;
const Sequelize=require('sequelize');
async function login(body){
    const {username,password}=body;
    if(username==="varavinth321@gmail.com" && password==="12345")
        return "Success";
    else
        return "Invalid Username or Password";
}
async function addstudent(body){
    const {name,rollno,std,staffid}=body;
    var result=await student.findAll({raw:true,where:{name:name,rollNo:rollno,standard:std,StaffId:staffid}});
    if(result.length==0){
        const ans=await student.create({name:name,rollNo:rollno,standard:std,StaffId:staffid})
        return "success";
    }
    else
        return "Student Data Already Exists";
}
async function addstaff(body){
    const {name,mobileno,email}=body;
    const result=await staff.findAll({where:{name:name,mobileNo:mobileno,email:email}});
    if(result.length==0){
        const ans=await staff.create({name:name,mobileNo:mobileno,email:email});
        return "success";
    }
    else{
        return "Staff Data Already Exists";
    }
}
async function students(){
    const ans=await student.findAll({order:[['id','ASC']]});
    return ans;
}
async function staffs(){
    const ans=await staff.findAll({
        attributes: { 
            include: [[Sequelize.fn("COUNT", Sequelize.col("Students")), "studentCount"]] 
        },
        include: [{
            model: student, attributes: []
        }],
        group: ['Staff.id'],
        order:[['id','ASC']]
      });
  return ans;
}
async function editstudent_edit(body){
    const {name,rollno,std,staffid,id}=body;
    const result=await student.update({name:name,rollNo:rollno,standard:std,StaffId:staffid},{where:{id:id}});
    return "Student Data Updated";
}
async function editstudent_delete(body){
   const {id}=body;
   const result= await student.destroy({where:{id:id}});
   return "Student Data removed"; 
}
async function editstaff_edit(body){
    const {name,mobileno,email,id}=body;
    const result=await staff.update({name:name,mobileNo:mobileno,email:email},{where:{id:id}});
    return "Staff Data Updated";
}
async function editstaff_delete(body){
    const {id}=body;
    const result= await staff.destroy({where:{id:id}});
    return "Staff Data removed"; 
}
async function getStudents(body){
    const {id}=body;
    const result=await staff.findOne({where:{id:id},include:[student]});
    return result;
}
module.exports={students,staffs,login,addstudent,addstaff,editstudent_edit,editstudent_delete,editstaff_edit,editstaff_delete,getStudents};