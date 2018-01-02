import React from 'react'
import {observer}  from 'mobx-react';
import ListingStore, { ShouldDisplayStore } from '../../store/ProductData'




const ShouldDisplayObsrv = observer(({ store, children }) => {
    console.log("should display render", store.shouldDisplay);
    return store.shouldDisplay && <div>
        {children}
    </div>
});

const ShouldDisplay = ({ids , children}) => {
    const listings = ShouldDisplayStore(ids.map(ListingStore));
    return <ShouldDisplayObsrv store={listings} children={children}/>
}

// const Filter = observer(({ store: { idListing , data}, onChange}) => {
//     let content = data;
//     return content.products.length > 0 ? <div>{onChange(true)}</div> : null  
// })


// class ShouldDisplay extends React.Component{
    
//     constructor(props){
//         super(props)
//         this.state = {shouldDisplay : false}
//     }

//     getData = (isOk) =>{
//          if(!this.state.shouldDisplay && isOk) {   
//             this.props.callBack && this.props.callBack(this.props.ids)
//              this.setState({ shouldDisplay : true })
//             // console.log("State change once" , this.props)
//          }
//     }

//     render(){
//         const {shouldDisplay} = this.state
//         const {callBack} = this.props
//         let filter = !shouldDisplay ? this.props.ids.map((id,i)=> <Filter key={i} store={ListingStore(id , null)} onChange={this.getData.bind(this)}/>) : null
//         let content = shouldDisplay ? this.props.children : null;
//         return(
//               <div> 
//                   {filter}
//                   {content}
//               </div>
              
//         )
//     }
    
// }

export default ShouldDisplay;