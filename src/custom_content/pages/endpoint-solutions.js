import React from 'react';
import WcpcContent from '../../system/codes/WcpcContent'
import CategoryList from '../../system/codes/list/CategoryList'
import ProductListing from '../../system/codes/list/ProductListing'

class EndpointSolution extends React.Component {

    render() {
        return(
            <div>
                {/* <WcpcContent ids={["Business-Networking-Unmanaged-Switch"]}> */}
                    <h2>Testing Area 2</h2>
                    <CategoryList  /*isSubCategory*/ /*viewChange*/ ids={["Business-Networking-Unmanaged-Switch","Business-Networking-Smart-Managed-Switch","Home-Networking-Orbi","Home-Networking-Orbi"]}/> 
                {/* </WcpcContent> */}
            </div>    
        );
    }
}



export default EndpointSolution;