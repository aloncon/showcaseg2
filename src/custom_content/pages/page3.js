import React from 'react';
import '../../system/style/index.css';
import { Announcements } from '../modules/Announcements';

// import Listing from '../../system/codes/productlisting';
// import ProductListing from '../../system/codes/productListingTest3';
import CategoryList from '../modules/CategoryList'
import ProductListing from '../../system/codes/ProductListing'  



class Page3 extends React.Component {
    render() {

        return(
            <div>
                <h1>Listings Testing: </h1>

                <div style={{width:'100%'}}>
                  {/* <center>
                        <Announcements />
                 </center> */}

                </div>
                <br/>
                <br/>
                <div className="wcProductListing">
                <h2>Carousel Listing:</h2>
                <ProductListing type='Carousel' ids={['carouselTest']} slidesToShow={3}/>
                <h2>Vertical Carousel Listing:</h2>
                <ProductListing type='Carousel' ids={['carouselTest']} vertical={true} slidesToShow={3} carouselWidth={'250px'} carouselHeight={'600px'} productHeight={'200px'}/> 
                <br/>
                <h2>Category Listing: Wide and Grid</h2>
                    <CategoryList ids={["Business-Networking-Unmanaged-Switch","test3"]}/>
                    

                   {/* <Listing list="1430315725083|1430312432542|1430312367318|1430311989860|1430312567373|1430312143801|1430312306400|1430312637682"/> */}

                   {/* <ProductListing prefix="Business-Networking" caption={["Unmanaged Switch","Smart Managed Switch","Smart Managed Pro Switch","Access Point","Network Attached Storage"]} /> */}

                </div>

                {/* <h3>Page 3 + ||{typeof this.props.store} ||</h3>
                <h3>Page 3 </h3>
                <h3>Page 3 </h3>
                <h3>Page 3 </h3>
                <h3>Page 3 </h3>
                <h3>Page 3 </h3>
                <h3>Page 3 </h3>
                <h3>Page 3 </h3> */}

            </div>
        );
    }
}

export default Page3;