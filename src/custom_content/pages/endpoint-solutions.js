import React from 'react';
import ShouldDisplay from '../../system/codes/ShouldDisplay'
import ActionLink from '../../system/codes/ActionLink'
import CategoryList from '../../system/codes/list/CategoryList'
import ProductListing from '../../system/codes/list/ProductListing'



const ids = [
    "Business-Networking-Unmanaged-Switch",
    "Business-Networking-Access-Point",
    "Home-Networking-Orbi"
];

class EndpointSolution extends React.Component {

    render() {
        return (
            <div className="sss">
                <ShouldDisplay ids={ids}>
                    <div>
                        <h2>Testing Area 2</h2>
                        <CategoryList ids={ids} />
                    </div>
                </ShouldDisplay>
            </div>
        );
    }
}



export default EndpointSolution;