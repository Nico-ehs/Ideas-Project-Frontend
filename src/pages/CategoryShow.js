import React, { Component } from 'react';
import Table from 'react-bootstrap/lib/Table'
import {Link} from 'react-router-dom'
const BackendUrl = "http://localhost:3000/"


class CategoryShow extends Component {

  state={
    data: null
  }

  genIdeaEntry = () => {

  }

  genIdeas = () => {
    console.log(this.state)
    if (!this.state.data){
      return null
    }
    // console.log(this.state.data)
    return this.state.data.ideas.map(idea =>
      <tr key={idea.id}>
        <td><Link to={"/ideas/"+idea.id}>{idea.title}</Link></td>
        <td>{idea.description}</td>
        <td>{idea.comments.length}</td>
      </tr>
      )
  }

  componentDidMount() {
    console.log(this.props)
    fetch(BackendUrl+"/categories/"+this.props.id)
      .then(response => response.json())
      .then((res) => this.setState({ data: res }))
  }

  render() {
    if (!this.state.data){
      return null
    }
    return (
      <div>
      <h1>{this.state.data.title}</h1>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>comments</th>
          </tr>
        </thead>
        <tbody>
        {this.genIdeas()}
        </tbody>
        </Table>
      </div>
    )
  }
}

export default CategoryShow;
