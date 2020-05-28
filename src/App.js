import React, {Component} from 'react';
import './App.css';
import closeButton from './img/redX.png';

class ContactPerson extends Component {

  state = { showing: true };
  
  hidePanel = () => {
    this.setState({
      showing:false
    })
    this.props.togglePopup()
  }

  render() {
    return(
      <div className="windowPane">
          <div id="closeButton" style={{position: 'absolute',top:'5px',right:'5px'}}>
          <img src={closeButton} alt="" style={{width:'30px'}} onClick={this.hidePanel} />
          </div>
          <img src={this.props.selectedPerson.picture.large} style={{float:'left',paddingRight:'5px'}} alt=""/>
          {this.props.selectedPerson.location.street.number} {this.props.selectedPerson.location.street.name}<br/>
          {this.props.selectedPerson.location.city} {this.props.selectedPerson.location.state}<br/>
          {this.props.selectedPerson.location.country}<br/>
          {this.props.selectedPerson.location.postcode}
      </div>
    )
  }
}

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
    return (
      <div className="personTile" onClick={this.togglePopup}>
        <img className="personPic" src={this.props.person.picture.medium} alt=""/>
        <p style={{fontSize:'10pt'}}>{this.props.person.name.title} {this.props.person.name.first} {this.props.person.name.last}</p>
      </div>
    )
  }
}

class App extends Component  {
  constructor(props) {
    // Remember that if we "extend" a "class" of a "class" we have to call the "super()" method. Just pass it "props" as well.
    super(props);
    // class-based Components allow us to have "state"! And this is why/when we use class-based components.
    this.state = {
        people: [],
        currentPerson: {},
        selectedPerson: '',
        showPopup: false,
        abvLevel : 1,
        page: 1,
    }
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.infiniteScroll);
    this.fetchData(this.state.page);
  }

  infiniteScroll = () => {
    // End of the document reached?
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
    ) 
    {
      let newPage = this.state.page;
      newPage++;
      this.setState({
        page: newPage
      });
      
      this.fetchData(newPage);
    }
  }

  togglePopup = (newPerson,selectedPerson) => {  
    this.setState({currentPerson: newPerson});
    this.setState({selectedPersonId: selectedPerson})
    this.setState({  
         showPopup: !this.state.showPopup  
    });  
  }  

  // url to use: https://randomuser.me/api/?page=13&results=25&seed=abc

  fetchData = (pageNum) => {

    let peopleUrl = 'https://randomuser.me/api/?results=250&seed=abc&page='+pageNum;

    fetch(peopleUrl)
    .then(res=>res.json())
    .then(data => {
      console.log(data);
      this.setState({
        people: [...this.state.people,...data.results]
      })
    })
  }

  render () {
  return (
    <div className="App">
    <div className="outputDiv">
     {this.state.people.map((peopledata,idx) => (<Person key={idx} personID={idx} person={peopledata} selected={peopledata.id===this.state.selectedPerson} togglePopup={this.togglePopup} />))}
     
     {this.state.showPopup  ? <ContactPerson selectedPerson={this.state.currentPerson} togglePopup={this.togglePopup}/> : null} 
     </div>
    </div>
  );
}
}

export default App;
