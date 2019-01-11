import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button'
import Form from 'react-bootstrap/lib/Form'
import FormControl from 'react-bootstrap/lib/FormControl'

// import '../globalUse.js'


const BackendUrl = "http://localhost:3000/"

function patchBackendData(route, data, confirmFn){
    return fetch(BackendUrl+route,{
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
        },
        body: data
    }).then(res => res.json()).then(json => confirmFn(json));
}


function deleteBackendData(route, confirmFn){
    return fetch(BackendUrl+route,{
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
        }
    }).then(res => res.json()).then(json => confirmFn(json));
}

class UserPage extends Component {

  state = {
    toEditQ:null,
    toEditA:null
  }


  openEditQ = (event) => {
    console.log(this.state)
    this.setState({toEditQ: event.target.parentElement.id*1})
  }
  closeEditQ = () => {
    console.log(this.state)
    this.setState({toEditQ: null})
  }


  openEditA = (event) => {
    this.setState({toEditA: event.target.parentElement.id*1})
  }
  closeEditA = () => {
    this.setState({toEditA: null})
  }


  updateQ = (event, id) => {
    console.log("update")
     patchBackendData(`/questions/${id}`,
       JSON.stringify({"question": {text: (event.target.parentElement.children[0].value)}}),
      this.props.reload)
  }

  deleteQ = (event) => {
    console.log("delete")
    deleteBackendData(`/questions/${event.target.parentElement.id}`,this.props.reload)
  }

  updateA = (event) => {
    console.log("update")
     patchBackendData(`/comments/${event.target.parentElement.id}`,
       JSON.stringify({"comment": {text: (event.target.parentElement.children[0].value)}}),
      this.props.reload)
  }

  deleteA = (event) => {
    console.log("delete")
    deleteBackendData(`/comments/${event.target.parentElement.id}`,this.props.reload)
  }




  genUserIdeas  = () => {
    return this.props.user.questions.map(question =>
      <div>
      <h4>{question.text}</h4>
      {(this.state.toEditQ === question.id)?
        <Form inline id={question.id} >
        <FormControl type="text" defaultValue={question.text} />
        <Button onClick={(event)=> this.updateQ(event, question.id)} >Update</Button>
        <Button onClick={this.closeEditQ} >Close</Button>
      </Form> :
      <div id={question.id} >
       <Button onClick={this.openEditQ} >Edit</Button>
       <Button onClick={this.deleteQ} >Delete</Button>
       </div>}
    </div>)
  }

  genUserComments  = () => {
    return this.props.user.comments.map(comment =>
      <div>
      <h4>{comment.text}</h4>
      <p>For Idea {comment.question_id}</p>
      {(this.state.toEditA === comment.id)?
      <Form inline id={comment.id} >
        <FormControl type="text" defaultValue={comment.text} />
        <Button onClick={this.updateA} >Update</Button>
        <Button onClick={this.closeEditA} >Close</Button>
      </Form> :
      <div id={comment.id} >
       <Button onClick={this.openEditA} >Edit</Button>
       <Button onClick={this.deleteA} >Delete</Button>
       </div>}
    </div>)
  }


  componentDidMount() {
    console.log("route test")
  }

  render() {
    if (!this.props.user){
      return null
    }
    return (
      <div>

        <h4>Your Ideas</h4>
        {this.genUserIdeas()}
        <h4>Your Comments</h4>
        {this.genUserComments()}
      </div>
    );
  }
}



export default UserPage;
