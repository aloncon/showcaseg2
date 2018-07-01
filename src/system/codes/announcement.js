/* eslint-disable react/no-direct-mutation-state */
import React from 'react'
import Slider from 'react-slick';
import { observer } from 'mobx-react';

import {WcLink , WcImg , WcPlayer , absolutizeSrc} from './WcResource';
import {WcReports} from './WcEvents';
import '../style/announcements.css';
import '../style/videoGallery.css';

import { Link } from 'react-router-dom';
import {BigPlayButton } from 'video-react';
import moduleInfo from '../codes/moduleInfo'

import ResponsiveStore from '../../store/ResponsiveStore';

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

        //this.s = this.props.data_setting;
        this.s = this.props;

        this.init = {
            //slider settings - autoplay
            autoplay            :   (this.s.autoplay!=null              ? this.s.autoplay : true),              //turn on/off autoplay in slider (Boolean)
            autoplayArrows      :   (this.s.autoplayArrows!=null        ? this.s.autoplayArrows : false),        //turn on/off autoplay in arrows buttons (Boolean)
            autoplayPagination  :   (this.s.autoplayPagination!=null    ? this.s.autoplayPagination : false),    //turn on/off autoplay in numbers buttons (Boolean)
            autoplaySpeed       :   (this.s.autoplaySpeed!=null         ? this.s.autoplaySpeed : 3000),          //control the speed of autoplay changing slides (Integer)
            //slider settings - other settings
            infinite            :   (this.s.infinite!=null              ? this.s.infinite : true ),              //turn on/off infinite for the slier  (Boolean - true as Default)
            speed               :   (this.s.speed!=null                 ? this.s.speed    : 500 ),
            pauseOnHover        :   (this.s.pauseOnHover!=null          ? this.s.pauseOnHover  : true),
            slidesToShow        :   (this.s.slidesToShow!=null          ? this.s.slidesToShow  : 1 ),
            resizeImage         :   (this.s.responsive                  ? this.s.responsive   : true),
            responsiveSize      :   (this.s.responsiveSize!=null        ? this.s.responsiveSize : 'sm'),    
            reporting           :   (this.s.reporting!=null             ? this.s.reporting : true),          
            sliderWidth         :   (this.s.sliderWidth                 ? this.s.sliderWidth : '100%'),
            sliderHeight        :   (this.s.sliderHeight                ? this.s.sliderHeight : 'auto'),
            isDots              :   (this.s.isDots!=null                ? this.s.isDots : true),
            isArrows            :   (this.s.isArrows!=null              ? this.s.isArrows : true),    
            isAutoplay          :   false,
            slidestypes         :   'asset/banner/videoLink/localLink'
        };
        this.state = {
            //NOT TO EDIT - USES AS FLAGS
            //slidesNew           :   this.props.data_slides,
            slidesNew           :   this.getUpdatedArray(),
            showSlider          :   true, 
            showArrows          :   true,                      
            sliderPaused        :   false,                                 //flag for stopping autoplay (Boolean)
            slideDirection      :   true,                                  //flag for autoplay direction (Boolean)
            butoonPaused        :   false,                                 //flag for pause/play button (Boolean)
            pauseClass          :   'wcAnnounceItemNum wcAnnouncePause'    //flag for play/pause button class (String)

        };

        this.videos = [];

        this.setVideoRef = element => {
          this.videos.push(element);
        };

    }

    /*TODO:
          ***  fix problem with infinite - if we get to the end and try to start again it causes problems
          ***  check pauseOnHover - something not right
    */

    componentDidMount() {
        // console.log('gitit - componentDidMount()');
        // console.log('gitit - butoonPaused:'+this.state.butoonPaused);
        // console.log('gitit ----------------------');
        //control autoplay on page loading
        // if(this.init.autoplay && !this.init.isDots){
        if(this.init.autoplay){
            this.startSlideTimeout();
            //this.setState({autoplaySpeed: this.state.autoplaySpeed}); //26.10
            if(this.init.isDots){
                this.setState({butoonPaused: true});
            }
        }else{
            this.setState({butoonPaused: true});
            this.state.pauseClass = 'wcAnnounceItemNum wcAnnouncePlay';
        }
        //this.getUpdatedArray();

        //if not infinite - disable prev button
        if(!this.init.infinite && !this.init.isDots){
            document.getElementById('wcAnnouncePrev').className = 'wcAnnouncePrev wcAnnounceDisable';
            document.getElementById('wcAnnouncePrev').disabled = true;
        }                
    }
    componentWillMount() {
        
        if(this.state.slidesNew.length ===1){
            this.state.showArrows = false;
            this.init.autoplay = false;
        }else if(this.state.slidesNew.length<1){
            this.state.showSlider = false;
            this.state.showArrows = this.init.isDots;
        }else{
            this.state.showArrows = this.init.isDots;
        } 

    }

    getUpdatedArray(){

        // console.log('gitit - getUpdatedArray()')
        // console.log('gitit ----------------------');   

          let {children} = this.props;
          //let pageLocation = location.pathname.replace(/.*\/(.*)/, "$1");//TODO: ask mendy how can I get the location here
          let {slidestypes,reporting} = this.init;
          let currentDate = new Date();
          let slidesArr=[], slidesTempArray=[], slidesInitialArray=[];
          let lengthArr = 0;         
          
          //Check if we have only one slide on Initial array build 
            //if we do - we need to trasform it form object to array
          if(children){
            if(!children.length){
                lengthArr = 1;
                slidesInitialArray = [children];
            }else{
                lengthArr = children.length;
                slidesInitialArray = children;
            }
          }else(
              console.error('WC-ERROR: Please Note! Announcements missing Childrens!!')
          )

          for (var i = 0; i < lengthArr; i++) {
            slidesTempArray = [];
            let slide = slidesInitialArray[i].props;
            var assort      =   slide.assortment;             
            var startDate   =   (slide.startDate !== false ?  new Date(slide.startDate) : false )
            var endDate     =   (slide.endDate !== false ?  new Date(slide.endDate) : false )            

            if  ( (     (   (startDate ===  false) && (endDate ===  false)          )    || //1
                        (   (startDate <= currentDate) && (endDate ===  false)      )    || //2
                        (   (startDate ===  false) && (endDate >= currentDate)      )    || //3
                        (   (startDate <=  currentDate) && (endDate >= currentDate) )    )  //4  
                        &&  (assort === 'all' || assort.includes(moduleInfo.siteName) )
                ){
                //TODO: check data

                var id = slide.id!==undefined?slide.id:i
                var asset = slide.asset;                
                var type = slide.type;
                var title = slide.title;
                if(slide.videoTitle!==undefined){
                    title = slide.videoTitle;
                }                 
                var image = slide.image;
                var imageSmall = slide.imageSmall!==undefined?slide.imageSmall:slide.image;
                var reportingCode = slide.reportingCode!==undefined?slide.reportingCode:title;
                var to = slide.to;
                var bannerContent = slide.bannerContent, videoTitle = slide.videoTitle, videoSrc = slide.videoSrc, 
                    videoPoster = slide.videoPoster, videoWidth = slide.videoWidth, videoHeight = slide.videoHeight;                   
                //check for incorrect/missing props
                if(!slidestypes.includes(type)){
                    console.error('WC-ERROR: Announcements: Note that you declared an incorrect type for a slide ');
                    type = 'banner';
                }else if(asset===undefined && (type!=='localLink' && type!=='videoLink' && type!=='banner') ){
                    if(type==='asset'){
                        console.error('WC-ERROR: Announcements: Note that you declared an asset slide without an Asset File ');
                    }else{
                        console.error('WC-ERROR: Announcements: Note that you declared a slide without an asset file and a correct type');
                    }                  
                    asset = 'banner';
                    type = 'banner';
                }else if(asset!==undefined && type==='banner'){
                    console.error('WC-ERROR: Announcements: Note that you declared an asset slide with incorrect type');
                    type = 'asset';
                }else if(type===undefined && asset!==undefined && (type!=='localLink' || type!=='videoLink')){
                    console.error('WC-ERROR: Announcements: Note that you declared an asset without a type');
                    asset = slide.asset;
                    type = 'asset';
                }else if(type===undefined){
                    console.error('WC-ERROR: Announcements: Note that you declared a slide without a type');
                    asset = 'banner';
                    type = 'banner';
                }

                if(slide.type === "asset"){
                    slidesTempArray.push(id,asset,type,title,image,imageSmall,reportingCode);
                    //console.log('Announcements - id: '+i+' , if 1 (asset) -  '+ slidesTempArray);
                }else if(slide.type === "localLink"){
                    slidesTempArray.push(id,to,type,title,image,imageSmall,reportingCode);
                    //console.log('Announcements - id: '+i+' , if 2 (localLink) -  '+ slidesTempArray);
                }else if(slide.type === "videoLink"){
                    slidesTempArray.push(id,asset,type,videoTitle,image,imageSmall,reportingCode,bannerContent,videoSrc,videoPoster,videoWidth,videoHeight);
                    //console.log('Announcements - id: '+i+' , if 3 (videoLink) -  '+ slidesTempArray);
                }else{
                    slidesTempArray.push(id,asset,type,title,image,imageSmall,reportingCode);
                    //console.log('Announcements - id: '+i+' , if 4 (banner) -  '+ slidesTempArray);
                }
                slidesArr.push(slidesTempArray);

                if(reporting){
                    WcReports("promotion-view",reportingCode);
                }

                
            }

            
          }
        //this.state.slidesNew = slidesArr 
        return slidesArr 

    }

    startSlideTimeout() {
    //on use when we want autoplay for the slider - uses to play the autoplay

        // console.log('gitit - startSlideTimeout()')
        // console.log('gitit - butoonPaused:'+this.state.butoonPaused);
        // console.log('gitit ----------------------');   

        this.timeout = setTimeout(() => {
            try {
                if(this.init.isDots){                 
                    this.state.butoonPaused = true;
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
        // console.log('gitit - endSlideTimeout()')
        // console.log('gitit - butoonPaused:'+this.state.butoonPaused);
        // console.log('gitit ----------------------');        
    }

    sliderArrows(e) {
    //control the arrows buttons of the slider (preview/next)

        // console.log('gitit - sliderArrows()')
        // console.log('gitit ----------------------'); 

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

        // console.log('gitit - sliderNumbers()')
        // console.log('gitit ----------------------'); 

    //control the numbers buttons of the slider (1,2,3....)
        var num = Number(e.target.dataset.id);
        this.endSlideTimeout();

       // this.state.sliderPaused = true;

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

        // console.log('gitit - sliderPlayAndPauseButton()')
        // console.log('gitit - butoonPaused:'+this.state.butoonPaused);
        // console.log('gitit ----------------------');          
    //control the play/pause buttons of the slider
        if(!this.state.butoonPaused){
            this.setState({butoonPaused: true});
            // this.state.butoonPaused = true;
            this.state.pauseClass = 'wcAnnounceItemNum wcAnnouncePlay';
            this.endSlideTimeout();
        }else{
            this.setState({butoonPaused: false});
            // this.state.butoonPaused = false;
            this.state.pauseClass = 'wcAnnounceItemNum wcAnnouncePause';
            this.startSlideTimeout();
        }
    }

    changeClass(e) {

        // console.log('gitit - changeClass()')
        // console.log('gitit - butoonPaused:'+this.state.butoonPaused);
        // console.log('gitit - slideDirection: '+this.state.slideDirection);

    //control the control nav player classes
        // setTimeout(() => {

        // }, 500);
        // e.preventDefault();
        const currentSlide = this.state.slidesNew[e];

        if(currentSlide[2]==="videoLink"){
            this.videos.slice(1).find( video => video.getAttribute('id') === `videoId${currentSlide[0]}`).querySelector(`video`).pause();            
        }

        if(!this.init.isDots){
            const {slideDirection,slidesNew} = this.state;

            var pre = 0; var next = 0; var id_pre = ''; var id_next = '';



            if(slideDirection){
                pre = Number(Number(e) + 1);
                next = Number(pre+1);
  
                if(next > slidesNew.length)
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
                      //console.log('no next');
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
    }


    handleResize(size,settings) {
        const {resizeImage , responsiveSize} = this.init;
        if(resizeImage === true){
            if(size === responsiveSize){
                settings.changeImgSrc = 5;
            }else{
                settings.changeImgSrc =  4;
            }
        }
    }


    render() {
        const {isDots, infinite, pauseOnHover, slidesToShow, speed,reporting} = this.init;
        const {showArrows,showSlider,butoonPaused} = this.state;
        const settings = {
            arrows:         showArrows,
            autoplay:       butoonPaused,
            dots:           isDots,
            infinite:       infinite,
            pauseOnHover:   pauseOnHover,
            slidesToShow:   slidesToShow,
            speed:          speed,
            swipe:          false, //TODO ??
            touchMove:      false, //TODO ??
            swipeToSlide:   false  //TODO ??          
        };

        const res_settings = {changeImgSrc:   4};

        this.handleResize(ResponsiveStore.wcContainerSize,res_settings);

        var divStyle = {
            width: this.init.sliderWidth,
            height: this.init.sliderHeight
        };

        // console.log('gitit - render()')
        // console.log('gitit - butoonPaused:'+butoonPaused);
        // console.log('gitit - isDots:'+isDots);
        // console.log('gitit ----------------------');      

        return (
            <div>
                { showSlider &&

                                
                <div className="wcAnnouncementSlick" >
                    <Slider ref={ (c) => this.slider = c } beforeChange={this.changeClass.bind(this)} {...settings}>
                        {this.state.slidesNew.map((slide, index) => (
                            <div key={index} style={divStyle}>
                                { (slide[2] === 'videoLink') ?
                                    <div className="wcVideoSlideContainer" style={{backgroundImage: `url(${absolutizeSrc(require('../../custom_content/assets/announcements/banners/' + slide[res_settings.changeImgSrc]))})` ,  width: '100%',height:this.init.sliderHeight}}>
                                        <div className="wcVideoSlideText">
                                            <div dangerouslySetInnerHTML={{ __html: slide[7]}}></div>
                                        </div>                                  
                                        <div className="wcVideoSlidePlayer"  title={slide[3]} id={`videoId${slide[0]}`} ref={this.setVideoRef}>
                                        {/* <div className="wcVideoSlidePlayer" style={{width:slide[10],height:slide[11]}} title={slide[3]} id={`videoId${slide[0]}`} ref={this.setVideoRef}> */}
                                            {/* TODO: CHECK IF NNED CHANGE IMAGE IS TRUE */}
                                            <div style={{width:slide[10],height:slide[11]}}>
                                                <WcPlayer  src={require(`../../custom_content/assets/announcements/video/${slide[8]}`)} poster={require(`../../custom_content/assets/announcements/video/${slide[9]}`)}> 
                                                    <BigPlayButton position="center" />
                                                </WcPlayer> 
                                            </div>
                                        </div> 
                                    </div>                      
                                    : (slide[2] === 'localLink') ?
                                                      
                                    <Link to={slide[1]} onClick={reporting && ( () => WcReports("promotion-click",slide[6])) }>
                                        <WcImg src={require('../../custom_content/assets/announcements/banners/' + slide[res_settings.changeImgSrc])} alt={slide[3]} title={slide[3]}/>
                                    </Link>
                                    : (slide[2] === 'banner') ?
                                        <div>
                                              <WcImg src={require('../../custom_content/assets/announcements/banners/' + slide[res_settings.changeImgSrc])} alt={slide[3]} title={slide[3]}/>
                                        </div>
                                    : (slide[2] === 'asset' && slide[1].indexOf('http')>-1) ?
                                        <WcLink 
                                            href={slide[1]} 
                                            className="wcAnnounceLink" 
                                            title={slide[3]} 
                                            target="_blank" onClick={reporting && ( () => WcReports("promotion-click",slide[6]) )} >
                                            <WcImg src={require('../../custom_content/assets/announcements/banners/' + slide[res_settings.changeImgSrc])} alt={slide[3]} title={slide[3]}/>
                                        </WcLink>
                                    :
                                    <WcLink 
                                        href={!slide[2]===false && require('../../custom_content/assets/announcements/pdf/' + slide[1])} 
                                        className="wcAnnounceLink" 
                                        title={slide[3]} 
                                        target="_blank" onClick={reporting && ( () => WcReports("promotion-click",slide[6]) )} >
                                        <WcImg src={require('../../custom_content/assets/announcements/banners/' + slide[res_settings.changeImgSrc])} alt={slide[3]} title={slide[3]}/>
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
                }
                {this.init.isArrows && <br/>}
                <div className="wcClear"></div>

                
            </div>
        );
    }
})

export default Wcan;