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
    const { route, children, linkTo, customClasses, more } = this.props;
    let classes = '';

    classes += route.parent !== '/' || more ? 'wcDropdownSubMenu ' : '';
    classes += this.state.isOpen ? 'open' : '';
    // classes += customClasses ? `${customClasses}` : '';

    return (
      <li key={route.id} className={classes} onMouseEnter={this.handleOpen} onMouseLeave={this.handleClose}>
        <NavLink className="dropdown-toggle" data-toggle="dropdown" to={linkTo}>
          {route.name}
          {route.parent === '/' && !more && ' '}
          {route.parent === '/' && !more && <b className="caret" />}
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
  /*   hiddenExtraSmall = 'wcHiddenExtraSmall';
  hiddenSmall = 'wcHiddenMedium';
  showExtraSmall = 'wcVisibleExtraSmall';
  showSmall = 'wcVisibleSmall'; */
  hiddenExtraSmall = 'hidden-sm';
  hiddenSmall = 'hidden-sm hidden-md';
  showExtraSmall = 'visible-sm';
  showSmall = 'visible-sm visible-md';
  length = this.props.routes.length;

  renderSubMenu(routes) {
    const { exclude, getPath, getChildren, more } = this.props;

    const menuRoutes = routes.map((route, index) => {
      if (exclude && exclude(route.name)) return;

      const linkTo = getPath(route.path, route.parent);
      const parent = route.path;
      let classHidden = '';

      route.children = getChildren(parent);

      if (route.parent === '/') {
        console.log('mendy', more);
        if (index < this.length) classHidden = more ? this.showSmall : this.hiddenSmall;
        if (index < this.length / 2) classHidden = more ? this.showExtraSmall : this.hiddenExtraSmall;
      }

      if (route.children && route.children.length > 0) {
        return <SubMenu key={route.id} route={route} children={this.renderSubMenu(route.children)} linkTo={linkTo} customClasses={classHidden} more={more} />;
      }

      return (
        <li key={route.id} className={classHidden}>
          <NavLink to={linkTo}>{route.name}</NavLink>
        </li>
      );
    });

    return menuRoutes;
  }

  render() {
    return <ul className={this.props.more ? 'dropdown-menu' : 'nav navbar-nav'}>{this.renderSubMenu(this.props.routes).map(listItem => listItem)}</ul>;
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
    const MoreButton = () => {
      return (
        <span>
          {'More '}
          <b className="caret" />
        </span>
      );
    };
    return (
      <Navbar collapseOnSelect fluid className="wcHorizontalNav">
        <Navbar.Header>
          <Navbar.Toggle children={<MoreButton />} />
        </Navbar.Header>
        <Navbar.Collapse>
          <NestedItems routes={rootRoutes} exclude={routesConfiguration.routesExcludeTest} getPath={routesConfiguration.getPath} getChildren={routesConfiguration.getChildren} />
          <ul className="nav navbar-nav navbar-right visible-sm visible-md">
            {/* visible-sm visible-md wcVisibleMedium*/}
            <li className="dropdown"> {/* open */}
              <a href="#" className="navbar-toggle">
                More <b className="caret" />
              </a>
              <NestedItems routes={rootRoutes} exclude={routesConfiguration.routesExcludeTest} getPath={routesConfiguration.getPath} getChildren={routesConfiguration.getChildren} more={true} />
            </li>
          </ul>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationHorizontal;
