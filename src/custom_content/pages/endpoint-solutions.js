import React from 'react';
import ShouldDisplay from '../../system/codes/lisit/ShouldDisplay'
import CategoryList from '../../system/codes/lisit/CategoryList'
import ProductListing from '../../system/codes/lisit/ProductListing'

class EndpointSolution extends React.Component {

    render() {
        return(
            <div>
                <ShouldDisplay ids={["Business-Networking-Unmanaged-Switch"]}>
                    {/* <h2>Testing Area </h2>
                    <CategoryList ids={["Business-Networking-Unmanaged-Switch","Business-Networking-Smart-Managed-Pro-Switch","Business-Networking-Smart-Managed-Switch"]}/>
                    <hr/> */}
                    <h2>Testing Area 2</h2>
                    <ProductListing  isSubCategory viewChange ids={["Business-Networking-Unmanaged-Switch","Business-Networking-Smart-Managed-Switch"]}/> 
                </ShouldDisplay>
            </div>    
        );
    }
}



export default EndpointSolution;