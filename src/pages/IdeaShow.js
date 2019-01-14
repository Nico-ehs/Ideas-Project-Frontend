import React from 'react';
import Form from 'react-bootstrap/lib/Form'
// import FormControl from 'react-bootstrap/lib/FormControl'
import Button from 'react-bootstrap/lib/Button'
import Card from 'react-bootstrap/lib/Card'
import {Link} from 'react-router-dom'
// import NewComment from '../components/NewComment';


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


class IdeaShow extends React.Component {

  state = {
    ideaData: null,
    newComment: ""
  }

  componentDidMount() {
    // console.log(this.state)
    fetch(BackendUrl+"/ideas/"+this.props.id)
      .then(response => response.json())
      .then((res) => this.setState({ ideaData: res }))
  }

  reload = () => {

  }

  genComments = () => {
    // console.log(this.state)
    if(!this.state.ideaData.comments){
      return null
    }
    return this.state.ideaData.comments.map(comment =>
      <Card key={comment.id}>
      <Card.Body>
      <Card.Title><p className="float-left">
      <Link to={"/users/"+comment.user_id}>{comment.user_id}</Link> at time
      </p></Card.Title>
        <Card.Text>
            {comment.text}
        </Card.Text>
      </Card.Body>
</Card>
      )
  }

  postComment= () => {
    postBackendData("comments",
    JSON.stringify({"comment": {"user_id":this.props.user.id,
     "text": this.state.newComment,
      "idea_id": this.state.ideaData.id }}), this.props.reload)

  }

  handleChange = (e) => {
    this.setState({ newComment: e.target.value });
  };

  genCommentForm = () => {
    return (<div>
      <Form  >
        <Form.Group controlId="name">
          <Form.Label>New Comment</Form.Label>
          <Form.Control placeholder="Enter Comment" name="comment" onChange={this.handleChange} />
        </Form.Group>
        <Button variant="primary" onClick={this.postComment}>
          Submit
        </Button>
      </Form>
      </div>)
  }

  render(){
  // console.log(this.state)
  if(!this.state.ideaData){
    return null
  }
  const Idea = this.state.ideaData
  return (
    <div>
      <Card>
      <Card.Body>
        <Card.Title><h1>{this.state.ideaData.title}</h1></Card.Title>
          <p>Catagory: <Link to={"/category/"+Idea.category_id}>{Idea.category_id}</Link></p>
          <p>Idea Description: {this.state.ideaData.description}</p>
      </Card.Body>
      {this.genComments()}
      {this.props.user ? this.genCommentForm() : null}
      </Card>
    </div>
   )
  }
};

export default IdeaShow;
