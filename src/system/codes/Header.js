import { withRouter, Link } from 'react-router-dom';
import React, { Component } from 'react';
import { WcImg } from './WcResource';
import'../style/header.css';
import ShouldDisplay from './ShouldDisplay';

class Header extends Component {

    render() {
        let title = this.props.title;
        let logo = this.props.manufacturerLogo;
        const landingpageRouteID = `/${this.props.landingpageRouteID}`;

        const pathname = this.props.location.pathname;
        let LogoLink = null;

        function handleClick(e){
            document.location.reload();
        }

        if (pathname === landingpageRouteID) {
            LogoLink = (<a href="" onClick={handleClick}>
                         <WcImg src={logo}/>
                       </a>)
        }
        else {
            LogoLink = (<Link to={landingpageRouteID}>
                         <WcImg src={logo}/>
                       </Link>)
        }

        return (
            <ShouldDisplay wc_section="include-showcase-banner">
                <div className="wcHeader">
                        <div className="wcHeaderTitle">
                            <h1>{title}</h1>
                        </div>
                        <div className="wcHeaderLogo">
                             {LogoLink}
                        </div>
                </div>
            </ShouldDisplay>
        );

    }
};

export default withRouter(Header);


