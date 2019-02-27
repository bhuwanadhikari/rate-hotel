import React, {Component} from 'react';
import '../CommonCSS.css';

class SettingsAndPrivacy extends Component {
   render() {
      return (
         <div className={`CommonBox`}>
            <div className="CommonTitle">Privacy Policy of CrowApp</div>

            <div className="CommonParagraph">
               This privacy policy has been assembled by the CrowApp Team to clarify how user's
               ‘Personally Identifiable Information’
               (PII) is being used online. PII, as used in US privacy law and information
               security, is information that can be used on its own or with other information
               to identify, contact, or locate a single person, or to identify an individual in
               context. Please read our privacy policy carefully to get a clear understanding
               of how we collect, use, protect or otherwise handle your Personally Identifiable
               Information in accordance with our website.
            </div>

            <div className="CommonHeading">
               What personal information do we collect from the
               people who crawl, register and login CrowApp's Site?
            </div>

            <div className="CommonParagraph">
               As per the input fields you see, you may be asked to enter your name, email, bio and location.
            </div>



            <div className="CommonHeading">
               Do we track your location?
            </div>
            <div className="CommonParagraph">
               Since, CrowApp is build only to rate and write reviews for hotels, we don't track
               location of users. We don't keep track of any personal information of user except the
               few mentioned above
            </div>



            <div className="CommonHeading">
               When do we collect your information?
            </div>
            <div className="CommonParagraph">
               -When you register as a CrowApp User from the login page. <br/>
               -When you rate with stars to a hotel. <br/>
               -when you write a review for a hotel. <br/>
            </div>



            <div className="CommonHeading">
               How do we use information that you gave to us?
            </div>
            <div className="CommonParagraph">
               -To show and update the rating of a hotel <br/>
               -To show reviews of the hotel written by you but your name will not be displayed. <br/>
            </div>



            <div className="CommonHeading">
               How do we protect your data and passwords?
            </div>
            <div className="CommonParagraph">
               The data you provided to us from CrowApp is merely used for CrowApp Platform.
               Your data and information are safely stored and are free from third party dealers. Passwords are encrypted and are securely stored in
               CrowApp's server.
            </div>


            <br/>
            <div className="Null">
               If you have any questions, we are always ready to address your curiosity. For that
               visit our About page to contact us or send us a feedback.
            </div>
         </div>
      );
   }
}


export default SettingsAndPrivacy;
