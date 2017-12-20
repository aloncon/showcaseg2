import React from 'react'
import {observer}  from 'mobx-react';
import ListingStore from '../../store/ProductData'

const Filter = observer(({ store: { idListing , data}, onChange}) => {
    let content = data;
    return content.products.length > 0 ? <div>{onChange(true)}</div> : null  
})


class ShouldDisplay extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {shouldDisplay : false}
    }

    getData = (isOk) =>{
         if(!this.state.shouldDisplay && isOk) {   
             this.props.callBack(this.props.ids)
            // console.log("State change once" , this.props)
         }
        !this.state.shouldDisplay  && isOk ? this.setState({ shouldDisplay : true }) : null  
    }

    render(){
        const {shouldDisplay} = this.state
        const {callBack} = this.props
        let filter = !shouldDisplay ? this.props.ids.map((id,i)=> <Filter key={i} store={ListingStore(id , null)} onChange={this.getData.bind(this)}/>) : null
        let content = shouldDisplay ? this.props.children : null;
        return(
              <div> 
                  {filter}
                  {content}
              </div>
              
        )
    }
    
}

export default ShouldDisplay;