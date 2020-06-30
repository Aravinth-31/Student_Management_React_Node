import React from 'react';
import './App.css';
import Admin from './Components/Admin';
import Students from './Components/Students';
import Staff from './Components/Staff';
import {Route,HashRouter} from "react-router-dom";
import Login from './Components/Login';
import EditStudent from './Components/EditStudent';
import EditStaff from './Components/EditStaff';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: 0
    }
  }
  componentDidMount = () => {
    var logged = JSON.parse(localStorage.getItem('loggedIn')) | 0;
    this.setState({ loggedin: logged });
    console.log(this.state.loggedin);
  }
  logOut=(e)=>{
    e.preventDefault();
    localStorage.setItem('loggedIn',0);
    this.setState({loggedin:0});
    window.location.reload();
  }
  render() {
    return (
      <div className="wrapper">
        <div className="top_navbar">
          <div className="logo">
            <a href="localhost:3001">Student Details</a>
          </div>
        </div>
        <div className="main_body">
          <div className="sidebar_menu">
            <div className="inner__sidebar_menu">
              <ul>
                <li>
                  <a href="http://localhost:3001/#/" style={{ color: 'white' }}>
                    <span className="icon">
                      <i className="fas fa-user"></i></span>
                    <span className="list">Admin</span>
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3001/#/students" style={{ color: 'white' }} onClick={this.students}>
                    <span className="icon"><i className="fas fa-child "></i></span>
                    <span className="list">Students</span>
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3001/#/staff" style={{ color: 'white' }}>
                    <span className="icon"><i className="fas fa-graduation-cap"></i></span>
                    <span className="list">Staff</span>
                  </a>
                </li>
                {this.state.loggedin ?
                  <li>
                    <a href="localhost:3001" style={{ color: 'white' }} onClick={this.logOut}>
                      <span className="icon"><i className="fa fa-sign-out"></i></span>
                      <span className="list">Log Out</span>
                    </a>
                  </li> : null
                }
              </ul>
            </div>
          </div>
        </div>
        <br /><br /><br />
        <HashRouter>
          <Route exact path="/" component={()=><Admin></Admin>}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/students" component={Students}></Route>
          <Route path="/staff" component={Staff}></Route>
          <Route path="/editstudent/:student" component={EditStudent}></Route>
          <Route path="/editstaff/:staff" component={EditStaff}></Route>
        </HashRouter>
      </div>
    );
  }
}

export default App;
