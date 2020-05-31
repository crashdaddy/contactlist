import React, {Component} from 'react';
import logo from '../img/logo.jpg';
import female from '../img/female.png';
import male from '../img/male.png';
import globe from '../img/globe.png';
import title from '../img/title.png';
import ContactPerson from './ContactPerson';

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
        if (this.props.gender===e.target.name) {
          this.props.setGender('');
        } else this.props.setGender(e.target.name);
      }
    
      render() {
        return(
          <div>
            <img name ="male" alt="" src={male} style={{width:'30px'}} onClick={(e) => this.setGender(e)} />
            <img name="female" alt="" src={female} style={{width:'30px'}} onClick={(e)=> this.setGender(e)} />
            <img name="globe" alt="" src={globe} style={{width:'30px'}} onClick={this.props.toggleFilters} />
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
        let displayStyle={display: 'none'};
    
        if (this.props.showFilters) {
          displayStyle = {display:'inline-block'};
        }
        return(
          <div className="header">
            <img src={logo} style={{height:'140px',float:'left',padding:'5px'}} alt=""/>
            <img src={title} alt="" style={{marginTop:'10px'}} /><br/>
            <div>
            <Filter setGender={this.props.setGender} gender={this.props.gender} toggleFilters={this.props.toggleFilters} />
            <div style={{display:'inline-block',marginTop:'-30px'}}>
            <input style={displayStyle} type="checkbox" onClick={(e)=> this.handleAllChecked(e)}  value="checkedall" /><span style={displayStyle} >All</span>
            <ul style={displayStyle}>
            {
              this.props.nationality.map((country) => {
                return (<CheckBox  id={country.id} key={country.id} handleCheckChildElement={this.props.handleCheckChildElement}  {...country} />)
              })
            }
            </ul>
            </div>
            </div>
           
            {this.props.showPopup  ? <ContactPerson selectedPerson={this.props.currentPerson} togglePopup={this.togglePopup}/> : null} 
          
          </div>
        )
      }
    }

    export default Header;