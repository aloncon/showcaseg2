import React from 'react'
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom'


class GridList extends React.Component{
    
    render(){
        const { list  , data} = this.props;
        let content = data ? 
            <div className="row">
                    {data.map((item,i) => {
                        return(
                                <div key={i}>
                                {item.productsData.map((product,i) =>{

                                    return(
                                        <div key={i} className="col-sm-6 col-md-4" key={i}>
                                        <div className="thumbnail" key={i} style={{float:"left"}}>
                                            <img src={product.listImage} alt=""/>
                                            <div className="caption">
                                                <h3>{product.vendorProductName}</h3>
                                                <p>{product.vendorProductName}</p>
                                            </div>
                                        </div>
                                        </div>
                                    )
                                })}
                            </div>
                    )})}
                    
                </div> 
                : 
                null
        return(
            <div>
                {content}
            </div>
        )
    }
}

export default GridList;