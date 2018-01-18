import React from 'react';
import ShouldDisplay from '../../system/codes/ShouldDisplay'
import ActionLink from '../../system/codes/ActionLink'
import CategoryList from '../../system/codes/list/CategoryList'
import ProductListing from '../../system/codes/list/ProductListing'



const ids = [

    "Business-Networking-Access-Point"
];

class EndpointSolution extends React.Component {

    render() {
        console.log("should display render 1")
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