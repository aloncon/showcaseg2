import React from 'react';
import ShouldDisplay from '../../system/codes/ShouldDisplay'
// import WcpcContent from '../../system/codes/WcpcContent'
 import CategoryList from '../../system/codes/list/CategoryList'
import ProductListing from '../../system/codes/list/ProductListing'

const ids = [
    "Home-Networking-Orbi",
    "Business-Networking-Unmanaged-Switch",
    "Home-Networking-Orbi",
    "Business-Networking-Smart-Managed-Switch"
];

class EndpointSolution extends React.Component {

    render() {
        return(
            <div>
                <ShouldDisplay ids={ids}>
                    <h2>Testing Area 2</h2>
                    <CategoryList ids={ids}/>
                </ShouldDisplay>
            </div>    
        );
    }
}



export default EndpointSolution;