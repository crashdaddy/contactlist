import React, {Component} from 'react';

class Person extends Component {
    constructor(props) {
      super (props);
  
      this.state ={
        selected : ''
      }
    }
  
    togglePopup = () => {
      this.setState({
        selected: this.props.person.id
      })
      this.props.togglePopup(this.props.person, this.props.person.id)
    }
  
    render() {
      let bgColor = {backgroundColor: 'white'}
      if(this.props.selected) {
        bgColor= {backgroundColor: 'lightblue'}
      }
      return (
        <div className="personTile" style={bgColor} onClick={this.togglePopup}>
          <img className="personPic" src={this.props.person.picture.medium} alt=""/>
          <p style={{fontSize:'10pt'}}>{this.props.person.name.title} {this.props.person.name.first} {this.props.person.name.last}</p>
        </div>
      )
    }
  }

  export default Person;