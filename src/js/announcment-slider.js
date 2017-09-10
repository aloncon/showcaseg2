import React, { Component } from 'react'
import Slider from 'react-slick';

import WcResource from '../WcResource';
import WcpcContent from '../WcpcContent';

import '../css/announcments.css'



/*
NOTE: In order to CHANGE AUTOPLAY (False/True), use the State settings (autoplay) AND NOT the Slider setting
      In order to CHANGE THE AUTOPLAY SPEED - change the Timeout in startSlideTimeout()
      In order to CHANGE ARROWS/NUMBERS AUTOPLAY (False/True), use the State settings (autoplayArrows/autoplayPagination) AND NOT the Slider setting
*/

export default class Wcan extends React.Component {

    constructor(props) {
        super(props)
        this.getUpdatedArray = this.getUpdatedArray.bind(this);
        this.startSlideTimeout = this.startSlideTimeout.bind(this);
        this.endSlideTimeout = this.endSlideTimeout.bind(this);
        this.sliderArrows = this.sliderArrows.bind(this);
        this.sliderNumbers = this.sliderNumbers.bind(this);
        this.sliderPlayAndPauseButton = this.sliderPlayAndPauseButton.bind(this);
        this.changeClass = this.changeClass.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.state = {
            //slider autoplay related
            autoplay            :           this.props.data_setting.autoplay,                 //turn on/off autoplay in slider (Boolean)
            autoplayArrows      :           this.props.data_setting.autoplayArrows,           //turn on/off autoplay in arrows buttons (Boolean)
            autoplayPagination  :           this.props.data_setting.autoplayPagination,       //turn on/off autoplay in numbers buttons (Boolean)
            autoplaySpeed       :           this.props.data_setting.autoplaySpeed,            //control the speed of autoplay changing slides (Integer)
            //change Image On Different Width related
            changeImage         :           this.props.data_setting.changeImage,
            changeImageWidth    :           this.props.data_setting.changeImageWidth,
            changeImgSrc        :           3,
            windowHeight        :           window.innerHeight,
            windowWidth         :           window.innerWidth,

            //NOT TO EDIT - USES AS FLAGS
            slidesNew           :           this.props.data_slides,
            sliderPaused        :           false,                                 //flag for stopping autoplay (Boolean)
            slideDirection      :           true,                                  //flag for autoplay direction (Boolean)
            butoonPaused        :           false,                                 //flag for pause/play button (Boolean)
            pauseClass          :           'wcan-sb-item wcan-pause'             //flag for play/pause button class (String)

        }
    }


    componentDidMount() {
    //control autoplay on page loading
        if(this.state.autoplay){
            this.startSlideTimeout();
            this.setState({autoplaySpeed: this.state.autoplaySpeed});
        }else{
            this.setState({butoonPaused: true});
            this.state.pauseClass = 'wcan-sb-item wcan-play';
        }
        this.getUpdatedArray();

        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        this.handleResize();
        window.removeEventListener('resize', this.handleResize);
    }

    getUpdatedArray(){
          var slidesArr = [];
          var currentDate = new Date();

          for (var i = 0; i < this.props.data_slides.length; i++) {
            if(this.props.data_slides[i][5] ==  false)
            {
                slidesArr.push(this.props.data_slides[i]);
            }else{
                var startDate = new Date(this.props.data_slides[i][5]);
                var endDate = new Date(this.props.data_slides[i][6]);
                if (currentDate < endDate && currentDate > startDate){
                    slidesArr.push(this.props.data_slides[i]);
                }
            }
          }

          this.state.slidesNew = slidesArr;



    }

    startSlideTimeout() {
    //on use when we want autoplay for the slider - uses to play the autoplay
        this.timeout = setTimeout(() => {
            try {
                if(this.state.slideDirection){
                    this.slider.slickNext();
                }else{
                    this.slider.slickPrev();
                }
                this.state.slideDirection = true;
                this.startSlideTimeout();
            }catch(err){
                this.endSlideTimeout();
            }

        },  this.state.autoplaySpeed);
    }

    endSlideTimeout() {
    //on use when we want autoplay for the slider - uses to stop the autoplay
        clearTimeout(this.timeout);
    }

    sliderArrows(e) {
    //control the arrows buttons of the slider (preview/next)
        if(!this.state.autoplayArrows){//control autoplayArrows
            this.setState({butoonPaused: true});
            this.state.pauseClass = 'wcan-sb-item wcan-play';
            this.endSlideTimeout();
        }

        if(e.target.dataset.id == 'next'){
            //this.setState({slideDirection: true});
             this.state.slideDirection = true;
            //this.state.slideDirection = true;
            this.slider.slickNext();
        }else{
            //this.setState({slideDirection: false});
            this.state.slideDirection = false;
            //this.state.slideDirection = false;
            this.slider.slickPrev();
        }
    }

    sliderNumbers(e) {
    //control the numbers buttons of the slider (1,2,3....)
        var num = Number(e.target.dataset.id);
            this.endSlideTimeout();

                for (var i = 1; i < this.state.slidesNew.length+1; i++) {
                    var id = 'slide_'+i;
                    if (i == (num+1)){
                        document.getElementById(id).className = 'wcan-sb-item wcan-'+i+'a';
                    }else{
                        document.getElementById(id).className = 'wcan-sb-item wcan-'+i;
                    }
                }
            this.state.sliderPaused = true;

            if(!this.state.autoplayPagination){//control autoplayPagination
                this.setState({butoonPaused: !this.state.butoonPaused});
                this.state.pauseClass = 'wcan-sb-item wcan-play';
            }else{
                this.startSlideTimeout();
            }

            this.slider.slickGoTo(num);
    }

    sliderPlayAndPauseButton() {
    //control the play/pause buttons of the slider
        if(!this.state.butoonPaused){
            console.log('Pause!');
            this.setState({butoonPaused: true});
            this.state.pauseClass = 'wcan-sb-item wcan-play';
            this.endSlideTimeout();
        }else{
            console.log('Play!');
            this.setState({butoonPaused: false});
            this.state.pauseClass = 'wcan-sb-item wcan-pause';
            this.startSlideTimeout();
        }
    }

    changeClass(e) {
    //control the control nav player classes
          var pre = 0; var next = 0; var id_pre = ''; var id_next = '';

          if(this.state.slideDirection){
              pre = Number(Number(e) + 1);
              next = Number(pre+1);
              if(next > this.state.slidesNew.length){next = 1;}
          }else{
              pre = Number(Number(e) + 1);
              next = Number(pre-1);
              if(Number(e) == 0){pre = 1; next = this.state.slidesNew.length;}
          }
          this.state.slideDirection = true;

          id_pre = 'slide_'+pre;
          id_next = 'slide_'+next;

          if(!this.state.sliderPaused){
            document.getElementById(id_pre).className = 'wcan-sb-item wcan-'+pre;
            document.getElementById(id_next).className = 'wcan-sb-item wcan-'+next+'a';
          }
          this.state.sliderPaused = false;

    }

    handleResize(e) {
         this.setState({
             windowHeight: window.innerHeight,
             windowWidth: window.innerWidth,
         });
        if(this.state.changeImage == true){
            if(window.innerWidth >= this.state.changeImageWidth){
                this.setState({
                    changeImgSrc: 3
                });
            }else{
                this.setState({
                    changeImgSrc: 4
                });
            }
        }
    }

    render() {
        const settings = {
            dots: false,
            arrows: false,
            infinite: true,
            pauseOnHover: false,
            slidesToShow: this.props.data_setting.slidesToShow,
            speed: this.props.data_setting.speed,
            autoplay: false

        };
        return (
          <div>
            <Slider ref={ c => this.slider = c } beforeChange={ this.changeClass.bind(this)} {...settings}>
                {this.state.slidesNew.map((slide, index) => (
                    <div key={index}>
                        <WcResource><a href={slide[1]} className='wc-link' title={slide[2]} target="_blank">
                            <WcResource><img src={slide[this.state.changeImgSrc]}  title={slide[2]}/></WcResource>
                        </a></WcResource>
                    </div>
                ))}
            </Slider>
            <ul className='wcan_ul'>
                <li><span className='wcan-next' data-id='next' onClick={this.sliderArrows}></span></li>
                <li><span className='wcan-previous' data-id='previous' onClick={this.sliderArrows}></span></li>
                {this.state.slidesNew.map((slide,index) => (
                    <li key={index}><span id={'slide_'+Number(index+1)} data-id={index} className={Number(index)==0 ? 'wcan-sb-item wcan-1a' : 'wcan-sb-item wcan-'+Number(index+1)} onClick={this.sliderNumbers.bind(this)}></span></li>
                ))}
                <li><span className={this.state.pauseClass} onClick={this.sliderPlayAndPauseButton}></span></li>
            </ul>
            <br/>
           {/*} <span>
                {this.state.windowWidth} x {this.state.windowHeight}
            </span> */}
          </div>
        );
    }
}