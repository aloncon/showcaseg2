import React from 'react'
import WideList from './WideList'
import GridList from './GridList'
import { observer } from 'mobx-react'
import Store from '../../../store/ProductData'
import ChangeView from './ChangeView'

function check(t){
    console.log(t)
}
const ProductListingObserver = observer(({ store: {idListing, isDisplay , data , changeDisplay , type , setType} , orderNumber , settings ,id}) => {
    let content = data;
    let _type = type
    let change = changeDisplay;
    let _isDisplay = isDisplay
    let classButtonName  = _isDisplay ? "glyphicon glyphicon-minus" : "glyphicon glyphicon-plus"

    let { isSubCategory , viewChange } = settings  

    let _viewChangeHeader = viewChange ? <ChangeView type={type} ids={[id]} callBack={setType}/> : null
    let buttonOepnClose = isSubCategory && <button style={{ width:15 , height:32, border:"none" ,background:"transparent" , float:"right" , marginRight:10,outline:"none"}}
                                   onClick={change}  className={classButtonName}></button>              
  
    let _isSubCategory = isSubCategory ? <h2 id={id}>{idListing.caption}</h2> : null
    switch(content.length > 0 && type){
        case "wide": 
            return <div>
                        {_viewChangeHeader}
                        <div style = {{background:"#F6F7F9"}}>
                            {buttonOepnClose}{_isSubCategory}
                        </div>
                        {_isDisplay && <WideList data={content}/>}
                    </div>
            break
        case "grid": 
            return <div>
                        {_viewChangeHeader}
                        <div style = {{background:"#F6F7F9"}}>
                            {buttonOepnClose}{_isSubCategory}
                        </div>
                        {_isDisplay && <GridList data={content}/>}
                    </div>
            break    
        default:  return null
    }         
});

class ProductListing extends React.Component{
    
     render(){
            const { ids , type="wide" , isSubCategory} = this.props
            let { viewChange } = this.props
            viewChange= (viewChange==undefined) ? true : viewChange
            console.log("viewChange",viewChange)
            const settings = {ids , type , isSubCategory , viewChange}

            return  <div>
                        {settings.ids.map((id , i)=><ProductListingObserver key={i} store={Store(id , type)} orderNumber={i} settings={settings} id={id} />)}
                    </div>
     }
    
 }


export default ProductListing
