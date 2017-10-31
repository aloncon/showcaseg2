import React from 'react';
import '../../system/style/index.css';
import { Wcan } from '../modules/Announcments';
import Listing from '../modules/productlisting';



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
                <div className="productListing">

                 
                   <Listing list="1430315725083|1430312432542|1430312367318|1430311989860|1430312567373|1430312143801|1430312306400|1430312637682"/>

                </div>

                <h3>Page 3 +  </h3>
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