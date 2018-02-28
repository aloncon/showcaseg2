import React from 'react';
import { observer } from 'mobx-react';
import ResponsiveStore from '../../store/ResponsiveStore';


const ResponsiveComp = observer(({responsiveStore}) => {
    console.log('gitit', responsiveStore.wcContainerSize);
    return responsiveStore.wcContainerSize;
});

const ResponsiveSet = () => {
    return ResponsiveComp({responsiveStore: ResponsiveStore});
}

export default ResponsiveSet;