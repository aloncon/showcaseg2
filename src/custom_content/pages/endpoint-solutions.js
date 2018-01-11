import React from 'react';
import ShouldDisplay from '../../system/codes/ShouldDisplay'
import ActionLink from '../../system/codes/ActionLink'
import CategoryList from '../../system/codes/list/CategoryList'
import ProductListing from '../../system/codes/list/ProductListing'

const ids = [
    // "Business-Networking-Smart-Managed-Switch",
    "Business-Networking-Access-Point"
];

class EndpointSolution extends React.Component {

    render() {
        return(
            <div>
                {/* <ShouldDisplay ids={ids}> */}
                    <h2>Testing Area 2</h2>
                    <CategoryList ids={ids}/>
                {/* </ShouldDisplay> */}
            </div>    
        );
    }
}



export default EndpointSolution;