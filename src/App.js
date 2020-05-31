import React, {Component} from 'react';
import './App.css';
import Person from './components/Person';
import Header from './components/Header';

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
        showFilters: false,
        abvLevel : 1,
        page: 1,
        gender: '',
        nationality: [
          {id: 1, value: "AU", isChecked: false},
          {id: 2, value: "BR", isChecked: false},
          {id: 3, value: "CA", isChecked: false},
          {id: 4, value: "CH", isChecked: false},
          {id: 5, value: "DE", isChecked: false},
          {id: 6, value: "DK", isChecked: false},
          {id: 7, value: "ES", isChecked: false},
          {id: 8, value: "FI", isChecked: false},
          {id: 9, value: "FR", isChecked: false},
          {id: 10, value: "GB", isChecked: false},
          {id: 11, value: "IE", isChecked: false},
          {id: 12, value: "IR", isChecked: false},
          {id: 13, value: "NO", isChecked: false},
          {id: 14, value: "NL", isChecked: false},
          {id: 15, value: "NZ", isChecked: false},
          {id: 16, value: "TR", isChecked: false},
          {id: 17, value: "US", isChecked: false},
        ],
        nationalities: []
    }
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.infiniteScroll);
    this.fetchData(this.state.page,this.state.gender,this.state.nationalities);
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
      
      this.fetchData(newPage,this.state.gender,this.state.nationalities);
    }
  }

  setGender = (g) => {
    this.setState({
      showPopup: false,
      gender: g, 
      people: [],
      currentPerson: {},
      page: 1          
    })
    this.fetchData(1,g,this.state.nationalities);
 }

 handleAllChecked = (checkedBool) => {
  let stateNationalities = this.state.nationality
  stateNationalities.forEach(nationality => nationality.isChecked = checkedBool) 
  this.setState({nationality: stateNationalities});
  this.setState({
    showPopup: false,
    people: [],
    currentPerson: {},
    page: 1          
  })
  this.fetchData(1,this.state.gender,this.state.nationalities)
 }

 handleCheckChildElement = (countryName,checkedBool) => {   
   let stateNationalities = this.state.nationalities;
   let nationalities = this.state.nationality;
      nationalities.forEach(nationality => {     
        if (nationality.value === countryName) {       
        nationality.isChecked =  checkedBool
        if(nationality.isChecked){
        if(!stateNationalities.includes(countryName)) stateNationalities.push(countryName);
        } else {
          if(stateNationalities.indexOf(countryName)!==-1){
         stateNationalities.splice(stateNationalities.indexOf(countryName),1);
        }
        }
        }
        })
        this.setState({
          showPopup: false,
          people: [],
          currentPerson: {},
          page: 1          
        })
      this.setState({nationalities:stateNationalities});   
      this.setState({nationality: nationalities});
      this.fetchData(1,this.state.gender,stateNationalities);
}

  toggleFilters = () => {
    this.setState({
      showFilters: !this.state.showFilters
    })
  }

  togglePopup = (newPerson,selectedPerson) => {  
    this.setState({currentPerson: newPerson});
    this.setState({selectedPersonId: selectedPerson})
    this.setState({  
         showPopup: !this.state.showPopup  
    });  
  }  

  // url to use: https://randomuser.me/api/?page=13&results=25&seed=abc

  fetchData = (pageNum,g,nationality) => {
    let natStr=nationality.join(",")
    let peopleUrl = `https://randomuser.me/api/?results=50&page=${pageNum}&gender=${g}&nationality=${natStr}`;

    fetch(peopleUrl)
    .then(res=>res.json())
    .then(data => {
      this.setState({
        people: [...this.state.people,...data.results]
      })
    })
  }

  render () {
    let results;
    if (this.state.people.length>0) {
      results= this.state.people.map((peopledata,idx) => (<Person key={idx} personID={idx} person={peopledata} selected={peopledata.id===this.state.selectedPersonId} togglePopup={this.togglePopup} />))
    }
  return (
    <div className="App">
    <Header showPopup={this.state.showPopup} toggleFilters={this.toggleFilters} showFilters={this.state.showFilters} handleAllChecked={this.handleAllChecked} handleCheckChildElement={this.handleCheckChildElement} nationality={this.state.nationality} gender={this.state.gender} setGender={this.setGender} currentPerson={this.state.currentPerson} togglePopup={this.togglePopup} />
    <div className="outputDiv">
      {results}     
    </div>
    </div>
  );
}
}

export default App;
