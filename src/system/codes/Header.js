import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import { WcImg } from './WcResource';

export default class Header extends Component {

    render() {
        const titleStyle = {color: this.props.textColor};
        const headerStyles = {backgroundColor: this.props.background};

        const hasTitle = this.props.title;
        const hasLogo = this.props.manufacturerLogo;

        return (
            <div className="wc-row-eq-height" style={headerStyles}>
                    {hasTitle !== "" &&
                    <div className="wc-half-width">
                        <div className="wc-header-title">
                            <h1 style={titleStyle}>{this.props.title}</h1>
                        </div>
                    </div>}

                   {hasLogo &&
                    <div className="wc-header-logo wc-half-width">
                        <NavLink to="/">
                           <WcImg alt={"Showcase " + this.props.moduleName} src={this.props.manufacturerLogo}/>
                        </NavLink>
                    </div>}
            </div>
        );
    }
};



