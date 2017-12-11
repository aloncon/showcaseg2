import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import { WcImg } from './WcResource';
import'../style/header.css';
import {displayHeader} from './moduleInfo';

export default class Header extends Component {

    render() {
        let title = this.props.title;
        let logo = this.props.manufacturerLogo;
       
        if(displayHeader){
            return (
                <div className="wcHeader">
            
                        <div className="wcHeaderTitle">
                                <h1>{title}</h1>
                        </div>
                    
                        <div className="wcHeaderLogo">
                            <NavLink to="/">
                            <WcImg src={logo}/>
                            </NavLink>
                        </div>
                </div>
            );
        }
        else return(null)
        
    }
};



