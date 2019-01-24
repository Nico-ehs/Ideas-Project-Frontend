import React, { Component } from 'react';
import Navbar from 'react-bootstrap/lib/Navbar'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import Nav from 'react-bootstrap/lib/Nav'
import {Link} from 'react-router-dom'






class NavContainer extends Component {
  componentDidMount() {
  }

  genCategoriesDropdown = () => {
    if (!this.props.categories || !this.props.categories.map) {
      return null
    }
    // console.log(this.props.categories.length)
    // debugger
    return this.props.categories.map(category =>
       <div key={category.id} >
       <NavDropdown.Item href={"../categories/"+category.id} >{category.title}</NavDropdown.Item>
       </div>
     )
  }

  render() {
    // console.log("nav")
    // console.log(this.props)
    return (
      <div>
      <Navbar bg="light" expand="lg">
      <Navbar.Brand><Link to="/">Ideas</Link></Navbar.Brand>
      <Nav className="mr-auto">
      <NavDropdown title="Categories" id="collasible-nav-dropdown">
        {this.genCategoriesDropdown()}

      </NavDropdown>
      </Nav>
      <Nav className="mr-auto">
      {this.props.user ? <Link to="/userpage">User Page</Link> : null }
      </Nav>
      <Nav className="mr-auto">
      {this.props.user ? <Link to="/newidea">New Idea</Link> : null}
      </Nav>


      {this.props.user ? <div><p>Welcome {this.props.user.name}</p>
      <p onClick={this.props.logout} >Logout</p></div> :
      <div><p><Link to="/login">Login</Link></p>
      <p><Link to="/signup">Signup</Link></p></div>}
      </Navbar>
      </div>
    );
  }
}

export default NavContainer;
