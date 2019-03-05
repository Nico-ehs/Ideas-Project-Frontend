import React from 'react';
import Form from 'react-bootstrap/lib/Form'
import Button from 'react-bootstrap/lib/Button'
import Card from 'react-bootstrap/lib/Card'
import {Link} from 'react-router-dom'

const BackendUrl = "https://ideas-project-backend.herokuapp.com/"

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

class IdeaShow extends React.Component {

  categorySelect = () =>{
    if (!this.props.categories){
      return null
    }
    return this.props.categories.map(category =>
       <option key={category.id}>{category.title}</option>
    )
  }

  state = {
    ideaData: null,
    textInput: "",
    commentEdit: null,
    ideaEdit: null
  }

  handleChange = (e) => {
    let change = {}
    change[e.target.id] = e.target.value
    this.setState(change)
  };

  componentDidMount() {
    // console.log(this.state)
    fetch(BackendUrl+"/ideas/"+this.props.id)
      .then(response => response.json())
      .then((res) => this.setState({ ideaData: res }))
  }

  reload2 = () => {
    fetch(BackendUrl+"/ideas/"+this.props.id)
      .then(response => response.json())
      .then((res) => this.setState({ ideaData: res }))
  }

  setCommentEdit = (id) => {
    // console.log(id)
    this.setState({ ideaEdit: null })
    this.setState({ commentEdit: id })
  }

  setIdeaEdit = (id) => {
    // console.log(id)
    this.setState({ ideaEdit: id })
    this.setState({ commentEdit: null })
  }

  postComment= () => {
    postBackendData("comments",
    JSON.stringify({"comment": {"user_id":this.props.user.id,
     "text": this.state.textInput,
      "idea_id": this.state.ideaData.id }}), this.reload2)

  }

  deleteComment = () => {
    console.log("delete")
    // debugger
    deleteBackendData(`comments/${this.state.commentEdit}`, this.reload2)
  }

  patchComment = () => {
    console.log("patch")
    // debugger
    patchBackendData(`comments/${this.state.commentEdit}`,
    JSON.stringify({"comment": {"user_id":this.props.user.id,
     "text": this.state.textInput,
      "idea_id": this.state.ideaData.id }}), this.reload2)
  }

  patchIdea = () => {
    // console.log("patch")
    // debugger
    patchBackendData(`ideas/${this.state.ideaEdit}`,
    JSON.stringify({"idea": {"user_id":this.props.user.id,
     "description": this.state.textInput}}), this.reload2)
  }

  genComments = () => {
    // console.log(this.state)
    if(!this.state.ideaData.comments){
      return null
      // return <Comment user={this.props.user} data={comment} />
    }
    return this.state.ideaData.comments.map(comment =>
      this.genComment(comment)
      )
  }

  genComment = (comment) => {
    if (this.props.user && this.props.user.id === comment.user_id){
      return (<Card key={comment.id}>
      <Card.Body>
      <Card.Title className="float-left">
      <Link to={"/users/"+comment.user_id}>{comment.author_name}</Link> said:
      </Card.Title>
        <Card.Text>
            {comment.text}
        </Card.Text>
      </Card.Body>
      <Button variant="primary" onClick={() => this.setCommentEdit(comment.id)} >
        Edit
      </Button>
      </Card>)
    }
    return (<Card key={comment.id}>
    <Card.Body>
    <Card.Title className="float-left">
    <Link to={"/users/"+comment.user_id}>{comment.author_name}</Link> said:
    </Card.Title>
      <Card.Text>
        {comment.text}
      </Card.Text>
    </Card.Body>
    </Card>)
  }

  genNewCommentForm = () => {
    return (<div>
      <Form  >
        <Form.Group controlId="textInput">
          <Form.Label><p> </p>New Comment</Form.Label>
          <Form.Control placeholder="Enter Comment" name="comment" onChange={this.handleChange} />
        </Form.Group>
        <Button variant="primary" onClick={this.postComment}>
          Submit
        </Button>
      </Form>
      </div>)
  }

  genCommentEditForm = () => {
    let commentData=this.state.ideaData.comments.find((c) => c.id===this.state.commentEdit)
    return (<div>
      <Form  >
        <Form.Group controlId="textInput">
          <Form.Label><p> </p>Edit Comment<p>Comment Text: {commentData.text}</p></Form.Label>
          <Form.Control placeholder="New Comment Text" name="comment" onChange={this.handleChange} />
        </Form.Group>
        <Button variant="primary" onClick={() => this.patchComment()}>
          Submit
        </Button>
        <Button variant="primary" onClick={() => this.setCommentEdit(null)} >
          close
        </Button>
        <Button variant="primary" onClick={this.deleteComment} >
          delete
        </Button>
      </Form>
      </div>)
  }

  genIdeaEditForm = () => {
    return (<div>
      <Form  >
        <Form.Group controlId="textInput">
          <Form.Label><p> </p>Edit Idea<p>Idea Description: {this.state.ideaData.description}</p></Form.Label>
          <Form.Control placeholder="New Idea Description" name="comment" onChange={this.handleChange} />
        </Form.Group>
        <Button variant="primary" onClick={() => this.patchIdea()}>
          Submit
        </Button>
        <Button variant="primary" onClick={() => this.setIdeaEdit(null)} >
          close
        </Button>
      </Form>
      </div>)
  }

  genMainForm = () => {
    if (!this.props.user){
      return null
    }
    if (this.state.commentEdit){
      return this.genCommentEditForm()
    }
    if (this.state.ideaEdit){
      return this.genIdeaEditForm()
    }
    return this.genNewCommentForm()
  }

  render(){

    // console.log(this.state)
    if(!this.state.ideaData){return null}
    const Idea = this.state.ideaData
    return (
    <div>
      <Card>
      <Card.Body>
        <Card.Title><h1>{this.state.ideaData.title}</h1>
        {this.props.user && this.state.ideaData.user_id === this.props.user.id ? <Button variant="primary" onClick={() => this.setIdeaEdit(this.state.ideaData.id)} >
          Edit
        </Button> : null}
        </Card.Title>
          <p>Catagory: <Link to={"/categories/"+Idea.category_id}>{Idea.category_title}</Link></p>
          <p>Idea Description: {this.state.ideaData.description}</p>
          <p>Posted by: {this.state.ideaData.author_name}</p>
      </Card.Body>
      {this.genComments()}
      {this.genMainForm()}
      </Card>
    </div>
   )
  }
};

export default IdeaShow;
