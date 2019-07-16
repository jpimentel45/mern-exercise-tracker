import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
  constructor(props) {
       //call super when define constructor of subclass
    super(props);
    //binding this to each of these methods
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    //.state how you create variables in react 
    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      //on page dropdown to select users in db 
      users: []
    }
  }
 //hardcode single user
//react life cycle method
//called before anything display on screen
  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

//when username chage, change state
    //form with textbox username call this function e.target = textbox
  onChangeUsername(e) {
     //.setState to update  
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
     //.setState to update
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));
    //once submit exercise go backto list of exercises
    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Create New Exercise Log</h3>
        {/* //on submit call this.onSubmit */}
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
               //set dropdown menu value to this.state.username
              value={this.state.username}
              //on change: this.onChangeUsername
              onChange={this.onChangeUsername}>
              {
                   //array of users from mongo db atlas db
                                // .map allows to return something for each element in array
                this.state.users.map(function(user) {
                  return <option 
                    //key,value,andtext will be set to user value
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
             {/* //DatePicker component pop up calendar to select date
                            //install through npm i react-datepicker */}
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
