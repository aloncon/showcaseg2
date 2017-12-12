import React from 'react'
import {observer}  from 'mobx-react';
import Store from '../../../store/ProductData'


const Filter = observer(({ store: { idListing , data}, onChange}) => {
    let content = data;
    return content.length > 0 ? <div>{onChange(true)}</div> : null
    
    
})


class ShouldDisplay extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {shouldDisplay : false}
    }

    getData = (isOk) =>{
        // if(!this.state.shouldDisplay && isOk) console.log("State change once")
        !this.state.shouldDisplay  && isOk ? this.setState({ shouldDisplay : true }) : null  
    }

    render(){
        const {shouldDisplay} = this.state
        console.log(this.props.ids)
        let filter = !shouldDisplay ? this.props.ids.map((id,i)=> <Filter key={i} store={Store(id , null)} onChange={this.getData.bind(this)}/>) : null
        let content = shouldDisplay ? this.props.children : null;
        console.log("Content",content)
        return(
              <div> 
                  {filter}
                  {content}
              </div>
              
        )
    }
    
}

export default (ShouldDisplay);