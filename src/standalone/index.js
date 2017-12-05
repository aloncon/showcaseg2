import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import configuration from '../custom_content/configuration';
import '../system/style/standalone.css';
import { WcImg } from '../system/codes/WcResource';



export default class StandAlone extends Component{

  render() {

    let logo = configuration ? configuration.headerDetails.imgLogo : null;
    let moduleName = configuration ? configuration.moduleName : null;

    return(
      <div>
        <div className="wcPopupHeader">
          <div className="wcHeaderLogo">
             <WcImg src={logo} className="wcLogo"/>
          </div>
          <div className="wcProvidedBy">
                <a href="">
                  <span className="wcText">Close Window</span>
                </a>
             <br/>
             <span className="wcPrefix">Provided by </span>
             <span className="wcVendorName">{moduleName}</span>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <StandAlone />,
  document.getElementById('wc-showcase-root'),
);


