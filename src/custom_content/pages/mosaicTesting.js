import React from 'react';
import ProductListing from '../../system/codes/list/ProductListing';
import { Link } from 'react-router-dom';
import { Mosaic , MosaicTiles } from '../../system/codes/Mosaic'
import CategoryList from '../../system/codes/list/CategoryList';


class MosaicTesting extends React.Component {
    render() {
        const CATEGORY_IDS = ["Business-Networking-Unmanaged-Switch","Business-Networking-Access-Point","Home-Networking-Orbi"];

        return(
            <div>
                <div style={{ border:"1px solid black"}}>
                    
                    {/* <Mosaic wcpc={1377023287175}/> */}
                    <div>
                        <h3>Mosaic Tiles</h3>
                        <p>wcpc = 1510321493150</p>
                        <MosaicTiles wcpc={1510321493150}>
                        <button> MosaicTesting button </button>
                        </MosaicTiles>
                    </div>
                    <hr/>
                    <div>
                        <h3>Mosaic One Button</h3>
                        <p>wcpc = 1377023287175</p>
                        <Mosaic wcpc={1377023287175}/>
                    </div>
                    <CategoryList ids={CATEGORY_IDS} type="grid"/>
                </div>
                
            </div>
        );
    }
}

export default MosaicTesting;