/*
        this component creating the header for productlisting.
        by default it creating buttons for changing the view of the items "wide" or "grid"
        in case of categoryList it will unit for only one section of those button (will not repeat for each id)
        in advance in case of categorylist it also create "categories" line with all the caption of the ids to "fast" scroll
*/

import React from 'react';
import ListingStore , {ShouldHeaderDisplay} from '../../../store/ProductData';
import WcImg from '../WcResource/WcImg';
import { observer } from 'mobx-react';
import gridIcon from '../../resources/icons/svg/grid.svg';
import listIcon from '../../resources/icons/svg/list.svg';
import '../../style/changeview.css';

const CategoriesHeaderObserv = observer(({ store }) => {
    /* scrollToId function used for "Jump" to target (id), it  does similar 
    * function such as --> href="#id_name" (in a tag)
    **/
    const scrollToId = (id) =>{ 
        //console.log("SCROLL", id)
        let elm = document.getElementById(id);
        window.scrollTo(0, elm.getBoundingClientRect().y + window.scrollY);
    }
    return store.shouldDisplay && 
            <div id="wcCategoryHeader">{store.shouldDisplay.map((item, i) => {
                return <div key={i}>
                                         
                            <button className="wcCategoryHeaderButton" 
                                    onClick={()=>scrollToId(item.id)}>
                            {item.caption}
                            </button> 
                            {(i + 1 < store.shouldDisplay.length) && <span className="wcCategoryHeaderSpace">|</span>}
                    </div>
            })}</div>
});

// categories headline (link to the h2 of the caption)
const CategoriesHeader = ({ ids }) => {
    const listings = ShouldHeaderDisplay(ids.map(ListingStore));
    return <CategoriesHeaderObserv store={listings}/>
}

class ChangeView extends React.Component{
   
    constructor(props){
        super(props);
        this.type = this.props.type ? this.props.type : "wide";
        this.defaultActivateClass = this.type==="wide" ? "wideIcon" : "gridIcon"
    }

    // Change the type of the list (between wide list to grid)
    onClickHandle = (e) => {
        let name = e
        this.type = (name==="wideIcon") ? "wide" : "grid"
        this.defaultActivateClass = (this.type === "wide") ? "wideIcon" : "gridIcon"
        this.props.callBack(this.type);
    }

    

    render(){
        let {ids} = this.props
        
        let buttonGrid = <div className="wcViewChangeButtons"> 
                            {["wideIcon","gridIcon"].map((but , i)=>{
                                return(
                                    <button key={i}
                                            className={this.defaultActivateClass === but ? "wcBtnPrimary" : "wcBtnDefault"} 
                                            onClick={()=>this.onClickHandle(but)}>
                                        <WcImg src={"wideIcon"=== but ? listIcon : gridIcon}  />
                                    </button> 
                                )
                                        
                            })}
                        </div>
        return(
            <div className="wcMainCahngeView">
                {buttonGrid}
                <CategoriesHeader ids={ids}/>
                <div className="wcClear" />
            </div>
        )
    }
}


export default ChangeView;