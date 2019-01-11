import React, { Component } from 'react';
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import {Link} from 'react-router-dom'






class NavContainer extends Component {

  render() {

    return (
      <div>
      <Navbar bg="light" expand="lg">
      <Navbar.Brand><Link to="/">Ideas</Link></Navbar.Brand>
      <Nav className="mr-auto">
      {this.props.user ? <Link to="/userdata">User Page</Link> : null }
      </Nav>
      <Nav className="mr-auto">
      {this.props.user ? <Link to="/userdata">New Question</Link> : null}
      </Nav>


      {this.props.user ? <div><p>Welcome {this.props.user.name}</p>
      <p onClick={() => this.props.setUser(null)} >Logout</p></div> :
      <Link to="/login">Login</Link>}
      </Navbar>
      </div>
    );
  }
}

export default NavContainer;
