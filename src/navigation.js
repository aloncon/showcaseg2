import React from 'react';
import { NavLink } from 'react-router-dom';


class navBarHorizontal extends React.Component{
    render(){
        return (
            <div className="wcContainer">
             <nav className="navbar navbar-default">
                <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    </button>
                    <NavLink to="./ShowcaseApp" className="navbar-brand" >HOME</NavLink>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                  <ul className="nav navbar-nav">
                    <li className="active"><NavLink to="/">Symantec Showcase</NavLink></li>
                    <li><NavLink to="/EndpointManagement">Endpoint Management</NavLink></li>
                    <li><NavLink to="/page3">Page 3</NavLink></li>
                    <li><NavLink to="/EndpointSolutions">Endpoint Solutions</NavLink></li>
                    <li><NavLink to="/iframe">iframe</NavLink></li>
                    <li><NavLink to="/testingArea">testingArea</NavLink></li>
                  </ul>
                </div>
                </div>
             </nav>
       <hr/>


            </div>
        );
    }
}


export default navBarHorizontal;