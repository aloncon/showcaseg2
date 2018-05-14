import React from 'react';
import ActionLink from '../../system/codes/ActionLink';
// import Listing from '../modules/productlisting';

class home_networking extends React.Component {
   render() {
      return (
         <div>
            <h3>Endpoint Solution</h3>
            <h3>Endpoint Solution</h3>
            <h3>Endpoint Solution</h3>
            <h3>Endpoint Solution</h3>
            <hr/>
            <ActionLink wcpc="colorqube8700x" type="p2b" unlink={true}>
               <h3>Test ActionLink with WPCPC: colorqube8700x</h3>
            </ActionLink>
            <ActionLink wcpc="colorqube8700x" type="p2b" unlink={true}>
               <h3>Test Duplicated ActionLink with WPCPC: colorqube8700x</h3>
            </ActionLink>
            <ActionLink wcpc="1459967365834" type="p2b" unlink={true}>
               <h3>Test ActionLink with WPCPC: 1459967365834</h3>
            </ActionLink>
            <ActionLink wcpc="TEST_WCPC" type="p2b" unlink={true}>
               <h3>Test ActionLink with WPCPC: TEST_WCPC</h3>
            </ActionLink>
            {/* <div className="wcProductListing">



                <CategoryList caption="" description="">
                 <Listing caption="Routers" description="blab lala la l" list="1430315725083|1430312432542|1430312367318|1430311989860|1430312567373|1430312143801|1430312306400|1430312637682"/>
                 <Listing caption="chipes" description="blab lala la l" list="1430315725083|1430312432542|1430312367318|1430311989860|1430312567373|1430312143801|1430312306400|1430312637682"/>
                 <Listing caption="salsa" description="blab lala la l" list="1430315725083|1430312432542|1430312367318|1430311989860|1430312567373|1430312143801|1430312306400|1430312637682"/>
                </CategoryList>

               </div> */}
         </div>
      );
   }
}

export default home_networking;
