import React from 'react';
import announcment1 from '../assets/images/office-365-hero-950x180_1.jpg';
import announcment2 from '../assets/images/9b54e547-b5ae-43ca-950a-07b77bdc8ffe.png';
import announcment3 from '../assets/images/SYM-BLK-wide.png';
import announcment4 from '../assets/images/SYM-BLK.png';
import announcment5 from '../assets/images/SYM-BLK-nerrow.png';
import SVG from '../assets/images/office-365-hero-950x180_1.svg';
import { WcImg } from '../../WcResource';
import WcpcContent from '../../WcpcContent';

export default () => (
    <div className="wc-top-announcments">
        <WcpcContent wc_product_code="17"><div className="wc-announcments" id="announcment22"><WcImg src={require('./SYM-BLK-wide.png')}/></div></WcpcContent>

        <div className="wc-announcments" id="announcment33"><WcImg src={announcment3}/></div>
        <div className="wc-announcments" id="announcment44"><WcImg src={announcment4}/></div>
        <div className="wc-announcments" id="announcment44"><WcImg src={announcment5}/></div>
    </div>
);


