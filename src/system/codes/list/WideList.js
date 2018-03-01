import React from 'react'
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom'
import ActionLink from '../ActionLink'
import WcImg from '../WcResource/WcImg'
import {NormalizeListDescription} from '../NormalizeListDescription'
import '../../style/wide.css'

const placeholderPic = require('../../resources/placeholder.png')

class WideList extends React.Component{

    render(){
        const { list  , data} = this.props;
        let content = data ?
                <div>
                      {data.map((product,i) => {
                                    console.log("product cpi",product)
                                    return(
                                        <div key={i} className="wcWideProduct">
                                            <div className="bt-row">
                                                <div className="wcMosaicWideList ">
                                                    <div className="wcMosaic" data-cpi={product.cpi}/>
                                                </div>
                                            </div>
                                            <div className="bt-row">
                                                    <div className="wcWideListImg">
                                                        {product.listImage ? 
                                                        <WcImg src={"/static/" + product.listImage} alt={product.vendorProductName} />:<img src={placeholderPic}/>}
                                                    </div>
                                                    <div className="wcWideListDesc">
                                                        <h4>
                                                        <ActionLink wcpc={product.wcpc} type="p2b" unlink={true}>{product.vendorProductName}</ActionLink>
                                                        </h4>
                                                        <p><NormalizeListDescription>{product.listDescription}</NormalizeListDescription></p>
                                                    </div>
                                                <div className="wcWideListButton" style={{height:150}}>
                                                    <span>
                                                        <ActionLink wcpc={product.wcpc} type="p2b" >
                                                        Proceed to buy  
                                                        </ActionLink>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                </div>
                :
                null
        return(
            <div id="wcWideList">
                {content}
            </div>
        )
    }
}

export default WideList;