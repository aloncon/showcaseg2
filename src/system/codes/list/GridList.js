import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { Link } from 'react-router-dom'
import WcImg from '../WcResource/WcImg'
import ActionLink from '../ActionLink'
import {NormalizeListDescription} from '../NormalizeListDescription'

import '../../style/grid.css'

const placeholderPic = require('./placeholder.png')
let openPopList = [];

const popOverGridStore = (index) =>{
    openPopList.push({index : index})
    const store = observable({
        open : false,
        get isOpen(){
            return store.open
        },
        setOpen(bool){
            store.open = bool;
        },
        getIsOpen(){
            return store.open
        }
    })
    return store;
}

class AllPopover{
    constructor(){
        this.map = new Map();
        this.prev = null;
    }
    setNewPop(index){
        if(!this.map.has(index))
            this.map.set(index,{pop : new popOverGridStore(index) , isOpen:false})
    }
    getPop(index){
        if(!this.map.has(index))
            this.setNewPop(index)
        return this.map.get(index).pop
    }
    openPop(index){
        console.log("TEST",index)
        if(this.prev !== null && this.prev !== index){
            this.map.get(this.prev).pop.setOpen(false)
            this.map.get(this.prev).isOpen = false
        }
            
        if(this.map.has(index)){
            let temp = this.map.get(index)
            temp.isOpen = !temp.isOpen
            temp.pop.setOpen(temp.isOpen)
        }
        this.prev = index
            
    }
}

const allPopovers = new AllPopover();

const ObservPopover = observer(({store , index , title , text}) => {
    let isOpen = store && store.isOpen
    let classIsOpen = isOpen ? "wc-open-popover" : "wc-close-popover"
    return store ?
        <div>
            <button type="button" className="bt-btn bt-btn-primary bt-btn-sm" onClick={()=>{allPopovers.openPop(index)}}>See more</button>
            <div className={classIsOpen}>
                <div><h3>{ title }</h3></div>
                
                <p><NormalizeListDescription>{ text }</NormalizeListDescription></p>
            </div>
        </div> : null
    
}) 

class PopOver extends React.Component{
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
            popoverOpen: false
        };
    }
    
    toggle() {
    this.setState({
        popoverOpen: !this.state.popoverOpen
    })}
    render(){
        const { title , text } = this.props
        const { popoverOpen } = this.state
        let isOpen = popoverOpen ? "wc-open-popover" : "wc-close-popover"
        return(
            <div>
                <button type="button" className="bt-btn bt-btn-primary bt-btn-sm" onClick={this.toggle}>See more</button>
                <div className={isOpen}>
                    <div><h3>{ title }</h3></div>
                    
                    <p><NormalizeListDescription>{ text }</NormalizeListDescription></p>
                </div>
            </div>
        )
    }
}


class GridList extends React.Component{
    

    render(){
        const { list  , data} = this.props;
        

        let content = [] 
        for(let i = 0 ; i < data.length ; i+=3){
            let temp = []
            for(let y=0 ; y<3 && i+y < data.length ; y++){
                let index = y+i; 
                temp.push(
                    
                        <div key={y+i} className="bt-card" style={{padding:"10px 10px 10px 20px"}}>
                            <ActionLink wcpc={data[index].wcpc} type="p2b"><div style={{width:"50%" , margin:"auto" , height:150 , paddingTop:15}}>
                            { data[index].listImage=== undefined ?
                                                    <img src={placeholderPic} alt="" className="bt-card-img-top bt-img-fluid"/>  
                                                    : <img src={"/static/" + data[index].listImage} alt="" className="bt-card-img-top bt-img-fluid"/>
                            }
                            </div></ActionLink>
                            <div className="bt-card-block" style={{ height:110}}>
                                <h4 className="bt-card-title"><ActionLink wcpc={data[index].wcpc} type="p2b">{data[index].vendorProductName}</ActionLink></h4>
                                {data[index].listDescription && <ObservPopover store={allPopovers.getPop(index)}
                                                                               index={index} 
                                                                               title={data[index].vendorProductName} 
                                                                               text={data[index].listDescription}/>}
                            </div>
                        </div>
                    )
            }
            content.push(
                
                <div key={i} className="bt-card-deck" style={{marginBottom:15 , height:265}}>
                   {temp}
                </div>
                
            )
        }     
        return(
            <div>
                {content}
            </div>
        )
    }
}

export default GridList;