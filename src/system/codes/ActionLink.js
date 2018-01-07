import React from 'react'
import {observer} from 'mobx-react'
import {cpStore} from '../../store/ProductData'
const partner = require('../codes/moduleInfo')



//allassortment
const Allassortment = ({children , show = true}) => (
    <span>{show && children}</span>
)

//partner
const Partner = ({children , siteName , cp}) => (
    <a href={`http://content.webcollage.net/${siteName}/actions?action=p2b&channel-product-id=${cp}`} target="_blank">{children}</a>
)

const ActionLinkObserver = observer(({store : {data} , type , show , children}) => {
    let productId = data
    const siteName = 'allassortment'//partner.default.siteName
    console.log("show",show)
    switch(productId && type){
        case  'p2b' : return (siteName === 'allassortment') ? 
                                                <Allassortment children = { children }
                                                                show = {show} /> 
                                                : <Partner children = { children }
                                                           cp = { productId.cp }
                                                           siteName = { siteName } />

            
        default : return null
    }
})


 const ActionLink = ({wcpc , type , show , children}) => (

    <ActionLinkObserver store={cpStore(wcpc)} type={type} children={children} show={show}/>

        
 )

export default ActionLink;