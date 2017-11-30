import React from 'react';
import generateNavItems from './generateNavItems';
import '../../style/navigation.css';

class NavigationVertical extends React.Component {

    render() {
      const { config, routesExcludeTest,moduleName } = this.props;

      return (
        <div className="wcNavigationVertical">
          <div className="wcNavHeader">
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
