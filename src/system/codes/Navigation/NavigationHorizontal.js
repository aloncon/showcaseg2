import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import '../../style/navigation.css';

/**
 * Represent a sub menu component which have the state if it open to handler the mouse over event.
 */
class SubMenu extends React.Component {
  state = {
    isOpen: false,
  };

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { route, children, linkTo } = this.props;
    let classes = '';

    classes += route.parent !== '/' ? 'dropdown-submenu ' : '';
    classes += this.state.isOpen ? 'open' : '';

    return (
      <li key={route.id} className={classes} onMouseEnter={this.handleOpen} onMouseLeave={this.handleClose}>
        <NavLink className="dropdown-toggle" data-toggle="dropdown" to={linkTo}>
          {route.name}
          {route.parent === '/' && <b className="caret" />}
        </NavLink>
        <ul className="dropdown-menu">{children}</ul>
      </li>
    );
  }
}

/**
 * Recursive component to draw the navigation items, get down the tree from the provided routes configuration,
 * Each round return subMenu or one item.
 */
class NestedItems extends React.Component {
  renderSubMenu(routes) {
    const { exclude, getPath, getChildren } = this.props;

    const menuRoutes = routes.map(route => {
      if (route.path === '/' || (exclude && exclude(route.name))) return;
      const linkTo = getPath(route.path, route.parent);
      const parent = route.path;

      route.children = getChildren(parent);

      if (route.children && route.children.length > 0) {
        return <SubMenu key={route.id} route={route} children={this.renderSubMenu(route.children)} linkTo={linkTo} />
      }

      return  (
        <li key={route.id}>
          <NavLink to={linkTo}>{route.name}</NavLink>
        </li>
      );
    });

    return menuRoutes;
  }

  render() {
    return (
    <ul className={'nav navbar-nav'}>
      {this.renderSubMenu(this.props.routes).map(listItem => listItem)}
    </ul>
    );
  }
}

/**
 * Bootstrap navigation - Create the nav links with looping the static routes from the configuration data using the [path,name].
 * The component use React-Bootstrap and regular bootstrap.
 *
 * Props::
 *
 * routesConfiguration (MANDATORY):: holds the the static routes configuration, and the related functions:
 * getRootRoutes
 * getPath
 * getChildren
 *
 */
class NavigationHorizontal extends React.Component {
  render() {
    const { routesConfiguration } = this.props;
    const rootRoutes = routesConfiguration.getRootRoutes();

    return (
      <Navbar collapseOnSelect className="wcHorizontalNav">
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <NestedItems routes={rootRoutes} exclude={routesConfiguration.routesExcludeTest} getPath={routesConfiguration.getPath} getChildren={routesConfiguration.getChildren}/>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationHorizontal;
