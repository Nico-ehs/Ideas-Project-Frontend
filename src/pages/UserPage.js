import React, { Component } from 'react';
import Card from 'react-bootstrap/lib/Card'
import {Link} from 'react-router-dom'
import Table from 'react-bootstrap/lib/Table'

class UserPage extends Component {




    genUserIdeas = () => {
      // console.log(this.state)
      // console.log(this.state.data)
      return this.props.user.ideas.map(idea =>
        <tr key={idea.id} >
          <td><Link to={"/ideas/"+idea.id}>{idea.title}</Link></td>
          <td>{idea.description}</td>
          <td><Link to={"/categories/"+idea.category_id}>{idea.category_title}</Link></td>
          <td>{idea.comments.length}</td>
        </tr>
        )
    }


  genUserComments  = () => {
    // return null
    return this.props.user.posted_comments.map(comment =>
      <Card key={comment.id}>
      <Card.Body>
      <Card.Title><p className="float-left">
      <Link to={"/users/"+comment.user_id}>{comment.author_name}</Link> said
      </p></Card.Title>
        <Card.Text>
            {comment.text}
        </Card.Text>
      </Card.Body>
      </Card>
      )
  }


  componentDidMount() {
    console.log(this.props)
  }

  render() {
    if (!this.props.user){
      return null
    }
    return (
      <div>

        <h4>Your Ideas</h4>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>comments</th>
          </tr>
        </thead>
        <tbody>
        {this.genUserIdeas()}
        </tbody>
        </Table>
        <h4>Your Comments</h4>
        {this.genUserComments()}
      </div>
    );
  }
}



export default UserPage;
