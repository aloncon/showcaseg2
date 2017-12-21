import React from 'react'


const partner = require('../../custom_content/configuration').moduleId

//http://content.webcollage.net/abtelectronics/actions?action=p2b&channel-product-id=95018

export const ActionLink = ({wcpc , type}) => {
        let productId = wcpc // some logic later
        switch(type){
            case 'p2b' : return 
                            <a href={`http://content.webcollage.net/${type}/actions?action=p2b&channel-product-id=${productId}`}>
                                Proceed to buy
                            </a>
                
            default : return null
        }
}