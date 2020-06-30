import React from 'react';
import Axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class EditStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student_name: '',
            student_rollno: '',
            student_standard: 10,
            student_staffid: -1,
            student_id: -1,
            staff: []
        }
    }
    componentDidMount = () => {
        const obj = JSON.parse(this.props.match.params.student);
        this.setState({ student_name: obj.name, student_rollno: obj.rollNo, student_standard: obj.standard, student_staffid: obj.StaffId, student_id: obj.id });
        Axios.post("http://localhost:3000/staff")
            .then(res => {
                console.log(res.data)
                this.setState({ staff: res.data });
            })
            .catch(err => { console.log(err) });
    }
    onchangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    save = (e) => {
        e.preventDefault();
        var obj = {
            name: this.state.student_name,
            rollno: this.state.student_rollno,
            std: this.state.student_standard,
            staffid: this.state.student_staffid,
            id: this.state.student_id
        }
        Axios.post("http://localhost:3000/editstudent-edit", obj)
            .then(async (res) => {
                toast.success('Student Data Updated', { position: toast.POSITION.TOP_CENTER });
                setTimeout(() => { window.location.replace("http://localhost:3001/#/students") }, 1000);
            })
            .catch(err => { console.log(err) });
    }
    delete = (e) => {
        e.preventDefault();
        var obj = {
            id: this.state.student_id
        }
        Axios.post("http://localhost:3000/editstudent-delete", obj)
            .then(res => {
                toast.success(res.data, { position: toast.POSITION.TOP_CENTER });
                setTimeout(()=>{window.location.replace("http://localhost:3001/#/students")},1000);
            })
            .catch(err => { console.log(err) });
    }
    render() {
        return (
            <div className="row">
                <ToastContainer transition={Zoom} autoClose={2000}></ToastContainer>
                <div className="col-lg-2 col-md-2 col-sm-2"></div>
                <div className="col-lg-10 col-md-10 col-sm-10">
                    <div className="login">
                        <div className="login-triangle"></div>
                        <h2 className="login-header">EDIT STUDENT</h2>
                        <form className="login-container">
                            <p><input type="text" placeholder="Name" name="student_name" value={this.state.student_name} onChange={this.onchangeHandler} required /></p>
                            <p><input type="text" placeholder="Roll No" name="student_rollno" value={this.state.student_rollno} onChange={this.onchangeHandler} required /></p>
                            <p><select name="student_standard" value={this.state.student_standard} onChange={this.onchangeHandler} required>
                                <option>Select-a-standard</option>
                                <option value={10} >10th</option>
                                <option value={11}>11th</option>
                                <option value={12}>12th</option>
                            </select></p>
                            <p><select id="rec_mode" name="student_staffid" value={this.state.student_staffid} onChange={this.onchangeHandler} required>
                                <option>Select-a-staff</option>
                                {this.state.staff.map(sta =>
                                    <option value={sta.id} key={sta.id.toString()}>{sta.name}</option>
                                )}
                            </select></p>
                            <p><input type="submit" value="SAVE" onClick={this.save} /></p>
                            <p><input type="submit" value="DELETE" onClick={this.delete} /></p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}