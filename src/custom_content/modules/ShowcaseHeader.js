import React from 'react';
import { withRouter } from 'react-router';
import Header from '../../system/codes/Header.js';
import configuration from '../configuration';


class ShowcaseHeader extends React.Component {
      render() {
        const pathname = this.props.location.pathname;
        let pageName = configuration.staticRoutes.find(element => element.path === pathname).title;
        let nameToShow = pageName ? pageName : configuration.headerDetails.headerTitle;

          return (
            <Header 
                title={nameToShow} 
                moduleName={configuration.moduleName} 
                manufacturerLogo={configuration.headerDetails.imgLogo} 
                background={configuration.headerDetails.backgroundColor} 
                textColor={configuration.headerDetails.textColor}/>
          )
      }
  }

  export default withRouter(ShowcaseHeader);