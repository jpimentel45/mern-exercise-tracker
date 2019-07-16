import React, { Component } from 'react'
import axios from 'axios';

export default class createUser extends Component {
   
    constructor(props) {
        //call super when define constructor of subclass
        super(props);
        //binding this to each of these methods
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        //.state how you create variables in react 
        this.state = {
            username: ''
        }
    }

    //when username chage, change state
    //form with textbox username call this function e.target = textbox
    onChangeUsername(e) {
        //.setState to update  
        this.setState({
            username: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username
        }

        console.log(user);
        //ob submit button send user data to backend
        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        //keep user on this page to enter users consecutively
        //set username blank: after enter user set it back to blank
        //to enter another username
       this.setState({
           username: ''
       })
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
