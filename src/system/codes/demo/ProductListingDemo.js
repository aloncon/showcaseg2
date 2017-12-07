import React from 'react'
import WideList from './WideList'
import GridList from './GridList'
import { observer } from 'mobx-react'
import Store from '../../../store/demo/ProductData'

const ProductListingObserver = observer(({ store: { idListing , data}, orderNumber , type , isSubCategory}) => {
    let content = data;

    let _isSubCategory = isSubCategory ? <h2 id={isSubCategory}>{isSubCategory}</h2> : null
    switch(content.length > 0 && type){
        case "wide": 
            return <div>{_isSubCategory}{<WideList data={content}/>}</div>
            break
        case "grid": 
            return <div>{_isSubCategory}{<GridList data={content}/>}</div>
            break    
        default:  return null
    }         
});

const ProductListing = ({ids , type , isSubCategory})=>{
    console.log("ids",ids,type);
   return <div>
            {ids.map((id , i)=><ProductListingObserver key={i} store={Store(id)} orderNumber={i} type={type} isSubCategory={isSubCategory}/>)}
          </div>
}

class CategoryList extends React.Component{

    constructor(props){
        super(props);
        this.type = this.props.type ? this.props.type : "wide";
        this.defaultActivateClass = this.type=="wide" ? "glyphicon glyphicon-th-list" : "glyphicon glyphicon-th"
        this.state = { typeName : this.type}
    }
    onClickHandle = (e) => {
        let name = e
        if(name != this.state.typeName){
            this.setState({ typeName : name }) 
        } 
        this.type = (name==="glyphicon glyphicon-th-list") ? "wide" : "grid"
        this.defaultActivateClass = (this.type === "wide") ? "glyphicon glyphicon-th-list" : "glyphicon glyphicon-th"
                            
    }

    /* scrollToId function used for "Jump" to target (id), it  does similar 
     * function such as --> href="#id_name" (in a tag)
    **/
    scrollToId = (id) =>{
        let elm = document.getElementById(id);
        window.scrollTo(0, elm.getBoundingClientRect().y + window.scrollY);
    }
    
    render(){
        const { ids } = this.props
        console.log(ids)
        let buttonGrid = 
        <div className="btn-group" role="group" aria-label="..." style={{ float:"right", marginTop:2 }}> 
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

        // need to change --> should work with store !        
        let categories = (ids.length > 1) ?
                            <p>Categories: 
                                    {ids.map((id, key)=>
                                        { 
                                            return <span key={key}>
                                                        <button style={{border:"none",color:"blue",background:"transparent" , outline:"none"}} 
                                                                onClick={()=>this.scrollToId(id)}>
                                                          {id}
                                                        </button>{(key + 1 != ids.length) && <span> | </span>}  
                                                    </span>
                                        }
                                    )}
                            </p> : null

        return(
            <div>
                {buttonGrid}  
                {categories}
                <div style={{clear:"both"}}/>                  
                {ids.map((id , i)=><div key={i}><ProductListing ids={[id]} orderNumber={i} type={this.type} isSubCategory={id}/></div>)}
         </div>
        )
    }

 }


    


export {ProductListing , CategoryList};
