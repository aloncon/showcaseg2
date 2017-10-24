import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import manufactorlogo from './resources/logo-ko.png';


class ShowcaseHeader extends React.Component {
 render() {
   return (
        <div className="showcase-header">
           <div className="wc-cus-header">
					  <NavLink to="/">
						<img alt="Showcase Webcollage" src={manufactorlogo}/>
					  </NavLink>
			     </div>
        </div>
   );
 }
}

export default ShowcaseHeader;