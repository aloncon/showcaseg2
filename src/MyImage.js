import React, { Component } from 'react';

class Image extends React.Component {
  componentDidMount() {
       console.log('IMAGE did mount');
    // if image hasn't completed loading, then let react handle error
    if (!this._image.complete) return;
    // if image has finished loading and has 'errored'(errored when naturalWidth === 0)
    // then run the onError callback
    if (this._image.naturalWidth === 0) {
      this.props.onError();
    }
  }
 
}

  export default Image;
