import React, {Component} from 'react';
import closeButton from '../img/redX.png';
import cell from '../img/cell.png';
import phone from '../img/phone.png';
import mail from '../img/mail.png';
import email from '../img/email.png';

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

  export default ContactPerson;