import React from "react";
import './styles/student.css';
import Axios from 'axios';

class Students extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            loggedin: 0
        }
    }
    componentDidMount = () => {
        var logged = localStorage.getItem("loggedIn") | 0;
        this.setState({ loggedin: logged });
        Axios.post("http://localhost:3000/students")
            .then(res => {
                this.setState({ students: res.data });
            })
            .catch(err => { console.log(err) });
    }
    edit = (e) => {
        var obj = JSON.parse(e.target.id);
        window.location.replace("http://localhost:3001/#/editstudent/" + JSON.stringify(obj));
    }
    render() {
        if (this.state.students.length === 0) {
            return (
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4"></div>
                    <div className="col-lg-8 col-md-8 col-sm-8" style={{alignContent:"center"}}>
                        <h1>No Students Available</h1>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-2"></div>
                    <div className="col-lg-10 col-md-10 col-sm-10">
                        {this.state.students.map((student) =>
                            <div className="card" key={student.id.toString()}>
                                <div className="card-horizontal">
                                    <div className="card-body" >
                                        <div className="row">
                                            <div className="col-lg-3 col-md-3">
                                                <h4>Name:<br /></h4><h3>{student.name}</h3>
                                            </div>
                                            <div className="col-lg-2 col-md-2">
                                                <h4>Roll No:<br /></h4><h3>{student.rollNo}</h3>
                                            </div>
                                            <div className="col-lg-1 col-md-1">
                                                <h4>STD:<br /></h4><h3>{student.standard}<sup>th</sup></h3>
                                            </div>
                                            <div className="col-lg-4 col-md-4">
                                                <h4>Staff ID:<br /></h4><h3>{student.StaffId}</h3>
                                            </div>
                                            {this.state.loggedin ?
                                                <div className="col-lg-2 col-md-2">
                                                    <button className="ripple" id={JSON.stringify(student)} onClick={this.edit}>Edit</button>
                                                </div> : null
                                            }
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

export default Students;