import React, {Component} from 'react';
import './App.css';
import closeButton from './img/redX.png';
import logo from './img/logo.jpg';
import cell from './img/cell.png';
import phone from './img/phone.png';
import mail from './img/mail.png';
import email from './img/email.png';
import female from './img/female.png';
import male from './img/male.png';
import globe from './img/globe.png';
import title from './img/title.png';

class CheckBox extends Component {

handleCheckChildElement = (event) => {
  this.props.handleCheckChildElement(event.target.value,event.target.checked);
}

render() {
  return (
    <li style={{display:'inline-block'}}>
     <input key={this.props.id} onChange={(e)=>this.handleCheckChildElement(e)} type="checkbox" checked={this.props.isChecked} value={this.props.value} />{this.props.value}&nbsp; 
    </li>
  )
}
}

class Filter extends Component {

  setGender = (e) => {
    this.props.setGender(e.target.name);
  }

  render() {
    return(
      <div>
        <img name ="male" alt="" src={male} style={{width:'30px'}} onClick={(e) => this.setGender(e)} />
        <img name="female" alt="" src={female} style={{width:'30px'}} onClick={(e)=> this.setGender(e)} />
        <img name="globe" alt="" src={globe} style={{width:'30px'}} />
      </div>
    )
  }
}

class Header extends Component {

  togglePopup = () => {
    this.props.togglePopup();
  }

  handleAllChecked = (e) => {
    this.props.handleAllChecked(e.target.checked);
  }

  render() {
    return(
      <div className="header">
        <img src={logo} style={{height:'140px',float:'left',padding:'5px'}} alt=""/>
        <img src={title} alt="" style={{marginTop:'10px'}} /><br/>
        <div>
        <Filter setGender={this.props.setGender} />
        <input style={{display:'inline-block'}} type="checkbox" onClick={(e)=> this.handleAllChecked(e)}  value="checkedall" />All
        <ul style={{display:'inline-block',marginLeft:'-30px'}}>
        {
          this.props.nationality.map((country) => {
            return (<CheckBox  id={country.id} key={country.id} handleCheckChildElement={this.props.handleCheckChildElement}  {...country} />)
          })
        }
        </ul>
        </div>
       
        {this.props.showPopup  ? <ContactPerson selectedPerson={this.props.currentPerson} togglePopup={this.togglePopup}/> : null} 
      
      </div>
    )
  }
}

class ContactPerson extends Component {

  hidePanel = () => {
    this.props.togglePopup()
  }

    render() {
    return(
      <div className="windowPane">
          <div id="closeButton" style={{position: 'absolute',top:'5px',right:'5px'}}>
          <img src={closeButton} alt="" style={{width:'30px'}} onClick={this.hidePanel} />
          </div>
          <fieldset style={{fontSize:'10pt'}}>
            <legend>{this.props.selectedPerson.name.first} {this.props.selectedPerson.name.last}</legend>
          <img src={this.props.selectedPerson.picture.large} style={{float:'left',paddingRight:'5px',height:"100px"}} alt=""/>
          <div style={{display:'flex',verticalAlign:'middle',lineHeight:'20px',fontSize:'10pt'}}><img src={email} alt="email:" style={{width:'20px',paddingRight:'5px'}} /> {this.props.selectedPerson.email}</div>
          <img src={mail} style={{width:'20px',paddingRight:'5px',float:'left'}} alt="mail:"/>
          <div style={{fontSize:'10pt',display:'flex'}}>
          {this.props.selectedPerson.location.street.number} {this.props.selectedPerson.location.street.name}<br/>
          {this.props.selectedPerson.location.city} {this.props.selectedPerson.location.state}<br/>
          {this.props.selectedPerson.location.country}<br/>
          {this.props.selectedPerson.location.postcode}<br/>
          </div>
          <div style={{verticalAlign:'middle',lineHeight:'20px',display:'flex',fontSize:'10pt'}}>
          <img src={phone} style={{width:'20px',paddingRight:'4px'}} alt="phone:" /> {this.props.selectedPerson.phone} 
          <img src={cell} style={{width:'20px',paddingLeft: '10px',paddingRight:'4px'}} alt="cell:" /> {this.props.selectedPerson.cell}
          </div>
          </fieldset>
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
   console.log(countryName);
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
    console.log(natStr);
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
      results= this.state.people.map((peopledata,idx) => (<Person key={idx} personID={idx} person={peopledata} selected={peopledata.id===this.state.selectedPerson} togglePopup={this.togglePopup} />))
    }
  return (
    <div className="App">
    <Header showPopup={this.state.showPopup} handleAllChecked={this.handleAllChecked} handleCheckChildElement={this.handleCheckChildElement} nationality={this.state.nationality} gender={this.state.gender} setGender={this.setGender} currentPerson={this.state.currentPerson} togglePopup={this.togglePopup} />
    <div className="outputDiv">
      {results}     
    </div>
    </div>
  );
}
}

export default App;
