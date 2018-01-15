import React from 'react'
import {observer} from 'mobx-react'
import { withRouter } from 'react-router-dom';
import {cpStore} from '../../store/ProductData'
const partner = require('../codes/moduleInfo')


const Allassortment = ({children}) => (
    <span>{children}</span>
)


const P2b = ({children , siteName , cp}) => (
    <a href={`http://content.webcollage.net/${siteName}/actions?action=p2b&channel-product-id=${cp}`}>{children}</a>
)

const MiniSite = ({children}) => (
    <div style={{border:"1px solid red"}}>{children}</div>
)

const ActionLinkObserver = observer(({store : {data} , type , children}) => {
    let productId = data
    const siteName = partner.default.siteName //in case need to try with Allassortment change to --> 'allassortment'//
    switch(productId && type){
        case  'p2b' : return (siteName === 'allassortment') ? 
                                                <Allassortment children = { children } /> 
                                                :<P2b children = { children }
                                                           cp = { productId.cp }
                                                           siteName = { siteName } />

        case  'mini-site' : return <MiniSite children = { children } />
        default : return null
    }
})


 const ActionLink = ({wcpc , type , show , children , location}) => {
    const pathname = location.pathname.replace("/","");
   return  <ActionLinkObserver store={cpStore(wcpc)} type={type} children={children} show={show}/>

        
 }

export default withRouter(ActionLink);