import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import { WcImg } from './WcResource';

export default class Header extends Component {

    render() {
        const titleStyle = {color: this.props.textColor};
        const headerStyles = {
            backgroundColor: this.props.background,
            marginBottom: this.props.marginBottom
        };

        let title = this.props.title;
        let logo = this.props.manufacturerLogo;
        
        return (
            <div className="wc-header wc-row-eq-height" style={headerStyles}>
            
                    <div className="wc-half-width">
                        <div className="wc-header-title">
                            <h1 style={titleStyle}>{title}</h1>
                        </div>
                    </div>
                   
                    <div className="wc-header-logo wc-half-width">
                        <NavLink to="/">
                           <WcImg alt={"Showcase " + this.props.moduleName} src={logo}/>
                        </NavLink>
                    </div>
            </div>
        );
    }
};



