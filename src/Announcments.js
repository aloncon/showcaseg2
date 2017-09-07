import React, { Component } from 'react'
import Slider from 'react-slick';


import wcan1_asset from './announcments/assets/Kaspersky_Magic_Quadrant_2016.pdf';
import wcan2_asset from './announcments/assets/Q4_16_KSV_New_Customer.pdf';
import wcan3_asset from './announcments/assets/Q4_16_VSB_Customer_Provantage.pdf';
import wcan4_asset from './announcments/assets/Kaspersky_Magic_Quadrant_2016.pdf';
import wcan5_asset from './announcments/assets/Kaspersky_Magic_Quadrant_2016.pdf';

import wcan1_img from './announcments/banners/1.jpg';
import wcan2_img from './announcments/banners/2.jpg';
import wcan3_img from './announcments/banners/3.jpg';
import wcan4_img from './announcments/banners/4.jpg';
import wcan5_img from './announcments/banners/5.jpg';

import WcResource from './WcResource';
import WcpcContent from './WcpcContent';

//NOTE: In order to CHANGE AUTOPLAY (False/True), use the State settings (autoplay) AND NOT the Slider setting
//      In order to CHANGE THE AUTOPLAY SPEED - change the Timeout in startSlideTimeout()
//      In order to CHANGE ARROWS/NUMBERS AUTOPLAY (False/True), use the State settings (autoplay_arrows/autoplay_numbers) AND NOT the Slider setting

//TO Add new Announcement:
//                          1. import  wcan_asset & wcan_img
//                          2. add the announcement info as a new array in the slides array below , with the following info: [id,wcan_asset,title,wcan_img]


const slides = [
                    [0,wcan1_asset,'KSV 25% Discount',wcan1_img],
                    [1,wcan2_asset,'Q4_16_KSV_New_Customer',wcan2_img],
                    [2,wcan3_asset,'Q4_16_VSB_Customer_Provantage.pdf',wcan3_img],
                    [3,wcan4_asset,'KSV 25% Discount',wcan4_img],
                    [4,wcan5_asset,'Q4_16_KSV_New_Customer',wcan5_img]
               ];

const sliderLength = slides.length;

export default class Wcan extends Component {

    constructor(props) {
        super(props)
        this.startSlideTimeout = this.startSlideTimeout.bind(this);
        this.endSlideTimeout = this.endSlideTimeout.bind(this);
        this.sliderArrows = this.sliderArrows.bind(this);
        this.sliderNumbers = this.sliderNumbers.bind(this);
        this.sliderPlayAndPauseButton = this.sliderPlayAndPauseButton.bind(this);
        this.changeClass = this.changeClass.bind(this);
        this.state = {
            autoplay: true, //trun on/off autoplay in slider
            autoplay_arrows: false, //turn on/off autoplay in arrows buttons
            autoplay_numbers: false, //turn on/off autoplay in numbers buttons
            autoplay_speed: 3000, //control the speed of autoplay changing slides
            //not to edit
            slider_paused: false,//flag for stopping autoplay
            slide_direction: true,//flag for autoplay direction
            butoon_paused: false,//flag for pause/play button
            pauseClass: 'wcan-sb-item wcan-pause',//flag for play/pause button class
        }
    }

    componentDidMount() {
    //control autoplay on page loading
        if(this.state.autoplay){
            this.startSlideTimeout();
            this.setState({autoplay_speed: this.state.autoplay_speed});
        }else{
            this.setState({butoon_paused: true});
            this.state.pauseClass = 'wcan-sb-item wcan-play';
        }

    }

    startSlideTimeout() {
    //on use when we want autoplay for the slider - uses to play the autoplay
        this.timeout = setTimeout(() => {
            if(this.state.slide_direction){
                this.slider.slickNext();
            }else{
                this.slider.slickPrev();
            }
            this.state.slide_direction = true;
            this.startSlideTimeout();

        },  this.state.autoplay_speed);
    }

    endSlideTimeout() {
    //on use when we want autoplay for the slider - uses to stop the autoplay
        clearTimeout(this.timeout);
    }

    sliderArrows(e) {
    //control the arrows buttons of the slider (preview/next)
        if(!this.state.autoplay_arrows){//control autoplay_arrows
            this.setState({butoon_paused: true});
            this.state.pauseClass = 'wcan-sb-item wcan-play';
            this.endSlideTimeout();
        }

        if(e.target.dataset.id == 'next'){
            //this.setState({slide_direction: true});
             this.state.slide_direction = true;
            //this.state.slide_direction = true;
            this.slider.slickNext();
        }else{
            //this.setState({slide_direction: false});
            this.state.slide_direction = false;
            //this.state.slide_direction = false;
            this.slider.slickPrev();
        }
    }

    sliderNumbers(e) {
    //control the numbers buttons of the slider (1,2,3....)
        var num = Number(e.target.dataset.id);
            this.endSlideTimeout();

                for (var i = 1; i < sliderLength+1; i++) {
                    var id = 'slide_'+i;
                    if (i == (num+1)){
                        document.getElementById(id).className = 'wcan-sb-item wcan-'+i+'a';
                    }else{
                        document.getElementById(id).className = 'wcan-sb-item wcan-'+i;
                    }
                }
            this.state.slider_paused = true;

            if(!this.state.autoplay_numbers){//control autoplay_numbers
                this.setState({butoon_paused: !this.state.butoon_paused});
                this.state.pauseClass = 'wcan-sb-item wcan-play';
            }else{
                this.startSlideTimeout();
            }

            this.slider.slickGoTo(num);
    }

    sliderPlayAndPauseButton() {
    //control the play/pause buttons of the slider
        if(!this.state.butoon_paused){
            console.log('Pause!');
            this.setState({butoon_paused: true});
            this.state.pauseClass = 'wcan-sb-item wcan-play';
            this.endSlideTimeout();
        }else{
            console.log('Play!');
            this.setState({butoon_paused: false});
            this.state.pauseClass = 'wcan-sb-item wcan-pause';
            this.startSlideTimeout();
        }
    }

    changeClass(e) {
    //control the control nav player classes
          var pre = 0; var next = 0; var id_pre = ''; var id_next = '';

          if(this.state.slide_direction){
              pre = Number(Number(e) + 1);
              next = Number(pre+1);
              if(next > sliderLength){next = 1;}
          }else{
              pre = Number(Number(e) + 1);
              next = Number(pre-1);
              if(Number(e) == 0){pre = 1; next = sliderLength;}
          }
          this.state.slide_direction = true;

          id_pre = 'slide_'+pre;
          id_next = 'slide_'+next;

          if(!this.state.slider_paused){
            document.getElementById(id_pre).className = 'wcan-sb-item wcan-'+pre;
            document.getElementById(id_next).className = 'wcan-sb-item wcan-'+next+'a';
          }
          this.state.slider_paused = false;

    }

    render() {
        const settings = {
            dots: false,
            arrows: false,
            infinite: true,
            pauseOnHover: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            autoplay: false
        };
        return (
          <div>
            <Slider ref={ c => this.slider = c } beforeChange={ this.changeClass.bind(this)} {...settings}>
                {slides.map((slide) => (
                    <div key={slide[0]}>
                        <WcResource><a href={slide[1]} className='wc-link' title={slide[2]} target="_blank">
                            <WcResource><img src={slide[3]}  title={slide[2]}/></WcResource>
                        </a></WcResource>
                    </div>
                ))}
            </Slider>
            <ul className='wcan_ul'>
                <li><span className='wcan-next' data-id='next' onClick={this.sliderArrows}></span></li>
                <li><span className='wcan-previous' data-id='previous' onClick={this.sliderArrows}></span></li>
                {slides.map((slide) => (
                    <li key={slide[0]}><span id={'slide_'+Number(slide[0]+1)} data-id={slide[0]} className={Number(slide[0])==0 ? 'wcan-sb-item wcan-1a' : 'wcan-sb-item wcan-'+Number(slide[0]+1)} onClick={this.sliderNumbers.bind(this)}></span></li>
                ))}
                <li><span className={this.state.pauseClass} onClick={this.sliderPlayAndPauseButton}></span></li>
            </ul>
            <br/>
          </div>
        );
    }
}
