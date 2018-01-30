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
                <table>
                    <tbody>
                    {data.map((product,i) => {
                                    return(
                                        <tr key={i}>
                                            <td id="wcWideListImg">
                                                <ActionLink wcpc={product.wcpc} type="mosaic" unlink={true}/>  
                                                {product.listImage ? 
                                                <WcImg src={"/static/" + product.listImage} alt={product.vendorProductName} />:<img src={placeholderPic}/>}
                                            </td>
                                            <td id="wcWideListDesc">
                                                <h4>
                                                <ActionLink wcpc={product.wcpc} type="p2b" unlink={true}>{product.vendorProductName}</ActionLink>
                                                </h4>
                                                <p><NormalizeListDescription>{product.listDescription}</NormalizeListDescription></p>
                                            </td>
                                            <td id="wcWideListButton">
                                                <ActionLink wcpc={product.wcpc} type="p2b">
                                                    Proceed to buy
                                                </ActionLink>
                                            </td>
                                        </tr>
                                    )
                               
                            
                    
                                })}
                                </tbody>
                </table> 
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