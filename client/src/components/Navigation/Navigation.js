import React from 'react';
import NavigationItems from './NavigationItems/NavigationItems';
import './Navigation.css';
import Logo from './Logo/Logo';

const Navigation = () => {
return (
   <header>
      <Logo/>
      <NavigationItems/>
   </header>
)
};

export default Navigation;