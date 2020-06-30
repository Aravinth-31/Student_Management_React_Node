import React from 'react';
import './styles/form.css';
import axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    login = (event) => {
        event.preventDefault();
        const obj = {
            username: this.state.email,
            password: this.state.password
        }
        axios.post("http://localhost:3000/login", obj)
            .then(response => {
                if (response.data === "Success") {
                    localStorage.setItem('loggedIn', 1);
                    toast.success('Logged In Successfully',{position:toast.POSITION.TOP_CENTER});
                    setTimeout(()=>{window.location.replace("http://localhost:3001")},1000);
                }
                else
                    toast.error(response.data,{position:toast.POSITION.TOP_CENTER});
            })
            .catch(err => { console.log(err) });
    }
    render() {
        return (
            <div className="login">
                <ToastContainer transition={Zoom} autoClose={2000}></ToastContainer>
                <div className="login-triangle"></div>
                <h2 className="login-header">Log in</h2>
                <form className="login-container" onSubmit={(e) => this.login(e)}>
                    <p><input type="email" placeholder="Email" name='email' onChange={this.onChangeHandler} /></p>
                    <p><input type="password" placeholder="Password" name='password' onChange={this.onChangeHandler} /></p>
                    <p><input type="submit" value="Log in" /></p>
                </form>
            </div>
        );
    }
}