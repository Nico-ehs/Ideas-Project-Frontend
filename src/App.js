import React, { Component} from 'react';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import NavContainer from './components/NavContainer';
import Home from './pages/Home';
import IdeaShow from './pages/IdeaShow';
import UserPage from './pages/UserPage';
import Login from './pages/Login';
import NewIdea from './pages/NewIdea';


import './App.css';


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


class App extends Component {

  state = {
    user: null,
    categories: null
  }

  componentDidMount() {
    // console.log(this.state)
    fetch(BackendUrl+"/categories")
      .then(response => response.json())
      .then(this.setCategories)
  }
  setCategories = (data) => {
    this.setState({categories: data})
  }

  reloadUser = () => {
    postBackendData("users", JSON.stringify({"user": {"name":this.state.user.name}}), this.setUser)
  }

  setUser = (user) => {
    this.setState({user: user})
  }


  render() {

    const Idea = ({ match }) => (
      <div>
        <IdeaShow id={match.params.id}  user={this.state.user} reload={this.reloadUser} />
      </div>
    )
    // console.log(this.state)

    return (
      <div className="App">
      <Router>
      <React.Fragment>
        <NavContainer user={this.state.user} setUser={this.setUser} categories={this.state.categories} />
        <Route exact path="/" render={() => <Home user={this.state.user} />}/>
        <Route exact path="/home" render={() => <Home user={this.state.user} />} />
        <Route exact path="/newidea" render={() => <NewIdea user={this.state.user} />} />
        <Route exact path="/login" render={() => this.state.user ?
            <Redirect to="/home" /> :
            <Login setUser={this.setUser} /> }
          />
        <Route exact path="/userpage" render={() => <UserPage user={this.state.user} reload={this.reloadUser} />} />
        <Route path="/ideas/:id" component={Idea} />
      </React.Fragment>
      </Router>
      </div>
    );
  }
}

export default App;
