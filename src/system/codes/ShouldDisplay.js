import React from 'react'
import {observer}  from 'mobx-react';
import Store from '../../store/ProductData'



class Filter extends React.Component{
    constructor(props){
        super(props);
        this.state = { isReady : false}
        this.callback = this.callback.bind(this)
    }
   componentDidMount(){ //getVerifiedData
       // this.props.store.getProductsDataByIds(this.props.ids,this.callback);  
        this.props.store.getVerifiedData(this.props.ids,this.callback);  
    }
   
    //need to change the name to a more appropriate one - not 'callback'
    callback = (ready,msg) =>{
        console.log("this msg", msg)
        if(!this.state.isReady && ready){
            this.setState({ isReady : true })
        }
            
    }
    render(){
        let content = this.props.node;
        
        return(
            <div>
                <p>{this.state.isReady.toString()}</p>
                {this.state.isReady && content}
            </div>
        )
    }
}


class ShouldDisplay extends React.Component{
    render(){
        return(
            <div>
                <Filter ids={this.props.ids} store={Store} node={this.props.children}/>
            </div>
        )
    }
    
}

export default observer(ShouldDisplay);