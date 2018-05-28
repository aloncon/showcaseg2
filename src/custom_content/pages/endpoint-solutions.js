import React from 'react';
import ShouldDisplay from '../../system/codes/ShouldDisplay';
import CategoryList from '../../system/codes/list/CategoryList';



const CATEGORY_IDS = ["Business-Networking-Unmanaged-Switch"];

class EndpointSolution extends React.Component {

    render() {
        return (
            <div className="sos">
                
                <ShouldDisplay ids={CATEGORY_IDS}>
                    <div>
                        <h2>Testing Area 2</h2>
                        <CategoryList ids={CATEGORY_IDS} reporting={true}/>
                    </div>
                </ShouldDisplay>
            </div>
        );
    }
}



export default EndpointSolution;