import React from 'react'
import ResponsiveStore from '../../store/ResponsiveStore';

import wcan1_asset from '../assets/announcements/assets/Kaspersky_Magic_Quadrant_2016.pdf';
import wcan2_asset from '../assets/announcements/assets/Q4_16_KSV_New_Customer.pdf';
import wcan3_asset from '../assets/announcements/assets/Q4_16_VSB_Customer_Provantage.pdf';
import wcan4_asset from '../assets/announcements/assets/Kaspersky_Magic_Quadrant_2016.pdf';
//import wcan5_asset from '../assets/announcements/assets/Kaspersky_Magic_Quadrant_2016.pdf';


import wcan1_img from '../assets/announcements/banners/1.jpg';
import wcan2_img from '../assets/announcements/banners/2.jpg';
import wcan3_img from '../assets/announcements/banners/3.jpg';
import wcan4_img from '../assets/announcements/banners/4.jpg';
import wcan5_img from '../assets/announcements/banners/5.jpg';

import wcan1_img_s from '../assets/announcements/banners/1-s.jpg';
import wcan2_img_s from '../assets/announcements/banners/2-s.jpg';
import wcan3_img_s from '../assets/announcements/banners/3-s.jpg';
import wcan4_img_s from '../assets/announcements/banners/4-s.jpg';
import wcan5_img_s from '../assets/announcements/banners/5-s.jpg';

import AnnouncementsComp from '../../system/codes/announcement.js';


import sliderBackground from '../assets/announcements/banners/announcementVideoBackground.jpg';
import videoTestSrc from '../assets/video/videoTest.mp4';
import videoTestPoster from '../assets/video/posterTest.jpg'

/*
########## Announcement Documention: ##########
###############################################

This Announcement component is based on our oldest Announcement slider that was on the old showcase.

We added new features that allows us to give it a diffrent styling or reamain the old one.

This Announcement component is fully responsive, flexabe, and adopted to mobile.

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
      [ string/number ,  component/string/''  ,       string        , string ,  component , component ,    number/boolean , number/boolean  ]
      [      id       ,   wcan_asset   ,   wcan_asset_id    ,  title  , wcan_img  , wcan_img_s ,     startDate     ,   endDate       ]

      0)    id - a UNIQUE string/number.
      1)    wcan_asset      -      if asset is local Link: string of the path for the destination as configue in configuration.js (For Example: '')
                                   if asset is External Link: string of the external Link (For Example: 'www.webcollage.com')
                                   if asset is pdf/imagevideo: the name of the import you added (For Example: wcan_asset)
                                   if the asset is video: the name of the import you added (For Example: wcan_asset) 
                                   Note: you need to also provide a background image for the slide
                                   if there is no asset , leave blank ('').
      2)    wcan_asset_id   -      what type the asset is? (LocalLink/Asset/ExternalLink).
      3)    title           -      title for the image/asset
      4)    wcan_img        -      the path for the banner location.
      5)    wcan1_img_s     -      the path for the small banner location , if there isn't one add false
      6)    startDate       -      the start date (as instructed above) for this banner  , if there isn't add false
      7)    endDate         -      the start date (as instructed above) for this banner  , if there isn't add false


********      Add new Announcement:     ****************
      1)    import  wcan_asset & wcan_img
      2)    add the announcement info as a new array in the slides array below , with the following info: [id,wcan_asset,title,wcan_img,wcan_img_s,startDate,endDate]
      //IF NEEDED MORE THEN ONE:
      3)    add another class (For example Announcements1) with the required wcan_setting and wcan_slides.
      4)    add Announcements1 to the export

********      Include the component at a page:     ****************
      1)    import {Announcements} from '../modules/Announcements';
      2)    put <Announcements /> where you want the Announcement to show
      //IF NEEDED MORE THEN ONE:
      3)    import as needed (for example: 'import {Announcements , Announcements1} from './Announcement';' )
      4)    put <Announcements1 /> as well where you want the Announcement to show
*/


    /*    DO NOT CHANGE THE ORDER OF THE ARRAY!!!!!!    */
    const announcements_slides = [
        [0 , wcan1_asset  , 'Asset'        , 'KSV 25% Discount'              , wcan1_img , wcan1_img_s , false , false],
        [1 , wcan2_asset  , 'Asset'        , 'Q4_16_KSV_New_Customer'        , wcan2_img , wcan2_img_s , false , false],
        [2 , wcan3_asset  , 'Asset'        , 'Q4_16_VSB_Customer_Provantage' , wcan3_img , wcan3_img_s , false , false],
        [3 , wcan4_asset  , 'Asset'        , 'KSV 25% Discount'              , wcan4_img , wcan4_img_s , false , false],
        [4 , '/iframe'    , 'LocalLink'    , 'Q4_16_KSV_New_Customer'        , wcan5_img , wcan5_img_s , false , false],
        [5 , '0'          , 'videoLink'    , ''                         , '' , '' , false , false]
    ]

    const announcements_video = [
      //[Slider Background (0) , slider content (1) , video src (2) , video poster (3)  , video width (4) , video height (5) , video title (6) ] 
        [sliderBackground  ,'<h2>Sale Sale Sale 2</h2><p>Sale Sale Sale</p><p>Sale Sale Sale</p>',videoTestSrc,videoTestPoster,'300px','200px','video']
    ]

    //********Slider Settings  CHANGE ONLY BY REQUEST!! ****************//
    const announcements_setting = {
        isDots                  :       true,           //  Show navigation as dots                                     (Boolean - true as Default  (false will show numbers as dots)  )
        autoplay                :       true,           //  Should the scroller auto scroll?                            (Boolean - false as Default)
        autoplayArrows          :       false,          //  Should the Arrows turn on auto scroll?                      (Boolean - false as Default)
        autoplayPagination      :       false,          //  Should the Pagination turn on  auto scroll?                 (Boolean - false as Default)
        autoplaySpeed           :       3000,           //  Delay between each auto scoll. in ms                        (Integer)
        infinite                :       true,           //  Should the gallery wrap around it's contents                (Boolean - true as Default)
        speed                   :       500,            //  Speed of the autoplay                                       (Integer)
        slidesToShow            :       1,              //  Number of slides to be visible at a time                    (Integer - true as Default)
        changeImage             :       true,           //  Should change Image banner in specific width?               (Boolean)
        changeImageWidth        :       700,            //  the width in which the second image will appear             (Integer)
        pauseOnHover            :       true,           //  pause autoplay on hover - works only with dots navigation   (Boolean - false as Default)
        sliderWidth             :       '100%',         //  give fixed width  (Default - full screen: '100%')           (Integer/String)
        sliderHeight            :       '240px'         //  give fixed height (Default - 200px)                         (Integer/String)
    }

    //********video slide Settings  CHANGE ONLY BY REQUEST!! ****************//

    // const announcements_video = {
    //     backgroundImage         :       videoBackground,
    //     videoSrc                :       videoTestSrc,
    //     sliderContent           :       '<h2>Sale Sale Sale 2</h2><p>Sale Sale Sale</p><p>Sale Sale Sale</p>',
        
    // }

//********Do not touch - CHANGE ONLY IF NEEDED!! (for example: to add another Announcement)****************//
class Announcements extends React.Component {

    render() {
        return (
            <AnnouncementsComp data_setting={announcements_setting} data_slides={announcements_slides} data_video={announcements_video} ResponsiveStore={ResponsiveStore}/>
        )

    }


}

export {
    Announcements
}
