import React from 'react';
import ProductListing from '../../system/codes/list/ProductListing';


class Page3 extends React.Component {
    render() {

        return(
            <div>
               <ProductListing type="carousel" ids={["Carusel-Data"]} slidesToShow={3} carouselHeight='350px'/>

            </div>
        );
    }
}

export default Page3;