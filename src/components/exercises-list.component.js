import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//exercise component implemented as a functional react component
//accepting props passed through it
//return table row
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date}</td>
        <td>
        <Link to={"/edit/" + props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
        </td>
    </tr>
)

export default class exercisesList extends Component {
    constructor(props) {
        super(props);
        //delete exercise in list
        this.deleteExercise = this.deleteExercise.bind(this)
        //set exercises to empty array
        this.state = { exercises: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                this.setState({ exercises: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            //set state of exercises: filter array of exercises and return certain elements
            //whenever id of exercise of exercise array does not equel what were removing, pass back to exercise array
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        //.map return something from every element of an array
        return this.state.exercises.map(currentexercise => {
            //for every element called currentexercise it will return a component
            //component = row of table
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {/*body will call ecercieseList method and return rows of table*/}
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}