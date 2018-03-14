import React from 'react';
import ProductListing from '../../system/codes/list/ProductListing';
import { Link } from 'react-router-dom';

class Page3 extends React.Component {
    render() {

        return(
            <div>
            <p>
               Click to go to <Link to="/page3/home_networking">Home Networking</Link>
               <br/>
               Click to go to <Link to="/page3/page3Child1">Page 3 Child 1</Link>
               <br/>
               Click to go to <Link to="/page3/page3Child2">Page 3 Child 2</Link>
            </p>
               <ProductListing type="carousel" ids={["Carusel-Data"]} slidesToShow={4}/>

            </div>
        );
    }
}

export default Page3;