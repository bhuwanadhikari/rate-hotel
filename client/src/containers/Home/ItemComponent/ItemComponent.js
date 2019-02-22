import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class ItemComponent extends Component {
   render() {
      return (
         <div className="ICBox">
            <div className="ICHeading">
               Hotels with top ratings on tea
               <div className="ICMain">
                  rateviews
               </div>
            </div>
         </div>
      );
   }
}

ItemComponent.propTypes = {

};

function mapStateToProps(state) {
   return {};
}

export default connect(mapStateToProps,)(ItemComponent);
