import React from 'react';
import { withRouter } from 'react-router';
import Header from '../../system/codes/Header.js';
import configuration from '../../system/codes/configuration';


class ShowcaseHeader extends React.Component {
      render() {

        const pathname = this.props.location.pathname;
        const route = configuration.staticRoutes.getRoutes().find(element => element.path === pathname);
        const pageName  = route ? route.title : '';

        let nameToShow = pageName ? pageName : configuration.headerDetails.headerTitle ? configuration.headerDetails.headerTitle : ' ';

          return (
            <Header
                title={nameToShow}
                moduleName={configuration.moduleName}
                manufacturerLogo={configuration.headerDetails.imgLogo}
                landingpageRouteID={configuration.staticRoutes.getLandingpageRouteID()} />
          )
      }
  }

  export default withRouter(ShowcaseHeader);