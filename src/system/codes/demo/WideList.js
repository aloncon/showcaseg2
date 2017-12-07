import React from 'react'
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom'


class WideList extends React.Component{
    
    render(){
        const { list  , data} = this.props;
        let content = data ? 
                <table>
                    <tbody>
                    {data.map((product,i) => {
                                    return(
                                        <tr key={i}>
                                            <td style={{width:"10%"}}><img src={product.listImage}/></td>
                                            <td style={{width:"80%" , paddingLeft:"2%", paddingRight:"5%"}}>
                                                <h4>{product.vendorProductName}</h4>
                                                <p>{product.listDescription}</p>
                                            </td>
                                            <td style={{width:"12%"}}>Read More</td>
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