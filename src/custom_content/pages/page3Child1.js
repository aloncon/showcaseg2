import React from 'react';
import ProductListing from '../../system/codes/list/ProductListing';
import CategoryList from '../../system/codes/list/CategoryList';

const Page3Child1 = () => {
  return (
      <div>
         <div className="bt-row">
            <div className="bt-col-sm-3">Left side</div>
            <div className="bt-col-sm-9">
               <h3>Page 3 child 1 </h3>
            </div>
         </div>
         <div>
            <ProductListing type="carousel" ids={['Home-Networking-Router']} slidesToShow={3} carouselHeight="350px" />
            <CategoryList ids={['Business-Networking-Unmanaged-Switch']} />
         </div>
      </div>
  );
};

export default Page3Child1;
