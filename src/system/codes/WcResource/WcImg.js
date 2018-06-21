/* eslint-disable  jsx-a11y/alt-text*/
/* all images should already have the `alt` value in props */

import React from 'react';
import absolutizeSrc from './absolutizeSrc';
import { observer } from 'mobx-react';
import ResponsiveStore from '../../../store/ResponsiveStore';
const placeholderPic = require('../../resources/placeholder.png');

const WcImg = ({ ...props}) => {
  props.src = absolutizeSrc(props.src);
  return <img {...props}/>
};

const WcImgValidResponsive = observer(({responsiveStore : { wcContainerSize } , src , fileName , mobile , desktop }) => {
  class WcImgValidResponsive extends React.Component{
    constructor(props){
      super(props)
      this.state = { errorSrc : false };
      this.srcDefault = src;
    }

    setDefault(e){
      this.setState({ errorSrc : true });
      this.image = <WcImg src={src}/>;
    }

    render(){
      const { errorSrc } = this.state;

      switch(!errorSrc && wcContainerSize){
        case 'lg' : this.image = <WcImg src={desktop} onError={(e) => {this.setDefault(e)}}/>; break;
        case 'md' : this.image = <WcImg src={desktop} onError={(e) => {this.setDefault(e)}}/>; break;
        case 'sm' : this.image = <WcImg src={desktop} onError={(e) => {this.setDefault(e)}}/>; break;
        case 'xs' : this.image = <WcImg src={mobile} onError={(e) => {this.setDefault(e)}}/>; break;
        default : this.image = <WcImg src={src}/>; break;
      }
      return(this.image)
    }

  }
  return <WcImgValidResponsive/>
})

export const WcImgValid = ({mobile = 200 , desktop = 300 , src , fileName, alt }) => (
  <WcImgValidResponsive mobile = { mobile }  desktop = { desktop }  src = { src }  responsiveStore = { ResponsiveStore } alt={alt}/>
)


export const WcPlaceHolderImage = ({...props}) => {
  props.src = placeholderPic;
  return <WcImg {...props}/>
}

export default WcImg;