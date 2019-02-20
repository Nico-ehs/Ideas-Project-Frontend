import React from "react";
import { Form, Button } from "react-bootstrap/lib";
import { Redirect } from 'react-router-dom'

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
    // title: "",
    // description: "",
    category: "Story Ideas",
    message: null
  };

  // checkValid = () => {
  //   if (!this.state.title || !this.state.descritpion){
  //     return null
  //   }
  //   return true
  // }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (!this.state.title || !this.state.description){
      this.setState({message: "Invalid Data"})
      debugger
      console.log(this.state)
      return null
    }
    // console.log(this.state)
    // console.log(this.props.categories.find(c => c.title === this.state.category))
    // debugger
    // console.log({"idea": { "title": this.state.title,
    // "description": this.state.description,
    // "category_id": this.props.categories.find(c => {return c.title === this.state.category}).id*1,
    // "user_id":this.props.user.id*1 } })
    postBackendData("ideas", JSON.stringify(
      {"idea": { "title": this.state.title,
      "description": this.state.description,
      "category_id": this.props.categories.find(c => {return c.title === this.state.category}).id*1,
      "user_id":this.props.user.id*1 } }
    )
      , this.setRedirect)
    }


  handleChange = (e) => {
    let change = {}
    change[e.target.id] = e.target.value
    this.setState(change)
    // this.setState({ name: e.target.value });
    // console.log(this.state)
  };

  categorySelect = () =>{
    if (!this.props.categories){
      return null
    }
    return this.props.categories.map(category =>
       <option key={category.id}>{category.title}</option>
    )
  }

  render(){
  	return (
      <div className="NewIdea">
      {this.renderRedirect()}
      <p>{this.state.message}</p>
        <Form onSubmit={this.handleSubmit} >
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control placeholder="Enter title" name="title" onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control placeholder="Enter Description" name="description" onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" onChange={this.handleChange} >
              {this.categorySelect()}
            </Form.Control>
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
