import React, { Component } from 'react';
import Listing from '../modules/productlisting';

class ListingCategory extends Component {



  render() {
    return (
      
      <div className="category-list-group">
       <u>Category Listing 1 </u>
       <Listing caption="Routers" description="blab lala la l" list="1430315725083|1430312432542|1430312367318|1430311989860|1430312567373|1430312143801|1430312306400|1430312637682"/>
       <u>Category Listing 2 </u>
       <Listing caption="Routers" description="blab lala la l" list="1430315725083|1430312432542|1430312367318|1430311989860|1430312567373|1430312143801|1430312306400|1430312637682"/>
       <u>Category Listing 3 </u>
       <Listing caption="Routers" description="blab lala la l" list="1430315725083|1430312432542|1430312367318|1430311989860|1430312567373|1430312143801|1430312306400|1430312637682"/>

      </div>
    );
  }
}



export default ListingCategory;

