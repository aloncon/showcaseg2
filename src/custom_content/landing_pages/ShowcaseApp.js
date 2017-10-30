import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import '../../system/style/index.css';
import { Wcan } from '../modules/Announcments';
import Announcments2 from '../modules/Announcment2';


class ShowcaseBodyHeader extends React.Component{
  render() {
    return (
      <div className="ShowcaseBody">
            <h2>Webcollage (test) Showcase</h2>
            <center> 
            <Wcan />
            </center> 
            <br/>
            <p>
              Lorem ipsum dolor sit amet, ac vulputate adipiscing consectetuer odio platea, ut ultrices eos, urna cubilia molestie est, dui ipsum nulla mauris et, pede magna montes porttitor. Penatibus at egestas natoque nullam neque mollis, in nec dui dui, pede elementum nec eget porta pellentesque, ornare tempor malesuada scelerisque aliquam neque sodales, morbi vitae elit mi non placerat diam. Dolor magna dictumst condimentum nulla sed. At hendrerit a adipiscing. Malesuada diam pede id, sed dictum sodales. Fusce porttitor cursus, sed vestibulum, non elit arcu vitae ligula. Tempus libero nam donec purus at pellentesque, lectus pede, tincidunt est curabitur ultricies ipsum. Lorem habitasse fusce pharetra, suspendisse dis, nullam morbi in, velit convallis dignissimos tincidunt varius nec ullamcorper. Molestie risus dapibus. Purus arcu tortor suspendisse sit nam, leo justo sit velit sem ut, lacinia at ac, et risus integer magna est at posuere, mi lobortis rhoncus magna nullam neque. Rutrum cursus elit morbi, ut rutrum commodo ante.
            </p>
            
            <Announcments2 />
            <br/><br/>
      </div> 
    );
  }
}

class ShowcaseBody extends React.Component {
  render() {
    return (
      <div>
        <div className="App-intro">
          <u>Body Content (showcaseBody) ..... </u> 
          <div>
          <ul>
            <li>
              <NavLink to="/ProductListing1"> Link to Product Listing 1  </NavLink>
            </li>
            <li>category ..</li>
            <li>category ..</li><li>category ..</li><li>category ..</li><li>category ..</li><li>category ..</li><li>category ..</li><li>category ..</li><li>category ..</li><li>category ..</li><li>category ..</li><li>category ..</li><li>category ..</li><li>category ..</li><li>category ..</li><li>category ..</li>
          </ul>
          </div>
        </div>
      </div>  

    );
  }
}


class ShowcaseApp extends Component {
  render() {
    return (
      <div className="Showcase" id="wc-reset">
        
        <ShowcaseBodyHeader />
        <ShowcaseBody />

      </div>

    );
  }
}

export default ShowcaseApp;
