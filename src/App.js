import React, {Component} from 'react';
import './App.css';

class Person extends Component {
  constructor(props) {
    super (props);

    this.state ={
      selected : false
    }
  }

  render() {
    console.log(this.props.person.thumbnail);
    return (
      <div className="personTile">
        <img className="personPic" src={this.props.person.picture.medium} alt=""/>
        <p style={{fontSize:'10pt'}}>{this.props.person.name.title} {this.props.person.name.last} {this.props.person.name.last}</p>
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
     {this.state.people.map((peopledata,idx) => (<Person key={idx} personID={idx} person={peopledata} selected={peopledata.id===this.state.selectedPerson} />))}
     
     </div>
    </div>
  );
}
}

export default App;
