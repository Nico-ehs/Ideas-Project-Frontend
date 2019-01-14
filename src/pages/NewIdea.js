import React from "react";
import { Form, Button } from "react-bootstrap/lib";
// import {Form} from '../globalUse.js'

const BackendUrl = "http://localhost:3000/"

function postBackendData(route, data, confirmFn){
    return fetch(BackendUrl+route,{
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
        },
        body: data
    }).then(res => res.json()).then(json => confirmFn(json));
}

class NewIdea extends React.Component {

  state = {
    username: ""
  };

  ideaSubmit = (event) => {
    event.preventDefault()
    postBackendData("ideas", JSON.stringify({"idea": {"title":this.state.username}}), this.props.setUser)
  }

  handleChange = (e) => {
    this.setState({ username: e.target.value });
  };

  render(){
  	return (
      <div className="NewIdea">
        <Form onSubmit={this.loginSubmit} >
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Enter name" name="name" onChange={this.handleChange}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
  	)
  }
};

export default NewIdea;
