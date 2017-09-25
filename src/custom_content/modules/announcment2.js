
import React from 'react';
import announcment1 from '../office-365-hero-950x180_1.jpg';
//import announcment2 from './9b54e547-b5ae-43ca-950a-07b77bdc8ffe.png';
//import announcment3 from './SYM-BLK-wide.png';
//import announcment4 from './SYM-BLK.png';
//import announcment5 from './SYM-BLK-nerrow.png';
//import SVG from './office-365-hero-950x180_1.svg';
import WcResource from '../../WcResource';
import WcpcContent from '../../WcpcContent';

export default () => (
    <div className="wc-top-announcments">
    <div className="wc-announcments" id="announcment11">
        <WcResource>
            <img className="wcAnnouncmentImage" id="wcImg" height="300px" style={{backgroundColor:'red',float:'right'}} src={announcment1}/>
        </WcResource>
    </div>
    
    </div> 
);


