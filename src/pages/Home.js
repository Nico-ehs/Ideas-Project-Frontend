
import React, { Component } from 'react';
import Table from 'react-bootstrap/lib/Table'
import {Link} from 'react-router-dom'
import {BackendUrl} from '../index'

// const BackendUrl = "https://ideas-project-backend.herokuapp.com/"


class Home extends Component {

  state={
    data: null
  }

  genIdeaEntry = () => {

  }

  genIdeas = () => {
    // console.log(this.state)
    if (!this.state.data){
      return null
    }
    // console.log(this.state.data)
    return this.state.data.map(idea =>
      <tr key={idea.id} >
        <td><Link to={"/ideas/"+idea.id}>{idea.title}</Link></td>
        <td>{idea.description}</td>
        <td><Link to={"/categories/"+idea.category_id}>{idea.category_title}</Link></td>
        <td>{idea.comments.length}</td>
      </tr>
      )
  }

  componentDidMount() {
    fetch(BackendUrl+"/ideas")
      .then(response => response.json())
      .then((res) => this.setState({ data: res }))
  }

  render() {

    return (
      <div>
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
        {this.genIdeas()}
        </tbody>
        </Table>
      </div>
    )
  }
}

export default Home;
