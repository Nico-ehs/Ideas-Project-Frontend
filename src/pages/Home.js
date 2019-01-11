
import React, { Component } from 'react';
// import CardDeck from 'react-bootstrap/lib/CardDeck'
// import IdeaCard from '../components/IdeaCard'
import Table from 'react-bootstrap/lib/Table'
import {Link} from 'react-router-dom'
const BackendUrl = "http://localhost:3000/"


class Home extends Component {

  state={
    date: null
  }

  genIdeaEntry = () => {

  }

  genIdeas = () => {
    console.log(this.state)
    if (!this.state.data){
      return null
    }
    // console.log(this.state.data)
    return this.state.data.map(idea =>
      <tr>
        <td><Link to={"/ideas/"+idea.id}>{idea.title}</Link></td>
        <td>{idea.description}</td>
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
