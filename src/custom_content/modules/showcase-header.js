import React from 'react';

import manufacturerLogo from '../assets/images/SYM-BLK.png';
import Header from '../../system/codes/header.js';
import configuration from '../configuration';


class ShowcaseHeader extends React.Component {

	render() {
	  console.log("config", configuration);
		const pathname = this.props.location.pathname;
		const route = configuration.staticRoutes.find(route => route.path === pathname);
		let title;
		if (route) {
			title = route.name;
		} else {
			title = configuration.headerDetails.headerTitle;
		}

		return (
      <Header
        title={title}
        moduleName={configuration.moduleName}
        manufacturerLogo={manufacturerLogo}
        background={configuration.headerDetails.backgroundColor}
        textColor={configuration.headerDetails.textColor}/>
		)
	}
}

export default withRouter(ShowcaseHeader);
  
