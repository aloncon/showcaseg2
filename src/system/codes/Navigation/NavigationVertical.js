import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../style/navigation.css';

class NestedDropdown extends React.Component {
  renderSubMenu(routes) {
    const { exclude, getPath, getChildren } = this.props;

    const menuRoutes = routes.map(route => {
      if (route.path === '/' || (exclude && exclude(route.name))) return;
      const linkTo = getPath(route.path, route.parent);
      const parent = route.path;
      const display = <NavLink to={linkTo}>{route.name}</NavLink>;

      route.children = getChildren(parent);

      let subMenu;
      if (route.children && route.children.length > 0) {
        subMenu = this.renderSubMenu(route.children);
      }
      return (
        <li key={route.id}>
          {display}
          {/* {subMenu} */}
        </li>
      );
    });

    return <ul>{menuRoutes}</ul>;
  }

  render() {
    return this.renderSubMenu(this.props.routes);
  }
}

/**
 * WIP
 */
class NavigationVertical extends React.Component {
  constructor(props) {
    super(props);
    const rootRoutes = this.props.routesConfiguration.getRootRoutes();

    this.state = {
      parentsRoutes: rootRoutes,
      subMenuId: '',
      menuArray: [rootRoutes],
    };
  }

  addMenu(menu) {
    this.setState({
      menuArray: this.state.menuArray.push(menu)
    })
  }

  render() {
    const { routesConfiguration, moduleName} = this.props;

    return (
      <div className="wcNavigationVertical">
        <div className="wcNavHeader">
          <h1>{moduleName}</h1>
        </div>

        {/* <ul>
          {this.state.menuArray[this.state.subMenuId]}
        </ul> */}
        <NestedDropdown routes={this.state.parentsRoutes} routesExcludeTest={routesConfiguration.routesExcludeTest} getPath={routesConfiguration.getPath} getChildren={routesConfiguration.getChildren}/>

      </div>
    );
  }
}

export default NavigationVertical;
