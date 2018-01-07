import React from 'react';
import WcpcAssortment from '../../system/codes/WcpcAssortment'
import ActionLink from '../../system/codes/ActionLink'
// import WcpcContent from '../../system/codes/WcpcContent'
 import CategoryList from '../../system/codes/list/CategoryList'
import ProductListing from '../../system/codes/list/ProductListing'

const ids = [
    "Business-Networking-Smart-Managed-Switch",
    "Business-Networking-Access-Point",
    "Business-Networking-Smart-Managed-Switch"
];

class EndpointSolution extends React.Component {

    render() {
        return(
            <div>
                {/* <WcpcAssortment ids={ids}> */}
                    <h2>Testing Area 2</h2>
                    <CategoryList ids={ids}/>
                {/* </WcpcAssortment> */}
            </div>    
        );
    }
}



export default EndpointSolution;