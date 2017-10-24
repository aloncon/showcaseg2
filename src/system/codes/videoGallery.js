import React, { Component } from 'react';
import { Player } from 'video-react';

import WcResource from '../../WcResource';
import "../../../node_modules/video-react/dist/video-react.css";
import "../../system/style/videoGallery.css";

import play_thumbnails from "../resources/videoGallery/play_thumbnails.png"

export default class Wcvg extends Component {
    constructor(props) {
        super(props) 
        this.getIndex = this.getIndex.bind(this);        
        this.getVideoDuration = this.getVideoDuration.bind(this);        
        this.state = {
            poster            :           this.props.data_info[0][1],
            src               :           this.props.data_info[0][2]
           // windowWidth             :           window.innerWidth,            
        };                     
    }


    getIndex(e) {        
        var i = Number(e.target.dataset.id);
        console.log(i);

        this.setState({
            poster  : this.props.data_info[i][1],
            src     : this.props.data_info[i][2]
        });
    }
    
    getVideoDuration(e) {        
        var i = Number(e.target.dataset.id);
        console.log(i);
        console.log(1);

        this.setState({
            poster  : this.props.data_info[i][1],
            src     : this.props.data_info[i][2]
        });
        return 1;
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
                    <Player
                        playsInline
                        poster={this.state.poster}
                        src={this.state.src}
                    /> 
                </div>                
                {
                    this.props.data_info.map((movie, index) => ( 
                        <div key={index}>
                            {/* TODO: if movie has title if not: title = video */}
                            {/* <div data-id={index} onClick={this.getIndex} className="wcvg_galleryBox_wrap" title={movie[0]}>
                                Video Number {movie[0]}                                
                                <img className="wc-play wc-center" src={movie[1]} alt={movie[0]}/>
                                <span className="wc-duration">{this.getVideoDuration}</span>
                            </div> */}
                            <div className="wc-play-list">
                                    <ul className="wc-play-list">
                                        <li className="wc-play-list-item">
                                            <div className="wc-thumbnail-wrap">
                                                <a className="wc-center-container" href="#" title="Video ">
                                                    <img className="wc-thumbnail wc-center" src={movie[1]} alt={movie[0]}/>
                                                    <img className="wc-play wc-center" src={play_thumbnails} alt=""/>
                                                    <span className="wc-duration">0:35</span><span className="wc-hidden">undefined</span>
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>                            
                            </div>                  
          ))
                }           
        </div>  
        );
    }
};

//  margin: 0 auto;
// left: 0;
// right: 0;
// top: 44%;

/*TODO:
    - add correcy dutation
    - change play in player and to the center
    - mark the corrent video that playing

*/