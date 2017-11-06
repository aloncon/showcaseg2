import React from 'react';
import { withRouter } from 'react-router';
import manufacturerLogo from '../assets/images/SYM-BLK.png';
import Header from '../../system/codes/header.js';
import { observer } from 'mobx-react';
import configuration from '../configuration';



class ShowcaseHeader extends React.Component {

	render() {
		// const { configuration } = this.props;
		const pathname = this.props.location.pathname;

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

export default withRouter(observer(ShowcaseHeader));
  
