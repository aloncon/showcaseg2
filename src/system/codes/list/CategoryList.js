import React from 'react'
import ProductListing from './ProductListing'
import ChangeView from './ChangeView'

// recive Ids for render productlisting as category (adding also change view - between grid and wide)
// opptional can close the header of the sub categories by adding attr isSubCategory = { true }
class CategoryList extends React.Component{
    
        constructor(props){
            super(props);
            this.state = { typeName : this.type}
        }

        handleChangeTypeView = (returnedType) =>{
            if(this.state.typeName !== returnedType){
                this.type = returnedType
                this.setState({ typeName : returnedType })
            }
                
        }
        
        render(){
            const { ids , isSubCategory } = this.props
            let subCategory = isSubCategory === undefined ? true : isSubCategory
            return(
                <div>
                    <ChangeView type={this.type} callBack={this.handleChangeTypeView} ids={ids}/>  
                    <div style={{clear:"both"}}/>                
                    <ProductListing ids={ids}  type={this.type} isSubCategory={subCategory} reporting={this.props.reporting}/>
                </div>
            )
        }
    
     }

export default CategoryList;     