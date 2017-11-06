import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'

import CatalogNode from './CatalogNode2'
import wcpcList from '../data/product-listing/wcpcList.json'

function generateWcpcList(caption){
    return new Promise((resolve,reject)=>{
        wcpcList.forEach((finder)=>{
            if(finder.caption === caption)
                resolve(finder.wcpc)
        });
        reject("Caption " + caption + " not found");
    })
}

function getListofWcpc(base, ListCaption){
    let tempList = [];
    return new Promise((resolve , rejected) => {
        ListCaption.forEach((cap)=>{
            let tempCaption = base + cap;
            generateWcpcList(tempCaption)
            .then(result => {
                let ListObj = tempList;
                let newObj  = {caption : cap , wcpc : result};
                tempList.push(newObj);

                resolve(tempList);
            })
            .catch(err => {
                rejected(err);
            })
        })
    })

}

class ProductList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isReady : false,
            List    : []
        }
        this.getListofProducts(this.props.prefix,this.props.caption);
    }

    getListofProducts(base,caption){
        let baseName =  base ? base + " | " : "";
        getListofWcpc(baseName , caption)
        .then((result => {
            this.setState({ List : result });
        }))
        .then(() => {
            this.setState({ isReady : true });
        })
        .catch( err => {
            console.log("err: " , err);
        })

    }

    scrollToId = (id) =>{
        let elm = document.getElementById(id);
        window.scrollTo(0, elm.getBoundingClientRect().y + window.scrollY);
    }



    render(){
        const { List , isReady } = this.state;
        return(
            <div>
                {isReady &&
                 <div>{(List.length > 1) &&
                    <p> Categories: {List.map((item,i) => {
                       return(
                            <span key={i}>
                                <a onClick={()=>{this.scrollToId(item.caption)}}>{item.caption}</a>
                                 {(List.length > (i+1)) && " | "}
                            </span>
                       )
                    })}</p>}
                {List.map((item,i) => {
                       return(
                            <div key={i}>
                                <h3 id={item.caption}>{item.caption}</h3>
                                <CatalogNode caption={item.caption} wcpc={item.wcpc}/>
                            </div>
                    )})}</div>
                }
            </div>
        )
    }
}


export default ProductList;