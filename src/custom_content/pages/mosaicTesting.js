import React from 'react';
import { Mosaic , MosaicTiles } from '../../system/codes/Mosaic'
import CategoryList from '../../system/codes/list/CategoryList';


class MosaicTesting extends React.Component {
    render() {
        const CATEGORY_IDS = ["test-product-data"];

        return(
            <div>
                <div style={{ /*border:"1px solid black"*/}}>
                    
                    {/* <Mosaic wcpc={1377023287175}/> */}
                    <div>

                        <h3>Mosaic Tiles</h3>
                        <p>wcpc = 1422975800759</p>
                        <MosaicTiles wcpc={1422975800759} ifMosaicContentMissingDisplay>
                        <button> MosaicTesting button </button>
                        </MosaicTiles>

                        <p>wcpc = 1491851608414</p>
                        <MosaicTiles wcpc={1491851608414} >
                        <button> MosaicTesting button </button>
                        </MosaicTiles>
                        
                        
                    </div>
                    <hr/>
                    {/* <div>
                        <h3>Mosaic One Button</h3>
                        <p>wcpc = 1377023287175</p>
                        <Mosaic wcpc={1377023287175}/>
                    </div> */}
                    <CategoryList ids={CATEGORY_IDS} type="grid"/>
                </div>

            </div>
        );
    }
}

export default MosaicTesting;