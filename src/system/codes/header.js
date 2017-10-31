import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import WcResource from '../../WcResource';

export default class Header extends Component {

    render() { 
        const titleStyle = {color: this.props.textColor};
        const headerStyles = {backgroundColor: this.props.background};

        const hasTitle = this.props.title;
        const hasLogo = this.props.manufacturerLogo;

        let content;

        if(hasTitle !== '' && hasLogo !== undefined){
            content=( 
            <div className="wc-cus-header row row-eq-height" style={headerStyles}>
                    <div className="col-xs-6 header-title">
                        <h1 style={titleStyle}>{this.props.title}</h1>
                    </div>
                    <div className="col-xs-6 header-logo">
                        <NavLink to="/">
                            <WcResource>
                                <img alt={this.props.moduleName} src={hasLogo}/>
                            </WcResource>
                        </NavLink>
                    </div>
            </div>)}

        else if(hasTitle !== ''){
            content=(
            <div className="wc-cus-header row" style={headerStyles}>
                <div className="col-xs-12 header-title">
                    <h1 style={titleStyle}>{this.props.title}</h1>
                </div>
            </div>)}

        else if(hasLogo){
            content = (
            <div className="wc-cus-header row" style={headerStyles}>
                <div className="col-xs-12 header-logo">
                    <NavLink to="/">
                        <WcResource>
                            <img alt={"Showcase " + this.props.moduleName} src={this.props.manufacturerLogo}/>
                        </WcResource>
                    </NavLink>
                </div>
            </div>)}

        return (
        <div>
            <div className="showcase-header">
                  {content}
            </div>  
        </div>  
        );
    }
};



