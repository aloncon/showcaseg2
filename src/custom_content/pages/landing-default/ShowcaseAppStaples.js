import React, { Component } from 'react';
import ShouldDisplay from '../../../system/codes/ShouldDisplay'
class ShowcaseBodyHeader extends React.Component{
  render() {
    return (
      <div className="wcShowcaseBody">
      </div>
    );
  }
}

class ShowcaseBody extends React.Component {
  render() {
    return (
      <div>
        <ShouldDisplay wc_section="custom-listing_scanners && wc_all_module_products || !(first && second) ">
        <h1>Showcase App Staples</h1>
        </ShouldDisplay>
      </div>
    );
  }
}

class ShowcaseAppStaples extends Component {
  render() {
    return (
      <div className="wcShowcase" id="wc-reset">

        <ShowcaseBodyHeader />
        <ShowcaseBody />

      </div>

    );
  }
}

export default ShowcaseAppStaples;