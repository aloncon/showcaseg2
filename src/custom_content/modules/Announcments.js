import React, { Component } from 'react'

import wcan1_asset from '../../custom_content/announcments/assets/Kaspersky_Magic_Quadrant_2016.pdf';
import wcan2_asset from '../../custom_content/announcments/assets/Q4_16_KSV_New_Customer.pdf';
import wcan3_asset from '../../custom_content/announcments/assets/Q4_16_VSB_Customer_Provantage.pdf';
import wcan4_asset from '../../custom_content/announcments/assets/Kaspersky_Magic_Quadrant_2016.pdf';
import wcan5_asset from '../../custom_content/announcments/assets/Kaspersky_Magic_Quadrant_2016.pdf';

import wcan1_img from '../../custom_content/announcments/banners/1.jpg';
import wcan2_img from '../../custom_content/announcments/banners/2.jpg';
import wcan3_img from '../../custom_content/announcments/banners/3.jpg';
import wcan4_img from '../../custom_content/announcments/banners/4.jpg';
import wcan5_img from '../../custom_content/announcments/banners/5.jpg';

import wcan1_img_s from '../../custom_content/announcments/banners/1-s.jpg';
import wcan2_img_s from '../../custom_content/announcments/banners/2-s.jpg';
import wcan3_img_s from '../../custom_content/announcments/banners/3-s.jpg';
import wcan4_img_s from '../../custom_content/announcments/banners/4-s.jpg';
import wcan5_img_s from '../../custom_content/announcments/banners/5-s.jpg';

import Announcments from '../../js/announcment-slider.js';
/*
******Instruction to check in browser's console, don't forget to close email and chat and change the time-zone to Eastern Time(US&Canada):
      1)    Create a variable with the new Date (text date)
      2)    Use the getTime function
      3)    Create another variable with the result of (2)
      4)    Check it the variable from (3) is correct.
      For example:
            var endDateNew = new Date('2017/04/28 23:59:59 GMT -0400');
            endDateNew.getTime();
            var date = new Date(1493438399000);
            date

********      Array Info:     ****************
      [ string/number , component/'' , string , component , number/boolean , number/boolean  ]
      [      id       , wcan_asset   , title  , wcan_img  ,     startDate  ,   endDate       ]

      0)    id - a UNIQUE string/number.
      1)    wcan_asset   -      the path for the asset location , if there is no asset , leave blank ('').
      2)    title        -      title for the image/asset
      3)    wcan_img     -      the path for the banner location.
      4)    wcan1_img_s  -      the path for the small banner location , if there isn't one , use wcan_img
      5)    startDate    -      the start date (as instructed above) for this banner  , if there isn't add false
      6)    endDate      -      the start date (as instructed above) for this banner  , if there isn't add false


********      Add new Announcement:     ****************
      1)    import  wcan_asset & wcan_img
      2)    add the announcement info as a new array in the slides array below , with the following info: [id,wcan_asset,title,wcan_img,startDate,endDate]

********      Include the component at a page:     ****************
      1)    import Announcments from './Announcment';
      2)    put <Announcments /> where you want the slider to show
*/

/*
    const Wcan_Slides = [
        [0,wcan1_asset,'KSV 25% Discount',wcan1_img,1498881601000,1506830399000],
        [1,wcan2_asset,'Q4_16_KSV_New_Customer',wcan2_img,false,false],
        [2,wcan3_asset,'Q4_16_VSB_Customer_Provantage.pdf',wcan3_img,1498881601000,1493438399000],
        [3,wcan4_asset,'KSV 25% Discount',wcan4_img,false,false],
        [4,wcan5_asset,'Q4_16_KSV_New_Customer',wcan5_img,false,false]
    ]

    DO NOT CHANGE THE ORDER OF THE ARRAY!!!!!!
*/

    const Wcan_Slides = [
        [0 , wcan1_asset , 'KSV 25% Discount'              , wcan1_img , wcan1_img_s , false , false],
        [1 , wcan2_asset , 'Q4_16_KSV_New_Customer'        , wcan2_img , wcan2_img_s , false , false],
        [2 , wcan3_asset , 'Q4_16_VSB_Customer_Provantage' , wcan3_img , wcan3_img_s , false , false],
        [3 , wcan4_asset , 'KSV 25% Discount'              , wcan4_img , wcan4_img_s , false , false],
        [4 , wcan5_asset , 'Q4_16_KSV_New_Customer'        , wcan5_img , wcan5_img_s , false , false]
    ]

    //********Slider Settings  CHANGE ONLY BY REQUEST!! ****************//
    const Wcan_Setting = {
        infinite                :       true,           //  Should the gallery wrap around it's contents    (Boolean)
        autoplay                :       false,          //  Should the scroller auto scroll?                (Boolean)
        autoplayArrows          :       false,          //  Should the Arrows auto scroll?                  (Boolean)
        autoplayPagination      :       false,          //  Should the Pagination auto scroll?              (Boolean)
        autoplaySpeed           :       3000,           //  Delay between each auto scoll. in ms            (Integer)
        speed                   :       500,            //                                                  (Integer)
        slidesToShow            :       1,              //  Number of slides to Show                        (Integer)
        changeImage             :       true,         //TODO!!
        changeImageWidth        :       700           //TODO!!

    }

//********Do not touch - CHANGE ONLY IF NEEDED!! ****************//
export default class Wcan extends React.Component {

    render() {
        return (
            <Announcments data_setting={Wcan_Setting} data_slides={Wcan_Slides} />
        )

    }


}