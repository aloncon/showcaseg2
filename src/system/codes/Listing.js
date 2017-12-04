import React from 'react'
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom'


class Listing extends React.Component{
    
    render(){
        console.log("TEST" , this.props.data)
        const { list  , data} = this.props;
        let content = data ? 
                <table>
                    {data.map((item,i) => {
                        console.log("item",item.productsData)
                        return(
                            <tbody key={i}>
                                {item.productsData.map((product,i) =>{

                                    return(
                                        <tr key={i}>
                                            <td><img src={product.listImage}/></td>
                                            <td>
                                                <h4>{product.vendorProductName}</h4>
                                                <p>{product.listDescription}</p>
                                            </td>
                                            <td>Read More</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                    )})}
                    
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

export default Listing;