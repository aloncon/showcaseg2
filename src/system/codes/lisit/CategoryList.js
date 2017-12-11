import React from 'react'
import ProductListing from './ProductListing'
import ChangeView from './ChangeView'


class CategoryList extends React.Component{
    
        constructor(props){
            super(props);
            this.state = { typeName : this.type}
        }

        handleCallback = (returnedType) =>{
            if(this.state.typeName != returnedType){
                this.type = returnedType
                this.setState({ typeName : returnedType })
            }
                
        }
        
        render(){
            const { ids } = this.props
            
            return(
                <div>
                    <ChangeView type={this.type} callBack={this.handleCallback} ids={ids}/>  
                    <div style={{clear:"both"}}/>                
                    <ProductListing ids={ids}  type={this.type} isSubCategory={true} viewChange={false}/>
             </div>
            )
        }
    
     }

export default CategoryList;     