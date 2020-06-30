import React from 'react';
import Axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class EditStaff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            staff_name: '',
            staff_mobileno: '',
            staff_email: '',
            staff_id: -1
        }
    }
    componentDidMount = () => {
        // console.log(this.props.match.params.staff);
        const obj = JSON.parse(this.props.match.params.staff);
        this.setState({ staff_name: obj.name, staff_mobileno: obj.mobileNo, staff_email: obj.email, staff_id: obj.id });
        console.log(JSON.stringify(this.state));
    }
    onchangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    save = (e) => {
        e.preventDefault();
        console.log(this.props.match.params.student);
        var obj = {
            name: this.state.staff_name,
            mobileno: this.state.staff_mobileno,
            email: this.state.staff_email,
            id: this.state.staff_id
        }
        Axios.post("http://localhost:3000/editstaff-edit", obj)
            .then(res => {
                toast.success(res.data,{position:toast.POSITION.TOP_CENTER});
                setTimeout(()=>{window.location.replace("http://localhost:3001/#/staff")},1000);
            })
            .catch(err => { console.log(err) });
    }
    delete = (e) => {
        e.preventDefault();
        var obj = {
            id: this.state.staff_id
        }
        Axios.post("http://localhost:3000/editstaff-delete", obj)
            .then(res => {
                toast.success(res.data,{position:toast.POSITION.TOP_CENTER});
                setTimeout(()=>{window.location.replace("http://localhost:3001/#/staff")},1000);
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
                        <h2 className="login-header">EDIT STAFF</h2>
                        <form className="login-container">
                            <p><input type="text" placeholder="Name" name="staff_name" value={this.state.staff_name} onChange={this.onchangeHandler} required /></p>
                            <p><input type="text" placeholder="Mobile No" name="staff_mobileno" value={this.state.staff_mobileno} onChange={this.onchangeHandler} required /></p>
                            <p><input type="email" placeholder="Email" name="staff_email" value={this.state.staff_email} onChange={this.onchangeHandler} required /></p>
                            <p><input type="submit" value="SAVE" onClick={this.save}/></p>
                            <p><input type="submit" value="DELETE" onClick={this.delete} /></p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
