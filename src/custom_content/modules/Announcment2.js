import React from 'react';
import announcment1 from '../assets/images/office-365-hero-950x180_1.jpg';
//import announcment2 from '../assets/images/9b54e547-b5ae-43ca-950a-07b77bdc8ffe.png';
//import announcment3 from '../assets/images/SYM-BLK-wide.png';
//import announcment4 from '../assets/images/SYM-BLK.png';
//import announcment5 from '../assets/images/SYM-BLK-nerrow.png';
//import SVG from '../assets/images/office-365-hero-950x180_1.svg';
import {WcImg} from '../../system/codes/WcResource';

export default () => (
    <div className="wc-top-announcments">
    <div className="wc-announcments" id="announcment11">
       <WcImg className="wcAnnouncmentImage" id="wcImg" height="300px" style={{backgroundColor:'red',float:'right'}} src={announcment1} alt=""/>
    </div>
    
    </div> 
);


