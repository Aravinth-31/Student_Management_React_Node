 import React from 'react';
import Login from './Login';
import Add from './Add';

export default class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loggedin:0
        }
    }
    componentDidMount=()=>{
        var logged=JSON.parse(localStorage.getItem('loggedIn'))|0;
        this.setState({loggedin:logged});
    }
    render(){
        if(this.state.loggedin)
            return(<Add></Add>);
        else
            return(<Login></Login>);
    }
}