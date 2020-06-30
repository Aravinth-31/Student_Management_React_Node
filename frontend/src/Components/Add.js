import React from 'react';
import './styles/add.css';
import Axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Add extends React.Component {
    constructor(props){
        super(props);
        this.state={
            student_name:'',
            student_rollno:'',
            student_standard:10,
            student_staffid:1,
            staff_name:'',
            staff_mobileno:'',
            staff_email:'',
            staffs:[]
        }
    }
    componentDidMount=()=>{
        Axios.post("http://localhost:3000/staff")
        .then(res=>{
          this.setState({staffs:res.data});
        })
        .catch(err=>{console.log(err)});
    }
    onchangeHandler=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    addStudent=(e)=>{
        e.preventDefault();
        const obj={
            name:this.state.student_name,
            rollno:this.state.student_rollno,
            std:this.state.student_standard,
            staffid:this.state.student_staffid
        }
        Axios.post("http://localhost:3000/addstudent",obj)
        .then(res=>{
            if(res.data==='success')
                toast.success("Student Data Added",{position:toast.POSITION.TOP_CENTER});
            else
                toast.success("Student Data Already Exists",{position:toast.POSITION.TOP_CENTER});
        })
        .catch(err=>{console.log(err)});
        setTimeout(()=>{window.location.reload()},1000);
    }
    addStaff=(e)=>{
        e.preventDefault();
        const obj={
            name:this.state.staff_name,
            mobileno:this.state.staff_mobileno,
            email:this.state.staff_email
        }
        Axios.post("http://localhost:3000/addstaff",obj)
        .then(res=>{
            if(res.data==='success')
                toast.success("Staff Data Added",{position:toast.POSITION.TOP_CENTER});
            else
                toast.success("Staff Data Already Exists",{position:toast.POSITION.TOP_CENTER});
        })
        .catch(err=>{console.log(err)});
        setTimeout(()=>{window.location.reload()},1000);
    }
    render() {
        return (
            <div>
                <ToastContainer transition={Zoom} autoClose={2000}></ToastContainer>
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-2"></div>
                    <div className="col-lg-10 col-md-10 col-sm-10">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="login">
                                    <div className="login-triangle"></div>
                                    <h2 className="login-header">ADD STUDENT</h2>
                                    <form className="login-container" onSubmit={(e)=>this.addStudent(e)}>
                                        <p><input type="text" placeholder="Name" name="student_name" value={this.state.student_name} onChange={this.onchangeHandler} required/></p>
                                        <p><input type="text" placeholder="Roll No" name="student_rollno" value={this.state.student_rollno} onChange={this.onchangeHandler} required/></p>
                                        <p><select name="student_standard" value={this.state.student_standard} onChange={this.onchangeHandler} required>
                                            <option>Select-a-standard</option>
                                            <option value={10} >10th</option>
                                            <option value={11}>11th</option>
                                            <option value={12}>12th</option>
                                        </select></p>
                                        <p><select id="rec_mode" name="student_staffid" value={this.state.student_staffid} onChange={this.onchangeHandler} required>
                                        <option>Select-a-staff</option>
                                        {this.state.staffs.map(sta=>
                                        <option value={sta.id} key={sta.id.toString()}>{sta.name}</option>
                                        )}
                                        </select></p>
                                        <p><input type="submit" value="ADD" /></p>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="login">
                                    <div className="login-triangle"></div>
                                    <h2 className="login-header">ADD STAFF</h2>
                                    <form className="login-container" onSubmit={(e)=>this.addStaff(e)}>
                                        <p><input type="text" placeholder="Name" name="staff_name" value={this.state.staff_name} onChange={this.onchangeHandler} required/></p>
                                        <p><input type="text" placeholder="Mobile No" name="staff_mobileno" value={this.state.staff_mobileno} onChange={this.onchangeHandler} required/></p>
                                        <p><input type="email" placeholder="Email" name="staff_email" onChange={this.onchangeHandler} value={this.state.staff_email} required/></p>
                                        <p><input type="submit" value="ADD" /></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}