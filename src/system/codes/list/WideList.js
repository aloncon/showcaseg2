import React from 'react'
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom'
import ActionLink from '../ActionLink'
import WcImg from '../WcResource/WcImg'
import {NormalizeListDescription} from '../NormalizeListDescription'

const placeholderPic = require('./placeholder.png')

class WideList extends React.Component{
    
    render(){
        const { list  , data} = this.props;
        let content = data ? 
                <table>
                    <tbody>
                    {data.map((product,i) => {
                                    return(
                                        <tr key={i} style={{marginBottom:10 , display:"block" , width:"150%"}}>
                                            <td style={{width:"10%"}}>
                                                {product.listImage ? 
                                                <WcImg src={"/static/" + product.listImage} alt="" style={{height:100}}/>:<img src={placeholderPic} style={{height:100}}/>}
                                                
                                            </td>
                                            <td style={{width:"80%" , paddingLeft:"2%", paddingRight:"5%"}}>
                                                <h4>{product.vendorProductName}</h4>
                                                <p><NormalizeListDescription>{product.listDescription}</NormalizeListDescription></p>
                                            </td>
                                            <td style={{width:"12%"}}>
                                                <ActionLink wcpc={product.wcpc} type="p2b" show={false}>
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
            <div>
                {content}
            </div>
        )
    }
}

export default WideList;