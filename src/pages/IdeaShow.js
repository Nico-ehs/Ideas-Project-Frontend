import React from 'react';
import Form from 'react-bootstrap/lib/Form'
// import FormControl from 'react-bootstrap/lib/FormControl'
import Button from 'react-bootstrap/lib/Button'
import Card from 'react-bootstrap/lib/Card'
import {Link} from 'react-router-dom'
// import NewComment from '../components/NewComment'

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

  state = {
    ideaData: null,
    newComment: "",
    textInput: "",
    commentEdit: null,
    editText:""
  }


  handleChange = (e) => {
    let change = {}
    change[e.target.id] = e.target.value
    this.setState(change)
    // this.setState({ name: e.target.value });
    console.log(this.state)
  };



  componentDidMount() {
    // console.log(this.state)
    fetch(BackendUrl+"/ideas/"+this.props.id)
      .then(response => response.json())
      .then((res) => this.setState({ ideaData: res }))
  }

  setCommentEdit = (id) => {
    console.log(id)
    this.setState({ commentEdit: id })
  }

  postComment= () => {
    // console.log({"comment": {"user_id":this.props.user.id,
    //  "text": this.state.newComment,
    //   "idea_id": this.state.ideaData.id }})
    postBackendData("comments",
    JSON.stringify({"comment": {"user_id":this.props.user.id,
     "text": this.state.textInput,
      "idea_id": this.state.ideaData.id }}), this.props.reload)

  }

  deleteComment = () => {
    console.log("delete")
    debugger
    deleteBackendData(`comments/${this.state.commentEdit}`, this.props.reload)
  }

  patchComment = () => {
    console.log("patch")
    debugger
    patchBackendData(`comments/${this.state.commentEdit}`,
    JSON.stringify({"comment": {"user_id":this.props.user.id,
     "text": this.state.newComment,
      "idea_id": this.state.ideaData.id }}), this.props.reload)
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
      <Card.Title><p className="float-left">
      <Link to={"/users/"+comment.user_id}>{comment.user_id}</Link> at time
      </p></Card.Title>
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
    <Card.Title><p className="float-left">
    <Link to={"/users/"+comment.user_id}>{comment.author_name}</Link> said
    </p></Card.Title>
      <Card.Text>
          {comment.text}
      </Card.Text>
    </Card.Body>
    </Card>)
  }

  genNewCommentForm = () => {
    return (<div>
      <Form  >
        <Form.Group controlId="newComment">
          <Form.Label><p> </p>New Comment</Form.Label>
          <Form.Control placeholder="Enter Comment" name="comment" onChange={this.handleChange} />
        </Form.Group>
        <Button variant="primary" onClick={this.postComment}>
          Submit
        </Button>
        <Button variant="primary" onClick={() => this.setCommentEdit(null)} >
          close
        </Button>
      </Form>
      </div>)
  }

  genCommentEditForm = () => {
    return (<div>
      <Form  >
        <Form.Group controlId="name">
          <Form.Label><p> </p>Edit Comment</Form.Label>
          <Form.Control placeholder="Enter Comment" name="comment" onChange={this.handleChange} />
        </Form.Group>
        <Button variant="primary" onClick={() => this.setCommentEdit()}>
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


  genMainForm = () => {
    if (!this.props.user){
      return null
    }
    if (this.state.commentEdit){
      return this.genCommentEditForm()
    }
    return this.genNewCommentForm()
  }

  render(){

  // console.log(this.state)
  if(!this.state.ideaData){
    return null
  }
  console.log(this.state)
  const Idea = this.state.ideaData
  return (
    <div>
      <Card>
      <Card.Body>
        <Card.Title><h1>{this.state.ideaData.title}</h1></Card.Title>
          <p>Catagory: <Link to={"/category/"+Idea.category_id}>{Idea.category_title}</Link></p>
          <p>Idea Description: {this.state.ideaData.description}</p>
      </Card.Body>
      {this.genComments()}
      {this.genMainForm()}
      </Card>
    </div>
   )
  }
};

export default IdeaShow;
