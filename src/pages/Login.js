import React from "react";
import { Form, Button } from "react-bootstrap/lib";
// import {Form} from '../globalUse.js'

// const BackendUrl = "http://localhost:3000/"

// function postBackendData(route, data, confirmFn){
//     return fetch(BackendUrl+route,{
//         method: "POST",
//         headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json"
//         },
//         body: data
//     }).then(res => res.json()).then(json => confirmFn(json));
// }

class Login extends React.Component {


  state = {
    username: "",
    password: ""
  };


  loginSubmit = (event) => {
    console.log(this.state)
    // debugger
    event.preventDefault()
    this.props.loginFn({"name":this.state.username, "password": this.state.password})
  }

  handleChange = (e) => {
    let change = {}
    change[e.target.id] = e.target.value
    this.setState(change)
  };

  render(){
  	return (
      <div className="Login">
        <Form onSubmit={this.loginSubmit} >
          <Form.Group controlId="username">
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Enter name" name="name" onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control placeholder="password" name="password" onChange={this.handleChange}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
  	)
  }
};

export default Login;
