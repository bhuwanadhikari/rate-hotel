import React from 'react';
import {NavLink} from 'react-router-dom'

const Help = () => {
   return (
      <div className={`CommonBox`}>

         <div className="CommonTitle">CrowApp's Help Desk</div>


         <div className="CommonParagraph">
            We provide you complete guidance about how to use CrowApp and it's features.
         </div>
         <div className="CommonHeading">Using CrowApp as a guest or without Logging In.</div>

         <div className="CommonParagraph">
            As a guest user, that means when the user hasn't signed in, he/she can
            see the list of all hotels but cannot see details of a particular hotel. Also,
            such user cannot rate or write a review for a hotel.
         </div>


         <div className="CommonHeading">Using CrowApp as an authenticated user or by Logging In.</div>

         <div className="CommonParagraph">
            As an authenticated user, that means when the user has signed in, he/she can
            see the list of all hotels as well as way more stuffs than by a guest user. He/She
            can see top rated hotels in different categories. Also, recently added hotels are only accessible
            to authenticated users. User can edit and update his/her profile too. Also, such user can see all
            the details of a hotel and can rate and write a review for them in different aspects.
         </div>

         <div className="CommonHeading">How to add a new hotel?</div>

         <div className="CommonParagraph">
            Anyone can add a new hotel by submitting necessary details of a hotel. CrowApp
            team will scrutinize it and incase some fault is found, then the hotel will be deleted
            by the team. This has to be done for not giving a place for fake hotels.
         </div>

         <div className="CommonHeading">How to contact CrowApp Team?</div>

         <div className="CommonParagraph">
            You can contact us by visiting our <NavLink to={'/about-us'}>About</NavLink> page. You can either send us a message or
            directly contact developers.
         </div>



      </div>
   );
};

export default Help;
