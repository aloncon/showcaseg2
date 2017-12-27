import React from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import '../../style/horizontalNavigation.css';

/**
 * This component represent the more button while the window is resizing, and will contains all the nav items which are not
 * shown in the main navigation due to its width.
 *
 * Handle mouse over to show its nav items.
 *
 * When the Navigation's width is under 600px, this component won't be display.
 */

 const HasOpenClose = (Component) => {
   return class extends React.Component {
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
      return <Component {...this.props} handleOpen={this.handleOpen} handleClose={this.handleClose} isOpen={this.state.isOpen}/>
    }
  }
}

 const MoreButtonResponsive = HasOpenClose(({
  routes, excludes, getPath, getChildren, limit, handleOpen, handleClose, isOpen
 }) => {
  const moreStyle = {
    display: 'block',
  };

  return (
    <ul className="nav navbar-nav navbar-right wcMoreButtonResponsive" onMouseEnter={handleOpen} onMouseLeave={handleClose}>
      <li className={`dropdown${isOpen ? ' open' : ''}`}>
        <button className="navbar-toggle" style={moreStyle}>
          More <b className="caret" />
        </button>
        <NestedItems routes={routes} exclude={excludes} getPath={getPath} getChildren={getChildren} hasMoreResponsiveButton={true} limit={limit} />
      </li>
    </ul>
  );
 });

/**
 * Represent a sub menu component which have the state if it open to handler the mouse over event.
 *
 * FIXME: Fix when the window under 600px width the sub-menu need open by click and not by mouse hover.
 * FIXME: Fix sub-menu change the nav height.
 * FIXME: Fix the no left padding for the sub-menus when the screen width is under 600px.
 */
const SubMenu = HasOpenClose(class extends React.Component {
  render() {
    const { route, children, linkTo, hasMoreResponsiveButton, handleOpen, handleClose, isOpen } = this.props;
    let classes = '';

    classes += (route.parent !== '/' || hasMoreResponsiveButton) ? 'wcDropdownSubMenu ' : '';
    classes += isOpen ? 'open' : '';

    return (
      <li key={route.id} className={classes} onMouseEnter={handleOpen} onMouseLeave={handleClose}>
        <NavLink className="dropdown-toggle" data-toggle="dropdown" to={linkTo}>
          {route.name}
          {route.parent === '/' && !hasMoreResponsiveButton && ' '}
          {route.parent === '/' && !hasMoreResponsiveButton && <b className="caret" />}
        </NavLink>
        <ul className="dropdown-menu">{children}</ul>
      </li>
    );
  }
})

/**
 * Recursive component to draw the navigation items, get down the tree from the provided routes configuration,
 * Each round return subMenu or one item.
 *
 * Check it it for the `MoreButtonResponsive` component by the prop: `hasMoreResponsiveButton`, if do it will slice the routes array to
 * have only the remain routes.
 */
class NestedItems extends React.Component {
  constructor(props) {
    super(props);
    this.length = this.props.routes.length;
  }

  renderSubMenu(routes) {
    const { exclude, getPath, getChildren, hasMoreResponsiveButton, limit } = this.props;

    const menuRoutes = routes.map((route, index) => {
      if ((exclude && exclude(route.name)) || index >= limit) return;

      const linkTo = getPath(route.path, route.parent);
      const parent = route.path;

      route.children = getChildren(parent);

      if (route.children && route.children.length > 0) {
        return <SubMenu key={route.id} route={route} children={this.renderSubMenu(route.children)} linkTo={linkTo} hasMoreResponsiveButton={hasMoreResponsiveButton} />;
      }

      return (
        <li key={route.id}>
          <NavLink to={linkTo}>{route.name}</NavLink>
        </li>
      );
    });

    return menuRoutes;
  }

  render() {
    const excludedRoutes = this.exclude ? this.props.routes.filter(route => this.exclude(route.name)) : this.props.routes;

    let routes = this.props.hasMoreResponsiveButton ? excludedRoutes.slice(this.props.limit * -1) : excludedRoutes;

    return <ul className={this.props.hasMoreResponsiveButton ? 'dropdown-menu' : 'nav navbar-nav'}>{this.renderSubMenu(routes).map(listItem => listItem)}</ul>;
  }
}

/**
 * This component represent the more button while the window is under 600px, and will contains all the nav items.
 *
 * Handle onClick to show its nav items.
 *
 * PROPS:: `callback` - Will run the callback when the onClick event has been fired.
 */
class MoreButtonCollapse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false
    };
    this.callback = this.props.callback;
  }

  handleClick = () => {
    this.callback(!this.state.clicked);

    this.setState({
      clicked: !this.state.clicked
    })
  };

  render() {
    return (
      <button type="button" className="navbar-toggle collapsed" onClick={this.handleClick}>
        <span className="sr-only">Toggle navigation</span>
        <span>
          {'More '}
          <b className="caret" />
        </span>
      </button>
    );
  }
}

/**
 * Bootstrap v3 navigation - Create the nav links with looping the static routes from the configuration data using the [path,name].
 * The component use React-Bootstrap and regular bootstrap.
 *
 * Handle resize event which update the state values:
 *  * `navWidth`: The navigation width.
 *  * `countItemsNavItems`: The amount of the nav items in the navigation main area.
 *  * `countItemsMoreButton`: The amount of the nav items in the `MoreButtonResponsive` component.
 *
 * The `MoreButtonResponsive` component will be display only when the `this.state.countItemsMoreButton` is not zero.
 *
 * The `this.state.collapse` changes when the function `isCollapseCallback` is fire.
 *
 * Props::
 *
 * routesConfiguration (MANDATORY):: Holds the the static routes configuration, and the related functions:
 * getRootRoutes
 * getPath
 * getChildren
 *
 * Object custom values: {top: `VALUE`, bottom: `VALUE` }, for checking the nav width when resizing (OPTIONAL)::
 * maxDimensionsCustomValues
 * mediumDimensionsCustomValues
 * smallDimensionsCustomValues
 */
class NavigationHorizontal extends React.Component {
  constructor(props) {
    super(props);
    this.routesConfiguration = this.props.routesConfiguration;
    this.rootRoutes = this.props.routesConfiguration.getRootRoutes();

    // Default Dimensions
    this.maxDimensionsCheck;
    this.mediumDimensionsCheck;
    this.smallDimensionsCheck;
    this.maxDefaultDimensionsValues = { top: 800, bottom: 750 };
    this.mediumDefaultDimensionsValues = { top: 750, bottom: 650 };
    this.smallDefaultDimensionsValues = { top: 650, bottom: 540 };
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    this.state = {
      navWidth: 0,
      countRoutes: this.rootRoutes.length,
      countItemsNavItems: this.rootRoutes.length,
      countItemsMoreButton: 0,
      collapse: false,
    };

    // Check for custom dimensions custom check functions, if not use the default functions.
    const { maxDimensionsCustomValues, mediumDimensionsCustomValues, smallDimensionsCustomValues } = this.props;
    this.maxDimensionsValues = maxDimensionsCustomValues ? maxDimensionsCustomValues : this.maxDefaultDimensionsValues;
    this.mediumDimensionsValues = mediumDimensionsCustomValues ? mediumDimensionsCustomValues : this.mediumDefaultDimensionsValues;
    this.smallDimensionsValues = smallDimensionsCustomValues ? smallDimensionsCustomValues : this.smallDefaultDimensionsValues;
    //~~~~~~~~~~~~~~~
  }

  handleCountNavItems(width) {
    let count = this.state.countRoutes;

    if (this.maxDimensionsCheck(width)) {
      count -= this.state.countRoutes / 4;
    } else if (this.mediumDimensionsCheck(width)) {
      count -= this.state.countRoutes / 3;
    } else if (this.smallDimensionsCheck(width)) {
      count -= this.state.countRoutes / 2;
    }

    count = Math.floor(count);

    return count;
  }

  handleCountMoreButton(width) {
    return this.state.countRoutes - this.handleCountNavItems(width);
  }

  updateDimensions() {
    const screenWidth = window.innerWidth;
    const componentNav = ReactDOM.findDOMNode(this.refs.wcHorizontalNav);
    const componentNavWidth = componentNav.getBoundingClientRect().width;

    this.maxDimensionsCheck = width => width < this.maxDimensionsValues.top && width > this.maxDimensionsValues.bottom;
    this.mediumDimensionsCheck = width => width < this.mediumDimensionsValues.top && width > this.mediumDimensionsValues.bottom;
    this.smallDimensionsCheck = width => width < this.smallDimensionsValues.top && width > this.smallDimensionsValues.bottom;

    this.setState({
      navWidth: componentNavWidth,
      countItemsNavItems: this.handleCountNavItems(componentNavWidth),
      countItemsMoreButton: this.handleCountMoreButton(componentNavWidth),
    });
  }

  componentDidMount() {
    this.updateDimensions();

    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  isCollapseCallback(condition) {
    this.setState({ collapse: condition });
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <MoreButtonCollapse callback={this.isCollapseCallback.bind(this)}/>
          </div>
          <nav className={`wcHorizontalNav navbar-collapse collapse ${this.state.collapse && 'in'}`} ref="wcHorizontalNav">
            <NestedItems
              routes={this.rootRoutes}
              exclude={this.routesConfiguration.routesExcludeTest}
              getPath={this.routesConfiguration.getPath}
              getChildren={this.routesConfiguration.getChildren}
              limit={this.state.countItemsNavItems}
            />
            {this.state.countItemsMoreButton !== 0 && (
              <MoreButtonResponsive
                routes={this.rootRoutes}
                exclude={this.routesConfiguration.routesExcludeTest}
                getPath={this.routesConfiguration.getPath}
                getChildren={this.routesConfiguration.getChildren}
                limit={this.state.countItemsMoreButton}
              />
            )}
          </nav>
        </div>
      </nav>
    );
  }
}

export default NavigationHorizontal;
