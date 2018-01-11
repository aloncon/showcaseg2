/*
        this component creating the header for productlisting.
        by default it creating buttons for changing the view of the items "wide" or "grid"
        in case of categoryList it will unit for only one section of those button (will not repeat for each id)
        in advance in case of categorylist it also create "categories" line with all the caption of the ids to "fast" scroll
*/

import React from 'react'
import VendorCategoryData from '../../data/vendor-data/vendor-category-data.json'
import WcpcAssortment from '../WcpcAssortment'

class CategoriesHeader extends React.Component{
    state = {
        captions : []
    }

    /* scrollToId function used for "Jump" to target (id), it  does similar 
    * function such as --> href="#id_name" (in a tag)
    **/
    scrollToId = (id) =>{ 
        let elm = document.getElementById(id);
        window.scrollTo(0, elm.getBoundingClientRect().y + window.scrollY);
    }

    handleVerifyIds(temp, priority){
        let captionsList = this.state.captions;
        if(!captionsList.includes(temp)){
            captionsList[priority] = temp
            this.setState({ captions : captionsList })
        }
       
    }
    render(){
        const {ids} = this.props
        const {captions} = this.state
        let categories = (captions.length > 1) ?
        <div style={{float:"left", maxWidth:"80%"}}>
                {captions.map((id, i)=>
                    { 
                        return <div key={i} style={{float:"left"}}>
                                         
                                        <button style={{border:"none",color:"blue",background:"transparent" , outline:"none"}} 
                                                onClick={()=>this.scrollToId(id)}>
                                        {VendorCategoryData.filter(item=>item.id==id)[0].caption}
                                        </button> 
                                        {(i + 1 < captions.length) && <span> | </span>}
                                </div>
                    }
                )}
        </div> : null
        return(
            <div>
                {
                    ids.map((id, i)=>
                    { 
                       return  <WcpcAssortment key={i} ids={[id]} callBack={ (temp) => this.handleVerifyIds(temp , i) }/> 
                    })
                }
                {categories}
            </div>    
        )
    }
}

class ChangeView extends React.Component{
   
    constructor(props){
        super(props);
        this.type = this.props.type ? this.props.type : "wide";
        this.defaultActivateClass = this.type=="wide" ? "zmdi zmdi-format-list-bulleted" : "zmdi zmdi-apps"
    }
    onClickHandle = (e) => {
        let name = e
        this.type = (name==="zmdi zmdi-format-list-bulleted") ? "wide" : "grid"
        this.defaultActivateClass = (this.type === "wide") ? "zmdi zmdi-format-list-bulleted" : "zmdi zmdi-apps"
        this.props.callBack(this.type);
    }

    

    render(){
        let {ids} = this.props
        
        let buttonGrid = <div className="btn-group" role="group" aria-label="..." style={{ float:"right", marginTop:2 }}> 
        {["zmdi zmdi-format-list-bulleted","zmdi zmdi-apps"].map((but , i)=>{
            return(
                <button key={i}  style={{ outline:"none" , width:40}}
                        className={this.defaultActivateClass === but ? "bt-btn btn-xs bt-btn-primary" : "bt-btn bt-btn-default btn-xs"} 
                        onClick={()=>this.onClickHandle(but)}>
                    <i className={but} style={{fontSize:"100%"}}/>
                </button> 
            )
                    
        })}
    </div>
        return(
            <div style={{marginBottom : -12}}>
                {buttonGrid}
                <CategoriesHeader ids={ids}/>
                <div style={{clear:"both"}}/>
            </div>
        )
    }
}


export default ChangeView;