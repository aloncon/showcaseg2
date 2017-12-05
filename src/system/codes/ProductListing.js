import React from 'react'
import WideList from './WideList'
import GridList from './GridList'
//import Store from '../../system/codes/store/ListingSotre'
import Store from '../../store/ProductData'
//import { observer } from 'mobx-react';
import Carousel from './carousel1'





class ProductlistingObserver extends React.Component{
    state = {
        data : null
    }

    componentWillMount(){
        this.props.store.getProductsData(this.props.settings.ids , this.getData.bind(this))
    }

    getData(data){
        console.log("getData",data)
        if(data.length > 0)
            this.setState({data : data})
    }

    render(){
        const { type , ids, carosulId , vertical , slidesToShow , infinite , responsive , responsiveWidth , carouselWidth , carouselHeight , productWidth , productHeight } = this.props.settings;
        const { data } = this.state;
        console.log("DATA", data)
        console.log('props',this.props)
        console.log("type", type)
        console.log("ids", ids)
        console.log("vertical", this.props.vertical)
        if(data){
            switch(type){
                case 'wide':
                    return <WideList  ids={ids} data={data}/>
                case 'grid':
                    return <GridList ids={ids} data={data}/>    
                case 'Carousel'  :
                    console.log('data!!!: ',data)
                    console.log('vertical!!!: ',vertical)
                    return <Carousel ids={ids}
                                     data={data}
                                     carosulId={carosulId}
                                     vertical={vertical}
                                     slidesToShow={slidesToShow}
                                     infinite={infinite}
                                     responsiveWidth={responsiveWidth}
                                     responsive={responsive}
                                     carouselWidth={carouselWidth}
                                     carouselHeight={carouselHeight}
                                     productWidth={productWidth}
                                     productHeight={productHeight}
                            />
               default: 
                return <div></div>
           }
        }
        else return <div></div>
        

    }
}


class Productlisting extends React.Component{
    
    render(){
        const {ids , type} = this.props
        console.log('props1111',this.props)
        return(
            <ProductlistingObserver store={Store} settings = {this.props}/>
        )
        
    }
}

export default Productlisting;
//export default observer(Productlisting);

/* ------------------ Documation ------------------ */
/*  type is mandatory --> type= "Categorylist" | "Carousel" | ""
 *
 *
 *
 *
 *
 *
 *
 *
*/
