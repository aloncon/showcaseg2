import React from 'react';
import moduleAssortment from'../data/module-profiles/fromProviderCenter.json';

    //globalWcpcAssortmentList.includes(wcpc) ? children : null


export default ({children , wc_section_code, wc_product_code}) => (

    <span>
       {assortmentCheck(children ,wc_section_code , wc_product_code)}
    </span>
)



const assortmentCheck = (child , wc_section_code, wc_product_code) => {
    for(let i= 0 ; i < moduleAssortment.Page_Structure.length ; i++){
        if(moduleAssortment.Page_Structure[i].Id === wc_section_code){
            let flag = moduleAssortment.Page_Structure[i].Display
            if(flag){
                return child;
            }
            else
                return null
        }
    }
}
