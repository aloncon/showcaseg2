import React from 'react';
//import Slider from './slider/slider.js';
import Slider from 'react-slick';

import announcment1 from './announcments/Color-Printing.jpg';
import announcment2 from './announcments/Device-Storage-Security.jpg';
import announcment3 from './announcments/Industry-Solutions.jpg';
import announcment5 from './announcments/Rakuten-banner_new_1.jpg';

import WcResource from './WcResource';
import WcpcContent from './WcpcContent';


//var React = require('react');
//var Slider = require('react-slick');


class LeftNavButton extends React.Component {
  render() {
    return <button style={{ display: 'block', background: 'green'}}>NNNext</button>
  }
}
class rightNavButton extends React.Component {
  render() {
    return <button style={{ display: 'block', background: 'green', zIndex:'1000'}}>Prv</button>
  }
}

//class SimpleSlider extends React.Component {
var SimpleSlider = React.createClass({    
  render: function () {
    var settings = {
      accessibility:true,  
      dots: true,
      arrows:true,
      nextArrow: <LeftNavButton/>,
      prvArrow: <rightNavButton/> ,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      
      autoplay:true
    };
    return (
      <Slider {...settings}>
        <div><WcResource><img src={announcment1}/></WcResource></div>
        <div><WcResource><img src={announcment2}/></WcResource></div>
        <div><WcResource><img src={announcment3}/></WcResource></div>
        <div><WcResource><img src={announcment2}/></WcResource></div>
       <div><WcResource><img src={announcment1}/></WcResource></div>
        <div><WcResource><img src={announcment5}/></WcResource></div>
      </Slider>
    );
  }
});

export default SimpleSlider;


/*
function SampleNextArrow(props) {
  const {className, style, onClick} = props
  return (
    <div
      className={className}
      style={{...style, display: 'block', background: 'red'}}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const {className, style, onClick} = props
  return (
    <div
      className={className}
      style={{...style, display: 'block', background: 'green'}}
      onClick={onClick}
    ></div>
  );
}

*/