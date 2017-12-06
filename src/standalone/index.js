import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import '../system/style/standalone.css';

import WcShowcase from '../system/codes/moduleInfo';

export default class StandAlone extends Component{
  render() {
    return(
      <div>

<span id="wc-reset">

{/* Link to Partner Defs styles */}
<link rel="stylesheet" href="https://scontent.webcollage.net/partner-defs/css?partner-id=buycom&showcase-format=popup&origin=showcase~MarkupType!document!PresentationFormat!html,"/>

{/* <link rel="stylesheet" href="http://www.test.netgear.webcollage.net/server/cdw/netgear-showcase/css?ws-action=http://www.test.netgear.webcollage.net/partner-defs/css?partner-id%3dcdw%26showcase-format%3dpopup%26origin%3dshowcase~MarkupType!document!PresentationFormat!html,"/> */}

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

       {/*  <div className="wcPopupHeader">
          <div className="wcHeaderLogo">
             <WcImg src={logo} className="wcLogo"/>
          </div>
          <div className="wcProvidedBy">
                <a href="">
                  <span className="wcText">Close Window</span>
                </a>
             <br/>
             <span className="wcPrefix">Provided by </span>
             <span className="wcVendorName">{moduleName}</span>
          </div>
        </div> */}
      </div>
    );
  }
}

ReactDOM.render(
  <StandAlone />,
  document.getElementById('wc-showcase-root'),
);


