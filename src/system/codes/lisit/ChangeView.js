/*
        this component creating the header for productlisting.
        by default it creating buttons for changing the view of the items "wide" or "grid"
        in case of categoryList it will unit for only one section of those button (will not repeat for each id)
        in advance in case of categorylist it also create "categories" line with all the caption of the ids to "fast" scroll
*/

import React from 'react'
import VendorCategoryData from '../../data/demo/v2/vendor-category-data-v2.json'

class ChangeView extends React.Component{
   
    constructor(props){
        super(props);
        this.type = this.props.type ? this.props.type : "wide";
        this.defaultActivateClass = this.type=="wide" ? "glyphicon glyphicon-th-list" : "glyphicon glyphicon-th"
    }
    onClickHandle = (e) => {
        let name = e
       
        this.type = (name==="glyphicon glyphicon-th-list") ? "wide" : "grid"
        this.defaultActivateClass = (this.type === "wide") ? "glyphicon glyphicon-th-list" : "glyphicon glyphicon-th"
        this.props.callBack(this.type);
                            
    }


    /* scrollToId function used for "Jump" to target (id), it  does similar 
    * function such as --> href="#id_name" (in a tag)
    **/
    scrollToId = (id) =>{ 
        console.log("id",id);
        let elm = document.getElementById(id);
        window.scrollTo(0, elm.getBoundingClientRect().y + window.scrollY);
    }

    render(){
        let {ids} = this.props
        let categories = (ids.length > 1) ?
        <p style={{float:"left", maxWidth:"80%"}}>Categories: 
                {ids.map((id, key)=>
                    { 
                        return <span key={key}>
                                    <button style={{border:"none",color:"blue",background:"transparent" , outline:"none"}} 
                                            onClick={()=>this.scrollToId(id)}>
                                      {VendorCategoryData.filter(item=>item.id==id)[0].caption}
                                    </button>{(key + 1 != ids.length) && <span> | </span>}  
                                </span>
                    }
                )}
        </p> : null
        let buttonGrid = <div className="btn-group" role="group" aria-label="..." style={{ float:"right", marginTop:2 }}> 
        {["glyphicon glyphicon-th-list","glyphicon glyphicon-th"].map((but , i)=>{
            return(
                <button key={i}  style={{ outline:"none"}}
                        className={this.defaultActivateClass === but ? "btn btn-default btn-xs btn-primary" : "btn btn-default btn-xs"} 
                        onClick={()=>this.onClickHandle(but)}>
                    <span className={but} />
                </button> 
            )
                    
        })}
    </div>
        return(
            <div style={{marginBottom : -12}}>
                {buttonGrid}
                {categories}
                <div style={{clear:"both"}}/>
            </div>
        )
    }
}


export default ChangeView;