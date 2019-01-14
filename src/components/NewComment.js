import React, { Component } from "react";


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


export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: {
        name: "",
        message: ""
      }
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleFieldChange = event => {
    const { value, name } = event.target;
    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        [name]: value
      }
    });
  };

  postComment= () => {
    postBackendData("comments",
    JSON.stringify({"comment": {"user_id":this.props.user.id,
     "text": this.state.newComment,
      "idea_id": this.state.ideaData.id }}), this.props.reload)
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <form method="post" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              onChange={this.handleFieldChange}
              value={this.state.comment.name}
              className="form-control"
              placeholder="Your Name"
              name="name"
              type="text"
            />
          </div>

          <div className="form-group">
            <textarea
              onChange={this.handleFieldChange}
              value={this.state.comment.message}
              className="form-control"
              placeholder="Your Comment"
              name="message"
              rows="5"
            />
          </div>


          <div className="form-group">
            <button className="btn btn-primary" >
              Comment ➤
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
