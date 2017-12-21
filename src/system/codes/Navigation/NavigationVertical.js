import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../style/partner-def/verticalNavigation.css';

const VerticalNavItem = ({ route, getPath }) => {
  const linkTo = getPath(route.path, route.parent);

  return (
    <li key={route.id}>
      <NavLink to={linkTo}>{route.name}</NavLink>
    </li>
  );
};

/**
 * Vertical navigation - Create list items of all the root routes links with looping the static routes from the configuration data using the [path,name].
 *
 * Props::
 *
 * routesConfiguration (MANDATORY):: holds the the static routes configuration, and the related functions:
 * getRootRoutes
 * getPath
 * getChildren
 *
 * moduleName (MANDATORY):: The module name for the header.
 */
const NavigationVertical = ({ routesConfiguration, moduleName } ) => {
  return (
    <div className="wcNavigationVertical">
      <div className="wcNavHeader">
        <h1>{moduleName}</h1>
      </div>

      <ul className="wcNavigationBox">{routesConfiguration.getRootRoutes().map(route => VerticalNavItem({ route, getPath: routesConfiguration.getPath }))}</ul>
    </div>
  );
};

export default NavigationVertical;
