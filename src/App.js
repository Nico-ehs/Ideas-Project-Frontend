import React, { Component} from 'react';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import NavContainer from './components/NavContainer';
import Home from './pages/Home';
import IdeaShow from './pages/IdeaShow';
import CategoryShow from './pages/CategoryShow'
import UserPage from './pages/UserPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NewIdea from './pages/NewIdea';


import './App.css';


const BackendUrl = "http://localhost:3000/"

// function postBackendData(route, data, confirmFn){
//     return fetch(BackendUrl+route,{
//         method: "POST",
//         headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json"
//         },
//         body: data
//     }).then(res => res.json()).then(json => confirmFn(json));
// }


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
    let token = localStorage.getItem('token')
    if(token){
      this.setState({token})
      fetch(BackendUrl+`tokenauth`, {
        method: "GET",
        headers: {
          "Authentication" : `Bearer ${token}`
        }
      }).then(res => res.json()).then(this.setUser)
    }
  }

  setUser = (data) => {
    // debugger
    if(data.user){
      this.setState({user: data.user})
    }
  }


  setCategories = (data) => {
    this.setState({categories: data})
  }

  reloadUser = () => {
    fetch(BackendUrl+`user/${this.user.id}`)
      .then(response => response.json())
      .then(this.setCategories)
  }



  loginFn = (login) => {
    // debugger
    fetch(`http://localhost:3000/auth`, {
      method:"POST",
      headers: {
        "Content-type":"application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify({
        name: login.name,
        password: login.password
      })
    }).then(res => res.json())
    .then(data => {
      if(data.error){
        alert('Incorrect username or password')
      }else{
        console.log(data)
        // debugger
        this.setState({user: data.user_info})
        localStorage.setItem('token', data.token)
      }
    })
  };

  logout = () => {
    localStorage.clear()
    this.setState({user:null})
  }

  render() {

    const Idea = ({ match }) => (
      <div>
        <IdeaShow id={match.params.id}  user={this.state.user} reload={this.reloadUser} />
      </div>
    )
    const Category = ({ match }) => (
      <div>
        <CategoryShow id={match.params.id}  user={this.state.user} reload={this.reloadUser} />
      </div>
    )
    // console.log(this.state)
    return (
      <div className="App">
      <Router>
        <React.Fragment>
          <NavContainer user={this.state.user} logout={this.logout} categories={this.state.categories} />
          <Route exact path="/" render={() => <Home user={this.state.user} />}/>
          <Route exact path="/home" render={() => <Home user={this.state.user} />} />
          <Route exact path="/newidea" render={() => <NewIdea user={this.state.user} categories={this.state.categories} />} />
          <Route exact path="/login" render={() => this.state.user ?
              <Redirect to="/home" /> :
              <Login loginFn={this.loginFn} /> }
            />
            <Route exact path="/signup" render={() => this.state.user ?
                <Redirect to="/home" /> :
                <SignUp loginFn={this.loginFn} /> }
              />
          <Route exact path="/userpage" render={() => <UserPage user={this.state.user} reload={this.reloadUser} />} />
          <Route path="/ideas/:id" component={Idea} />
          <Route path="/categories/:id" component={Category} />
        </React.Fragment>
      </Router>
      </div>
    );
  }
}

export default App;
