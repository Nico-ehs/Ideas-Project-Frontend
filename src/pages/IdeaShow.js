import React from 'react';
import Form from 'react-bootstrap/lib/Form'
// import FormControl from 'react-bootstrap/lib/FormControl'
import Button from 'react-bootstrap/lib/Button'
import Card from 'react-bootstrap/lib/Card'

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
    console.log("show")
    fetch(BackendUrl+"/ideas/"+this.props.id)
      .then(response => response.json())
      .then((res) => this.setState({ ideaData: res }))
  }

  reload = () => {

  }

  genComments = () => {
    console.log(this.state)
    if(!this.state.ideaData.comments){
      return null
    }
    return this.state.ideaData.comments.map(comment =>
      <div key={comment.id}>
      <h4>{comment.text}</h4>
      <p>By User{comment.user_id}</p>
    </div>)
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
  console.log(this.state)
  if(!this.state.ideaData){
    return null
  }
  return (
    <div>
      <Card>
      <Card.Body>
        <Card.Title>{this.state.ideaData.text}</Card.Title>
          {this.genComments()}
          {this.props.user ? this.genCommentForm() : null}
      </Card.Body>
      </Card>
    </div>
   )
  }
};

export default IdeaShow;
