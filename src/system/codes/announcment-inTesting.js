import React from 'react'
import Slider from 'react-slick';

import WcResource from '../../WcResource';
import '../style/announcments.css'


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
        this.init = {
            //slider settings - autoplay
            autoplay            :   (this.props.data_setting.autoplay!=null       ? this.props.data_setting.autoplay : false),                  //turn on/off autoplay in slider (Boolean)
            autoplayArrows      :   (this.props.data_setting.autoplayArrows!=null ? this.props.data_setting.autoplayArrows : false),            //turn on/off autoplay in arrows buttons (Boolean)
            autoplayPagination  :   (this.props.data_setting.autoplayPagination!=null ? this.props.data_setting.autoplayPagination : false),    //turn on/off autoplay in numbers buttons (Boolean)
            autoplaySpeed       :   (this.props.data_setting.autoplaySpeed!=null ? this.props.data_setting.autoplaySpeed : 3000),               //control the speed of autoplay changing slides (Integer)
            //slider settings - other settings
            infinite            :   (this.props.data_setting.infinite!=null     ? this.props.data_setting.infinite : true ),                    //turn on/off infinite for the slier  (Boolean - true as Default)
            speed               :   (this.props.data_setting.speed!=null        ? this.props.data_setting.speed    : 500 ),
            pauseOnHover        :   (this.props.data_setting.pauseOnHover!=null ? this.props.data_setting.pauseOnHover  : false),
            slidesToShow        :   (this.props.data_setting.slidesToShow!=null ? this.props.data_setting.slidesToShow  : 1 ),
            changeImage         :   (this.props.data_setting.changeImage        ? this.props.data_setting.changeImage   : false),             
            changeImageWidth    :   (this.props.data_setting.changeImageWidth   ? this.props.data_setting.changeImageWidth : 600),  
            
        };
        this.state = {            
            //rtl                 :   (this.props.data_setting.rtl!=null          ? this.props.data_setting.rtl  : false), //TODO
            //slider settings - change Image Or Different Width related
            changeImgSrc        :   4,
            windowHeight        :   window.innerHeight,
            windowWidth         :   window.innerWidth,

            //NOT TO EDIT - USES AS FLAGS
            slidesNew           :   this.props.data_slides,
            sliderPaused        :   false,                                 //flag for stopping autoplay (Boolean)
            slideDirection      :   true,                                  //flag for autoplay direction (Boolean)
            buttonPaused        :   false,                                 //flag for pause/play button (Boolean)
           // pauseClass          :   'wcan_sb_item wcan_pause'             //flag for play/pause button class (String)

        };
    }

    /*TODO:
          ***  fix problem with infinite - if we get to the end and try to start again it causes problems
          ***  check pauseOnHover - somthing not right
          ***  when not infinite - and click on arrows instead of numbers - needs to disable arrows
    */
    componentDidMount() {
        //control autoplay on page loading
        if(this.init.autoplay){
            this.startSlideTimeout();
            //this.setState({autoplaySpeed: this.state.autoplaySpeed}); //26.10
        }else{
            this.setState({buttonPaused: true});
            //this.state.pauseClass = 'wcan_sb_item wcan_play';
        }
        this.getUpdatedArray();

        //if not infinite - disable prev button
        if(!this.init.infinite){
            document.getElementById('wcan_previous').className = 'wcan_previous wcan_disable';
            document.getElementById('wcan_previous').disabled = true;

        }

        this.handleResize();
        window.addEventListener('resize', this.handleResize);
        console.log('slideDirection: '+this.state.slideDirection);
    }

    componentWillUnmount() {
        this.handleResize();
        window.removeEventListener('resize', this.handleResize);
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

          //this.state.slidesNew = slidesArr; 26.10
          this.setState({slidesNew: slidesArr});


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
               // this.state.slideDirection = true;
                this.startSlideTimeout();
            }catch(err){
                this.endSlideTimeout();
            }
            
            if(this.state.slideDirection === false){
                this.setState({slideDirection: true});
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
            this.setState({buttonPaused: true});
            //this.state.pauseClass = 'wcan_sb_item wcan_play';
            this.endSlideTimeout();
        }

        if(e.target.dataset.id === 'next'){
            //this.setState({slideDirection: true});
            if(this.state.slideDirection === false){
                this.setState({slideDirection: true});
            }
            //this.state.slideDirection = true;
            this.slider.slickNext();
        }else{
            //this.setState({slideDirection: false});
            //this.state.slideDirection = false;
            if(this.state.slideDirection === true){
                this.state.slideDirection = false;
            }            
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
                document.getElementById(id).className = 'wcan_sb_item wcan_'+i+'a';
            }else{
                document.getElementById(id).className = 'wcan_sb_item wcan_'+i;
            }
        }
        if(this.state.sliderPaused === false){
            this.setState({sliderPaused: true});
            //this.state.sliderPaused = true;
        }           
        

        if(!this.init.autoplayPagination){//control autoplayPagination
            // this.setState({buttonPaused: this.state.sliderPaused ? this.state.buttonPaused : !this.state.buttonPaused });
            this.setState({buttonPaused: true });
            //this.state.pauseClass = 'wcan_sb_item wcan_play';
        }else{
            this.startSlideTimeout();
        }

        this.slider.slickGoTo(num);
    }

    sliderPlayAndPauseButton() {
    //control the play/pause buttons of the slider
        if(!this.state.buttonPaused){
            this.setState({buttonPaused: true});
            //this.state.pauseClass = 'wcan_sb_item wcan_play';
            this.endSlideTimeout();
        }else{
            this.setState({buttonPaused: false});
            //this.state.pauseClass = 'wcan_sb_item wcan_pause';
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
                    document.getElementById('wcan_next').className = 'wcan_next wcan_disable';
                    document.getElementById('wcan_next').disabled = true;
              }                

              if(!this.init.infinite){
                document.getElementById('wcan_previous').className = 'wcan_previous';
                document.getElementById('wcan_previous').disabled = false;
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
                    document.getElementById('wcan_previous').className = 'wcan_previous wcan_disable';
                    document.getElementById('wcan_previous').disabled = true;
              } 
              
              if(!this.init.infinite){
                document.getElementById('wcan_next').className = 'wcan_next';
                document.getElementById('wcan_next').disabled = false;
              }               

          }

          this.state.slideDirection = true;

          id_pre = 'slide_'+pre;
          id_next = 'slide_'+next;

          if(!this.state.sliderPaused){
            document.getElementById(id_pre).className = 'wcan_sb_item wcan_'+pre;
            document.getElementById(id_next).className = 'wcan_sb_item wcan_'+next+'a';
          }
          this.state.sliderPaused = false;
                    
    }

    handleResize(e) {
         this.setState({
             windowHeight: window.innerHeight,
             windowWidth: window.innerWidth,
         });
        if(this.init.changeImage === true){
            if(window.innerWidth >= this.init.changeImageWidth){
                this.setState({
                    changeImgSrc: 4
                });
            }else{
                this.setState({
                    changeImgSrc: 5
                });
            }
        }
    }

    render() {
        const settings = {
            arrows:         false,
            autoplay:       false,
            dots:           false,
            infinite:       this.init.infinite,
            pauseOnHover:   this.init.pauseOnHover,
            rtl:            false, //TODO
            slidesToShow:   this.init.slidesToShow,
            speed:          this.init.speed,
            swipe:          false, //TODO ??
            touchMove:      false, //TODO ??
            swipeToSlide:   false  //TODO ?? 
        };

        var divStyle = {
            width: this.props.data_setting.sliderWidth+'px'
        };

        return (
          <div style={divStyle}>
            <Slider ref={ c => this.slider = c } beforeChange={ this.changeClass.bind(this)} {...settings}>
                {this.state.slidesNew.map((slide, index) => (
                    <div key={index}>
                        <WcResource><a href={slide[1]} className='wcan_link' title={slide[3]} target="_blank">
                            <WcResource><img src={slide[this.state.changeImgSrc]} alt={slide[3]} title={slide[3]}/></WcResource>
                        </a></WcResource>
                    </div>
                ))}
            </Slider>
            <ul className='wcan_ul'>
                <li><button id='wcan_next'     className='wcan_next'     data-id='next'     onClick={this.sliderArrows}></button></li>
                <li><button id='wcan_previous' className='wcan_previous' data-id='previous' onClick={this.sliderArrows}></button></li>
                {this.state.slidesNew.map((slide,index) => (
                    <li key={index}><span id={'slide_'+Number(index+1)} data-id={index} className={Number(index)===0 ? 'wcan_sb_item wcan_1a' : 'wcan_sb_item wcan_'+Number(index+1)} onClick={this.sliderNumbers.bind(this)}></span></li>
                ))}
                {/* <li><span className={this.state.pauseClass} onClick={this.sliderPlayAndPauseButton}></span></li>  */}
                <li><span className={this.state.buttonPaused ? 'wcan_sb_item wcan_play' : 'wcan_sb_item wcan_pause'} onClick={this.sliderPlayAndPauseButton}></span></li>
            </ul>
            <br/>
           {/*} <span>
                {this.state.windowWidth} x {this.state.windowHeight}
            </span> */}
          </div>
        );
    }
}