import React from 'react'
import Slider from 'react-slick';
import { observer } from 'mobx-react';

import {WcLink , WcImg , WcPlayer , absolutizeSrc} from './WcResource';
import '../style/announcements.css';
import '../style/videoGallery.css';

import { Link } from 'react-router-dom';
import { Player, ControlBar , PlayToggle , BigPlayButton } from 'video-react';



/*
NOTE: In order to CHANGE AUTOPLAY (False/True), use the State settings (autoplay) AND NOT the Slider setting
      In order to CHANGE THE AUTOPLAY SPEED - change the Timeout in startSlideTimeout()
      In order to CHANGE ARROWS/NUMBERS AUTOPLAY (False/True), use the State settings (autoplayArrows/autoplayPagination) AND NOT the Slider setting
*/

const Wcan = observer(class Wcan extends React.Component {
    
    constructor(props) {
        super(props)
        this.getUpdatedArray = this.getUpdatedArray.bind(this);
        this.startSlideTimeout = this.startSlideTimeout.bind(this);
        this.endSlideTimeout = this.endSlideTimeout.bind(this);
        this.sliderArrows = this.sliderArrows.bind(this);
        this.sliderNumbers = this.sliderNumbers.bind(this);
        this.sliderPlayAndPauseButton = this.sliderPlayAndPauseButton.bind(this);
        this.changeClass = this.changeClass.bind(this);

        this.s = this.props.data_setting;
        this.init = {
            //slider settings - autoplay
            autoplay            :   (this.s.autoplay!=null              ? this.s.autoplay : false),              //turn on/off autoplay in slider (Boolean)
            autoplayArrows      :   (this.s.autoplayArrows!=null        ? this.s.autoplayArrows : false),        //turn on/off autoplay in arrows buttons (Boolean)
            autoplayPagination  :   (this.s.autoplayPagination!=null    ? this.s.autoplayPagination : false),    //turn on/off autoplay in numbers buttons (Boolean)
            autoplaySpeed       :   (this.s.autoplaySpeed!=null         ? this.s.autoplaySpeed : 3000),          //control the speed of autoplay changing slides (Integer)
            //slider settings - other settings
            infinite            :   (this.s.infinite!=null              ? this.s.infinite : true ),              //turn on/off infinite for the slier  (Boolean - true as Default)
            speed               :   (this.s.speed!=null                 ? this.s.speed    : 500 ),
            pauseOnHover        :   (this.s.pauseOnHover!=null          ? this.s.pauseOnHover  : false),
            slidesToShow        :   (this.s.slidesToShow!=null          ? this.s.slidesToShow  : 1 ),
            changeImage         :   (this.s.changeImage                 ? this.s.changeImage   : false),             
            changeImageWidth    :   (this.s.changeImageWidth            ? this.s.changeImageWidth : 600),
            sliderWidth         :   (this.s.sliderWidth                 ? this.s.sliderWidth : '100%'),
            sliderHeight        :   this.s.sliderHeight,
            isDots              :   (this.s.isDots!=null                ? this.s.isDots : true),
            isArrows            :   (this.s.isArrows!=null              ? this.s.isArrows : true),     
            isAutoplay          : false
        };
        this.state = {
            //NOT TO EDIT - USES AS FLAGS
            slidesNew           :   this.props.data_slides,
            sliderPaused        :   false,                                 //flag for stopping autoplay (Boolean)
            slideDirection      :   true,                                  //flag for autoplay direction (Boolean)
            butoonPaused        :   false,                                 //flag for pause/play button (Boolean)
            pauseClass          :   'wcAnnounceItemNum wcAnnouncePause'    //flag for play/pause button class (String)

        };
    }

    /*TODO:
          ***  fix problem with infinite - if we get to the end and try to start again it causes problems
          ***  check pauseOnHover - something not right
    */

    componentDidMount() {
        //control autoplay on page loading
        // if(this.init.autoplay && !this.init.isDots){
        if(this.init.autoplay){
            this.startSlideTimeout();
            //this.setState({autoplaySpeed: this.state.autoplaySpeed}); //26.10
        }else{
            this.setState({butoonPaused: true});
            this.state.pauseClass = 'wcAnnounceItemNum wcAnnouncePlay';
        }
        this.getUpdatedArray();

        //if not infinite - disable prev button
        if(!this.init.infinite && !this.init.isDots){
            document.getElementById('wcAnnouncePrev').className = 'wcAnnouncePrev wcAnnounceDisable';
            document.getElementById('wcAnnouncePrev').disabled = true;

        }          
    }

    getUpdatedArray(){
          var slidesArr = [];
          var currentDate = new Date();


          for (var i = 0; i < this.props.data_slides.length; i++) {
            var startDate   =   (this.props.data_slides[i][6] !== false ?  new Date(this.props.data_slides[i][6]) : false )
            var endDate     =   (this.props.data_slides[i][7] !== false ?  new Date(this.props.data_slides[i][7]) : false )

            if  (   (   (startDate ===  false) && (endDate ===  false)          )    || //1
                    (   (startDate <= currentDate) && (endDate ===  false)      )    || //2
                    (   (startDate ===  false) && (endDate >= currentDate)      )    || //3
                    (   (startDate <=  currentDate) && (endDate >= currentDate) )       //4
                ){
                slidesArr.push(this.props.data_slides[i]);
            }

          }

          this.state.slidesNew = slidesArr;



    }

    startSlideTimeout() {
    //on use when we want autoplay for the slider - uses to play the autoplay
        this.timeout = setTimeout(() => {
            try {
                if(this.init.isDots){                 
                    //this.init.isAutoplay = true;
                    this.slider.slickNext();
                    this.endSlideTimeout();
                }else if(this.state.slideDirection){
                    this.slider.slickNext();
                }else{
                    this.slider.slickPrev();
                }
                if(!this.init.isDots){
                    this.state.slideDirection = true;
                    this.startSlideTimeout();
                }
            }catch(err){
                this.endSlideTimeout();
            }

        },  this.init.autoplaySpeed);
    }

    endSlideTimeout() {
    //on use when we want autoplay for the slider - uses to stop the autoplay
        clearTimeout(this.timeout);
    }

    sliderArrows(e) {
    //control the arrows buttons of the slider (preview/next)
        if(!this.init.autoplayArrows){//control autoplayArrows
            this.setState({butoonPaused: true});
            this.state.pauseClass = 'wcAnnounceItemNum wcAnnouncePlay';
            this.endSlideTimeout();
        }

        if(e.target.dataset.id === 'next'){
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
            if (i === (num+1)){
                document.getElementById(id).className = 'wcAnnounceItemNum wcAnnounce'+i+'Active';
            }else{
                document.getElementById(id).className = 'wcAnnounceItemNum wcAnnounce'+i;
            }
        }
        this.state.sliderPaused = true;

        if(!this.init.autoplayPagination){//control autoplayPagination
            this.setState({butoonPaused: !this.state.butoonPaused});
            this.state.pauseClass = 'wcAnnounceItemNum wcAnnouncePlay';
        }else{
            this.startSlideTimeout();
        }

        this.slider.slickGoTo(num);
    }

    sliderPlayAndPauseButton() {
    //control the play/pause buttons of the slider
        if(!this.state.butoonPaused){
            this.setState({butoonPaused: true});
            this.state.pauseClass = 'wcAnnounceItemNum wcAnnouncePlay';
            this.endSlideTimeout();
        }else{
            this.setState({butoonPaused: false});
            this.state.pauseClass = 'wcAnnounceItemNum wcAnnouncePause';
            this.startSlideTimeout();
        }
    }

    changeClass(e) {
    //control the control nav player classes
          var pre = 0; var next = 0; var id_pre = ''; var id_next = '';

          if(this.state.slideDirection){
              pre = Number(Number(e) + 1);
              next = Number(pre+1);

              if(next > this.state.slidesNew.length)
              {
                  next = 1;
              }else if(!this.init.infinite && (next === this.state.slidesNew.length) ){
                    document.getElementById('wcAnnounceNext').className = 'wcAnnounceNext wcAnnounceDisable';
                    document.getElementById('wcAnnounceNext').disabled = true;
              }

              if(!this.init.infinite){
                document.getElementById('wcAnnouncePrev').className = 'wcAnnouncePrev';
                document.getElementById('wcAnnouncePrev').disabled = false;
              }

          }else{
              pre = Number(Number(e) + 1);
              next = Number(pre-1);

              if(Number(e) === 0)
              {
                  pre = 1;
                  next = this.state.slidesNew.length;
              }
              else if(!this.init.infinite && (Number(e) === 1) )
              {
                    console.log('no next');
                    document.getElementById('wcAnnouncePrev').className = 'wcAnnouncePrev wcAnnounceDisable';
                    document.getElementById('wcAnnouncePrev').disabled = true;
              }

              if(!this.init.infinite){
                document.getElementById('wcAnnounceNext').className = 'wcAnnounceNext';
                document.getElementById('wcAnnounceNext').disabled = false;
              }

          }

          this.state.slideDirection = true;

          id_pre = 'slide_'+pre;
          id_next = 'slide_'+next;

          if(!this.state.sliderPaused){
            document.getElementById(id_pre).className = 'wcAnnounceItemNum wcAnnounce'+pre;
            document.getElementById(id_next).className = 'wcAnnounceItemNum wcAnnounce'+next+'Active';
          }
          this.state.sliderPaused = false;

    }

    handleResize(size,settings) {
        if(this.init.changeImage === true){
            if(size === 'sm'){
                settings.changeImgSrc = 5;
            }else{
                settings.changeImgSrc =  4;
            }
        }
    }


    render() {
        const videoData = this.props.data_video;
        const {isDots , infinite} = this.init;

        const settings = {
            arrows:         isDots,
            autoplay:       this.init.isDots,
            dots:           this.init.isDots,
            infinite:       this.init.infinite,
            pauseOnHover:   this.init.pauseOnHover,
            slidesToShow:   this.init.slidesToShow,
            speed:          this.init.speed,
            swipe:          false, //TODO ??
            touchMove:      false, //TODO ??
            swipeToSlide:   false  //TODO ??          
        };

        const res_settings = {changeImgSrc:   4};

        this.handleResize(this.props.ResponsiveStore.wcContainerSize,res_settings);
        
        

        var divStyle = {
            width: this.init.sliderWidth,
            height: this.init.sliderHeight
        };

        return (
            <div>
                <div className="AnnouncementSlick" style={divStyle}>
                    <Slider ref={ (c) => this.slider = c } beforeChange={!this.init.isDots && this.changeClass.bind(this)} {...settings}>
                        {this.state.slidesNew.map((slide, index) => (
                            <div key={index}>
                                { (slide[2] === 'videoLink') ?
                                    <div className="wcVideoSlideContainer" style={{backgroundImage: `url(${absolutizeSrc(videoData[Number(slide[1])][0])})` ,  width: '100%',height:this.init.sliderHeight}}>
                                        <div className="wcVideoSlideText">
                                            <div dangerouslySetInnerHTML={{ __html: videoData[Number(slide[1])][1]}}></div>
                                        </div>                                  
                                        <div className="wcVideoSlidePlayer" style={{width:videoData[Number(slide[1])][4],height:videoData[Number(slide[1])][5]}} title={videoData[Number(slide[1])][6]}>
                                            {/* TODO: CHECK IF NNED CHANGE IMAGE IS TRUE */}
                                            <WcPlayer playsInline src={videoData[Number(slide[1])][2]} poster={videoData[Number(slide[1])][3]}> 
                                                <BigPlayButton position="center" />
                                            </WcPlayer> 
                                        </div> 
                                    </div>                      
                                    : (slide[2] === 'LocalLink') ?
                                    <Link to={slide[1]}>
                                        {/* TODO: CHECK IF NNED CHANGE IMAGE IS TRUE */}
                                        <WcImg src={slide[res_settings.changeImgSrc]} alt={slide[3]} title={slide[3]}/>
                                    </Link>                          
                                    :
                                    <WcLink href={slide[1]} className="wcAnnounceLink" title={slide[3]} target="_blank">
                                        {/* TODO: CHECK IF NNED CHANGE IMAGE IS TRUE */}
                                        <WcImg src={slide[res_settings.changeImgSrc]} alt={slide[3]} title={slide[3]}/>
                                    </WcLink>
                                }


                            </div>
                        ))}

                    </Slider>
                    <ul className="wcAnnounceUl">
                        {!this.init.isDots &&
                            <span>
                                <li><button id='wcAnnounceNext' className="wcAnnounceNext" data-id='next' onClick={this.sliderArrows}></button></li>
                                <li><button id='wcAnnouncePrev' className="wcAnnouncePrev" data-id='previous' onClick={this.sliderArrows}></button></li>
                            </span>
                        }
                        {!this.init.isDots && this.state.slidesNew.map((slide,index) => (
                            <li key={index}><span id={'slide_'+Number(index+1)} data-id={index} className={Number(index)===0 ? 'wcAnnounceItemNum wcAnnounce1Active' : 'wcAnnounceItemNum wcAnnounce'+Number(index+1)} onClick={this.sliderNumbers.bind(this)}></span></li>
                        ))}
                        {!this.init.isDots && 
                            <li><span className={this.state.pauseClass} onClick={this.sliderPlayAndPauseButton}></span></li>
                        }

                    </ul>                    
                    <br/>
                </div>
                {this.init.isArrows && <br/>}
                <div className="wcClear"></div>
            </div>
        );
    }
})

export default Wcan;