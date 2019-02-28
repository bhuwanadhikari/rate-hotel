import React from 'react';
import './Search.css';
import searchIcon from '../../img/navImg/search.svg'

//Make class based
const Search = () => {
   return(
      <form className="SearchForm">
         <input type="text" className="textbox" placeholder="Search Under Construction"/>
         <button title="Search" value="" type="submit" className="SearchButton">
            <img className="AuthNavIcon" src={searchIcon} alt="Search Icon of CrowApp"/>
         </button>
      </form>
)
};


export default Search;
