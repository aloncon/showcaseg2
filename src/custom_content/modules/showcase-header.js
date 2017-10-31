import React from 'react';
import manufacturerLogo from '../assets/images/SYM-BLK.png';
import Header from '../../system/codes/header.js';
import configuration from '../configuration';


export default class ShowcaseHeader extends React.Component {

      render() {
          return (
            <Header 
            title={configuration.headerDetails.headerTitle} 
            moduleName={configuration.moduleName} 
            manufacturerLogo={manufacturerLogo} 
            background={configuration.headerDetails.backgroundColor} 
            textColor={configuration.headerDetails.textColor}/>
          )
      }
  }
  
