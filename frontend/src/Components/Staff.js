import React from "react";
import './styles/student.css';
import Axios from 'axios';

class Staff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            staffs: [],
            loggedin: 0
        }
    }
    componentDidMount = () => {
        var logged = localStorage.getItem("loggedIn") | 0;
        this.setState({ loggedin: logged });
        Axios.post("http://localhost:3000/staff")
            .then(res => {
                console.log(res.data[0].Students);
                this.setState({ staffs: res.data });
            })
            .catch(err => { console.log(err) });
    }
    edit = (e) => {
        var obj = JSON.parse(e.target.id);
        window.location.replace("http://localhost:3001/#/editstaff/" + JSON.stringify(obj));
    }
    display = (e) => {
        var div = document.getElementById(e.toString());
        var body = { id: e };
        Axios.post("http://localhost:3000/getStudents", body)
            .then(students => {
                div.innerHTML = "<hr></hr><h4><span style='margin-left:10%;color: #2196f3'><b>Students :</b></span></h4>";
                if (students.data.length > 0) {
                    students.data.forEach(student => {
                        div.innerHTML += "<div><h4><span style='color:black;margin-left:15%'><i>" + student.name + " - " + student.rollNo + "</i></span></h4></div>";
                    });
                }
                else {
                    div.innerHTML += "<div><h4><span style='margin-left:15%'><i>Students Not Available</i></span></h4></div>";
                }
            })
            .catch(err => console.log(err));
        if (div.style.display === 'none')
            div.style.display = 'block';
        else
            div.style.display = 'none';
    }
    render() {
        if (this.state.staffs.length === 0) {
            return (
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4"></div>
                    <div className="col-lg-8 col-md-8 col-sm-8" style={{ alignContent: "center" }}>
                        <h1>No Staff Available</h1>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-2"></div>
                    <div className="col-lg-10 col-md-10 col-sm-10">
                        {this.state.staffs.map((staff) =>
                            <div key={staff.id.toString()}>
                                <div className="card">
                                    <div className="card-horizontal">
                                        <div className="card-body" >
                                            <div className="row" style={{ cursor: 'pointer' }} onClick={(e) => this.display(staff.id)}>
                                                <div className="col-lg-2 col-md-2">
                                                    <h4>Name:<br /></h4><h3>{staff.name}</h3>
                                                </div>
                                                <div className="col-lg-1 col-md-1">
                                                    <h4>ID:<br /></h4><h3>{staff.id}</h3>
                                                </div>
                                                <div className="col-lg-2 col-md-2">
                                                    <h4>Mobile No:<br /></h4><h3>{staff.mobileNo}</h3>
                                                </div>
                                                <div className="col-lg-3 col-md-3">
                                                    <h4>Email:<br /></h4><h3>{staff.email}</h3>
                                                </div>
                                                <div className="col-lg-3 col-md-3">
                                                    <h4>No Of Students:<br /></h4><h3>{staff.studentCount}</h3>
                                                </div>
                                                {this.state.loggedin ?
                                                    <div className="col-lg-1 col-md-1">
                                                        <button className="ripple" id={JSON.stringify(staff)} onClick={this.edit}>Edit</button>
                                                    </div> : null}
                                            </div>
                                            <div id={staff.id.toString()} style={{ display: 'none' }}>
                                                {/* <hr></hr>
                                                <h4 style={{ marginLeft: '5%', color: '#2196f3' }}><b>Students :</b></h4>
                                                {staff.Students.length ?
                                                    <div>
                                                        {staff.Students.map((student) =>
                                                            <div className="row" key={student.id.toString()}>
                                                                <div className="col-lg-2 col-md-2"></div>
                                                                <div className="col-lg-3 col-md-3">
                                                                    <h4 style={{ color: 'black' }}><i>{student.name}</i></h4>
                                                                </div>
                                                                <div className="col-lg-7 col-md-7">
                                                                    <h4 style={{ color: 'black' }}><i>{student.rollNo}</i></h4>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div> :
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-lg-2 col-md-2"></div>
                                                            <div className="col-lg-4 col-md-4">
                                                                <h4 style={{ fontWeight: 'bold', color: 'black' }}><i>Students Not Available</i></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                } */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
    }
}

export default Staff;