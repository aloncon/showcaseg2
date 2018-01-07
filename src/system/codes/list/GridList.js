import React from 'react'
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom'
import WcImg from '../WcResource/WcImg'

const placeholderPic = require('./placeholder.png')


class GridList extends React.Component{
    
    render(){
        const { list  , data} = this.props;
        let imgHolder           
        let content = data ? 
            <div className="row">
                    {data.map((product,i) => {
                        return(
                                <div key={i} className="col-sm-6 col-md-5" style={{height:400}}>
                                <div className="thumbnail" key={i} style={{float:"left"}}>
                                    
                                    <img src={placeholderPic} alt="" style={{height:200}}/>
                                   { product.listImage=== undefined ?
                                                <img src={placeholderPic} alt="" style={{height:200}}/>  
                                                : <img src={"/static/" + product.listImage} alt="" style={{height:200}}/>
                                    }
                                    <div className="caption">
                                        <h4 style={{height:80}}> {product.vendorProductName}</h4>
                                        <p style={{height:40}}>{product.vendorProductName}</p>
                                    </div>
                                </div>
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