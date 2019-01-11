import React from 'react';
import Card from 'react-bootstrap/lib/Card'
// import Button from 'react-bootstrap/lib/Button'
// import Form from 'react-bootstrap/lib/Form'
// import FormControl from 'react-bootstrap/lib/FormControl'
import {Link} from 'react-router-dom'



class IdeaCard extends React.Component {



  componentDidMount() {
    // console.log(this.props)
  }

  render(){
    const cardData = this.props.cardData
   return (
      <Card style={{ width: '18rem' }} key={this.key}>
        <Card.Body>
          <Card.Title>{cardData.title}</Card.Title>
          <Card.Text>
            {cardData.description}
            <Link to={"/ideas/"+cardData.id}>See Answers</Link>
          </Card.Text>
        </Card.Body>
      </Card>
   );
  }

};

export default IdeaCard;
