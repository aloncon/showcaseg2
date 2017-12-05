import React from 'react'
import CategoryList from '../../system/codes/CategoryList'
//import Store from '../../system/codes/store/ListingSotre'
import Store from '../../store/ProductData'


class CategoryListing extends React.Component{

    render(){
        return(
            <CategoryList store={Store} ids={this.props.ids}/>
        )
    }
}


export default CategoryListing;