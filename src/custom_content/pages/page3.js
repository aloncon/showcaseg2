import React from 'react';
import '../../system/style/index.css';
import { Wcan } from '../modules/Announcments';

import Listing from '../../system/codes/productlisting';
import ProductListing from '../../system/codes/productListingTest3';




class Page3 extends React.Component {
    render() {

        return(
            <div>
                <h3>Page 33333 </h3>

                <div style={{width:'100%'}}>
                  <center>
                        <Wcan />
                 </center>

                </div>
                <div className="wcProductListing">


                   <Listing list="1430315725083|1430312432542|1430312367318|1430311989860|1430312567373|1430312143801|1430312306400|1430312637682"/>

                   <ProductListing prefix="Business-Networking" caption={["Unmanaged Switch","Smart Managed Switch","Smart Managed Pro Switch","Access Point","Network Attached Storage"]} />

                </div>

                <h3>Page 3 + ||{typeof this.props.store} ||</h3>
                <h3>Page 3 </h3>
                <h3>Page 3 </h3>
                <h3>Page 3 </h3>
                <h3>Page 3 </h3>
                <h3>Page 3 </h3>
                <h3>Page 3 </h3>
                <h3>Page 3 </h3>

            </div>
        );
    }
}

export default Page3;