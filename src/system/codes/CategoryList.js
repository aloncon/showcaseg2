import React from 'react';
import ReactDom from 'react-dom'
import { observer } from 'mobx-react';
import ProductListing from './ProductListing'
import { withRouter } from 'react-router';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';



class CategoryList extends React.Component {

        constructor(props){
            super(props);
            this.type = this.props.type ? this.props.type : "wide";
            this.defaultActivateClass = "glyphicon glyphicon-th-list";
            this.state = { 
                data : null,
                typeName : this.type
            }
            this.processData = this.processData.bind(this)
        }

        /* in componentWillMount we send to the Store (ListingStore) the current page
         * the Store which currently holding the previous Category Page data will check 
         * if it need to fetch new data (in case previuos page != current page)
        **/
        componentWillMount(){
            this.props.store.getCatergoyData(this.props.ids,this.processData);
        }

        processData(ids){
            if(ids.length > 0)
                this.setState({data:ids})
        }

        onClickHandle = (_name) => {
            let name = _name
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
            const {data , typeName} = this.state
            const type  = this.type;
            let buttonGrid = 
            <div className="btn-group" role="group" aria-label="..." style={{ float:"right", marginTop:2 }}> 
            {["glyphicon glyphicon-th-list","glyphicon glyphicon-th"].map((but , i)=>{
                return(
                    <button key={i} 
                            className={this.defaultActivateClass === but ? "btn btn-default btn-xs btn-primary" : "btn btn-default btn-xs"} 
                            onClick={(e)=>{e.preventDefault();this.onClickHandle(but)}}>
                        <span className={but} />
                    </button> 
                )
                          
            })}
            </div>
            let content = data ? 
                            <div>
                                {buttonGrid}
                                {(data.length > 1) && 
                                <p>Categories: 
                                        {data.map((id, key)=>
                                            { 
                                                return <button key={key} 
                                                               style={{border:"none",color:"blue",background:"transparent"}} 
                                                               onClick={()=>this.scrollToId(id)}>{id}</button> 
                                            }
                                        )}
                                </p>}
                                {data.map((id, key) => {
                                    return(
                                    <div key={key}>
                                        <h3 id={id}>{this.props.store.allIds.get(id).caption}</h3>
                                        <ProductListing type={type} ids={[id]}/>
                                    </div>
                                    )
                                    
                                })}
                            </div>

                          : null  
            return(
                <div>{content}</div>
            )

        }
        
    }
    
export default CategoryList;
