import React from 'react';
import Modal from '../../../components/ui/Modal/Modal';
import Feedback from '../../../components/Navigation/NavigationItems/AuthNavigationItem/NavAccount/Feedback';


class AboutUs extends React.Component{

   constructor(){
      super();
      this.state = {
         showContactModal: false,
      }
   }
   onBackDropClickHandler = ()=>{
      this.setState({showContactModal: false});
   };
   render() {

      return (
         <div className={`CommonBox`}>

            <div className="CommonTitle">About CrowApp</div>
            <Modal show={this.state.showContactModal} modalClosed={this.onBackDropClickHandler} fromTop = '20%'>
               <Feedback modalClosed={this.onBackDropClickHandler} feedbackHeading={"Contact Us"}/>
            </Modal>

            <div className="CommonParagraph">
               CrowApp is an open source webapp with which a user can add a new hotel, rate a hotel and
               write a review for hotel and can
               see their received ratings and reviews.
            </div>
            <div className="CommonTitle">About Developers</div>
            <li className={"CommonList"}>
               <a target="blank" href="bhuwan">Bhuwan Adhikari</a>: Full Stack Developer
            </li>
            <li className={"CommonList"}>
               <a target="blank" href="jiwan">Jiwan Sapkota</a>: FrontEnd Developer
            </li>
            <li className={"CommonList"}>Dipak Bastola: Designer</li>
            <li className={"CommonList"}>Anup BK: Project Manager</li>

            <div className="CommonTitle" style={{marginTop: '10px'}}>Contact Us</div>

            <div className="CommonParagraph">
               <b>CrowApp 1.1.0</b> <br/>
               Pokhara-19, Lamachaur <br/>
               Gandaki, Nepal <br/>
               33700 <br/>
               Send Us Message <span className={"ContactLink"} onClick={()=>this.setState({showContactModal: true})}>HERE</span>. <br/>
               Or Directly contact developers
            </div>

            <div className="CommonTitle" style={{marginTop: '10px'}}>For CrowApp Development we use:</div>

            <div className="CommonParagraph">
               <b>Operating System-</b>Windows 10<br/>
               <b>Programming Languages-</b>Javascript, HTML, CSS<br/>
               <b>IDE-</b>Jetbrains' Webstorm<br/>
               <b>FrontEnd Framework-</b>ReactJS<br/>
               <b>Backend-</b>ExpressJS on top of NodeJS<br/>
               <b>Database-</b>MongoDB(MLab)<br/>
               <b>State Mgmt System-</b>Redux<br/>
               <b>Browser-</b>Chrome, Firefox, Edge<br/>
               <b>API Development Environment-</b>Postman<br/>
               <b>Responsiveness Tester-</b>Responsinator, Chrome, Firefox<br/>
               <b>Verson Control-</b>Git and Github<br/>
               <b>Cloud Deployment-</b>Amazon Web Services, Heroku<br/>
            </div>

         </div>

      );
   }
};

export default AboutUs;
