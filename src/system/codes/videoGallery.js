import React, { Component } from 'react';
import { Player } from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css";
import "../../system/style/videoGallery.css";
import {WcPlayer} from './WcResource';
import play_thumbnails from "../resources/videoGallery/play_thumbnails.png";


export default class Wcvg extends Component {
    constructor(props) {
        super(props) 
        this.getIndex = this.getIndex.bind(this);                 
        this.state = {
            poster                  :           this.props.data_info[0][1],
            src                     :           this.props.data_info[0][2],
            videoDurationArray      :           [],
            flag                    :           false             
        };                     
    }



    componentDidMount()  {    
        
    }


    getIndex(e) {        
        var i = Number(e.target.dataset.id);
        var src = this.props.data_info[i][2];
        this.setState({
            poster  : this.props.data_info[i][1],
            src     : this.props.data_info[i][2]
        });
    }
    

    render() {  
        
        var playerContainerStyle = {
            width: '90%'
        };
        var galleryContainerStyle = {
            width: '90%'
        }; 

        return (   
            <div>
                <div style={playerContainerStyle}>
                    <WcPlayer
                        playsInline
                        poster={this.state.poster}
                        src={this.state.src}
                    /> 
                </div>                
                <div className="wc-play-list">
                        <ul className="wc-play-list">
                        { this.props.data_info.map((video, index) => ( 
                                <li className="wc-play-list-item"  key={index} >
                                    <div className="wc-thumbnail-wrap">
                                        <a className="wc-center-container" title={video[0]} data-id={index} onClick={this.getIndex}>
                                            <img className="wc-thumbnail wc-center" title={video[0]} src={video[1]} alt={video[0]} data-id={index} onClick={this.getIndex}/>
                                            <img className="wc-play wc-center" title={video[0]} src={play_thumbnails} alt="" data-id={index} onClick={this.getIndex}/>
                                            <span className="wc-duration">1</span>
                                            <span className="wc-hidden">undefined</span>
                                        </a>
                                    </div>
                                </li>                                
                            )) }
                        </ul>
                    </div> 
                                               
                </div>                  
          
                 
        );
    }
};




//  margin: 0 auto;
// left: 0;
// right: 0;
// top: 44%;

/*TODO:
    - add correct dutation
    - change play in player and to the center
    - mark the corrent video that playing
    - if movie has title if not: title = video 
*/