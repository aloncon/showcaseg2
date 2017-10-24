import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import providedBy from './resources/powered-by.png';


class ShowcaseFooter extends Component{

  
  render() {
    return(
      <span id="wc-reset"> 
            <div className="Footer">
                <div className="wc-powered-by"><img ref="pb" alt="Powered by Webcollage" height="20" src={providedBy} title="Powered by Webcollage" width="150"/></div>       
            </div>
        </span>

    );
  }
}

export default ShowcaseFooter;