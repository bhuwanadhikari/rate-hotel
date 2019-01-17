import React, {Component} from 'react';
import {connect} from 'react-redux';

class DoRating extends Component {
   render() {
      return (
         <div className= "DoRatingBox">
            <div className="EmojiBox">

               <div className="Emoji1Box">
                  <div className="Emoji"> </div>
                  <div className="EmojiLabel">Dislike It</div>
               </div>

               <div className="Emoji2Box">
                  <div className="Emoji"> </div>
                  <div className="EmojiLabel">Dislike It</div>
               </div>

               <div className="Emoji3Box">
                  <div className="Emoji"> </div>
                  <div className="EmojiLabel">Dislike It</div>
               </div>

               <div className="Emoji4Box">
                  <div className="Emoji"> </div>
                  <div className="EmojiLabel">Dislike It</div>
               </div>

               <div className="Emoji5Box">
                  <div className="Emoji"> </div>
                  <div className="EmojiLabel">Dislike It</div>
               </div>

            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {};
}

export default connect(mapStateToProps)(DoRating);
