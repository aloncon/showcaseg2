import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import WcShowcase from '../codes/moduleInfo';

export default class StandAlone extends Component{
  render() {

    
    let siteName = 'allasortment';

    if(WcShowcase.siteName != undefined){
      siteName = WcShowcase.siteName;
    }

    let partnerDefsLink = 'https://scontent.webcollage.net/partner-defs/css?partner-id='+ siteName +'&showcase-format=popup&origin=showcase~MarkupType!document!PresentationFormat!html,';


    return(
    <span id="wc-reset">

{/* Link to Partner Defs styles */}

<link rel="stylesheet" href={partnerDefsLink}/>

  <table cellPadding="0" cellSpacing="0" className="wc-popup-header">
    <tbody>
      <tr>
          <td>
            <div className="wc-logo">
                <img alt="Logo" height="1px" src="http://www.test.netgear.webcollage.net/_wc/default-defs/resources/common/spacer.gif" width="1px"/>
              </div>
          </td>
          <td>
              <div className="wc-close">
                  <a href="javascript:window.close()">
                  <img alt="Close Window" height="1px" src="http://www.test.netgear.webcollage.net/_wc/default-defs/resources/common/spacer.gif" title="Close Window" width="1px"/>
                    <span className="wc-text">Close Window</span>
                  </a>
            </div>
            <div className="wc-provided-by">
              <span className="wc-prefix">Provided by </span>
              <span className="wc-vendor-name">{WcShowcase.presentationName}</span>
            </div>
          </td>
      </tr>
    </tbody>
  </table>
</span>
    );
  }
}

ReactDOM.render(
  <StandAlone />,
  document.getElementById('wc-showcase-root'),
);


