import React from 'react';
import generateNavItems from './generateNavItems';
import '../../style/navigation.css';

class NavigationVertical extends React.Component {

    render() {
      const { config, routesExcludeTest,moduleName } = this.props;

      return (
        <div className="wc-navigation-vertical">
          <div className="header">
            <h1>{moduleName}</h1>
          </div>
          <ul>

            {generateNavItems(config, routesExcludeTest)}

          </ul>
        </div>
      );
    }
  }

  export default NavigationVertical;
