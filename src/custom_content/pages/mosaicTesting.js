import React from 'react';
import { Mosaic , MosaicTiles } from '../../system/codes/Mosaic'
import CategoryList from '../../system/codes/list/CategoryList';


class MosaicTesting extends React.Component {
    render() {
        const CATEGORY_IDS = ["Business-Networking-Unmanaged-Switch","Business-Networking-Access-Point","Home-Networking-Orbi"];

        return(
            <div>
                <div style={{ border:"1px solid black"}}>
                   {/* mosaic tiles example */}
                   <div>
                        <h3>Mosaic Tiles</h3>
                        <p>wcpc = 1510321493150</p>
                        <MosaicTiles wcpc={1510321493150}>
                        <button> MosaicTesting button </button>
                        </MosaicTiles>
                    </div>
                    {/* <hr/> */}
                    {/* Regular mosaic example */}
                    {/*<div>
                        <h3>Mosaic One Button</h3>
                        <p>wcpc = 1377023287175</p>
                        <Mosaic wcpc={1377023287175}/>
                    </div>*/}
                    {/* Category list option - type: grid */}
                    <CategoryList ids={CATEGORY_IDS} type="grid"/>
                </div>

            </div>
        );
    }
}

export default MosaicTesting;