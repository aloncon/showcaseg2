import React from 'react';
import PropTypes from 'prop-types';
import ProductListing from '../../system/codes/list/ProductListing';
import { Link } from 'react-router-dom';

class Page3 extends React.Component {

    componentDidMount() {
        
              //this.context.mixpanel.track('Page Loaded', { pageName: 'Test - App' });
              // this.context.mixpanel.track('App, componentDidMount');
            //   console.info(`"App, componentDidMount" sent!`);
           }

    render() {

        return(
            <div>
            <p>
               Click to go to <Link to="/page3/home-networking">Home Networking</Link>
               <br/>
               Click to go to <Link to="/page3/page3-child1">Page 3 Child 1</Link>
               <br/>
               Click to go to <Link to="/page3/page3-child2">Page 3 Child 2</Link>
            </p>
               <ProductListing type="carousel" ids={["Carusel-Data"]} slidesToShow={4}/>

            </div>
        );
    }
}

Page3.contextTypes = {
    mixpanel: PropTypes.object.isRequired,
 };

export default Page3;