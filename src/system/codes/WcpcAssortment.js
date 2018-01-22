import React from 'react'
import { observer } from 'mobx-react';
import ListingStore, { ShouldDisplayStore } from '../../store/ProductData'




const ShouldDisplayObsrv = observer(({ store, children }) => {
    return store.shouldDisplay && <span>{children}</span>
});


const WcpcAssortment = ({ ids, children }) => {
    const listings = ShouldDisplayStore(ids.map(ListingStore));
    return <ShouldDisplayObsrv store={listings} children={children} />
}


export default WcpcAssortment;