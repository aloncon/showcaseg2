import React from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';
// import WcpcContent from '../WcpcContent';
import '../../style/horizontalNavigation.css';
import ResponsiveContainer from '../ResponsiveContainer';

/* ~~~!! NOTE:: At the moment we disable sub-menus feature. !!~~~ */
const ABLE_SUB_MENUS = false;

/**
 * HOC Component, which gives to the provided Component two functions amd a prop that updated by those functions.
 *
 * `isOpen`
 * `handleOpen`
 * `handleClose`
 */
const HasOpenClose = Component => {
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
      return <Component {...this.props} handleOpen={this.handleOpen} handleClose={this.handleClose} isOpen={this.state.isOpen} />;
    }
  };
};

/**
 * This component represent the more button while the window is resizing, and will contains all the nav items which are not
 * shown in the main navigation due to its width.
 *
 * Handle mouse over to show its nav items.
 *
 * When the Navigation's width is under 600px, this component won't be display.
 */
const MoreButtonResponsive = HasOpenClose(({ routes, excludes, getPath, getChildren, limit, handleOpen, handleClose, isOpen }) => {
  const moreStyle = {
    display: 'block',
  };

  function show(condition) {
    return condition ? 'bt-show' : '';
  }

  return (
    <ul className="bt-navbar-nav bt-mr-auto bt-m-2 bt-mt-sm-0 wcMoreButtonResponsive" onMouseEnter={handleOpen} onMouseLeave={handleClose}>
      <li className={`bt-nav-item bt-dropdown${isOpen ? ' bt-show' : ''}`}>
        <button className="bt-navbar-toggler bt-dropdown-toggle" style={moreStyle}>
          More
        </button>
        <NestedItems routes={routes} exclude={excludes} getPath={getPath} getChildren={getChildren} hasMoreResponsiveButton={true} limit={limit} isOpen={isOpen} />
      </li>
    </ul>
  );
});

/**
 * Represent a sub menu component which have the state if it open to handler the mouse over event.
 *
 * FIXME: Fix sub-menu change the nav height.
 * FIXME: Fix the no left padding for the sub-menus when the screen width is under 600px.
 */
const SubMenu = HasOpenClose(
  class extends React.Component {
    render() {
      const { route, children, linkTo, hasMoreResponsiveButton, handleOpen, handleClose, isOpen } = this.props;
      let classes = '';

      const show = isOpen ? ' bt-show ' : '';

      classes += route.parent !== '/' || hasMoreResponsiveButton ? 'wcDropdownSubMenu bt-dropdown-item ' : '';
      classes += 'bt-dropdown bt-nav-item ';
      classes += show;

      const ableSubMenu = children[0] && ABLE_SUB_MENUS;

      return (
        <li key={route.id} className={classes} onMouseEnter={handleOpen} onMouseLeave={handleClose}>
          <NavLink className={`bt-nav-link ${ableSubMenu ? 'bt-dropdown-toggle' : ''}`} to={linkTo}>
            {route.name}
            {/* {route.parent === '/' && !hasMoreResponsiveButton && ' '} */}
            {/* {route.parent === '/' && !hasMoreResponsiveButton && <b className="caret" />} */}
          </NavLink>
          {ableSubMenu && <ul className={`bt-dropdown-menu${show}`}>{children}</ul>}
        </li>
      );
    }
  },
);

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
      if ((exclude && exclude(route.id)) || index >= limit) return;

      const linkTo = getPath(route.path, route.parent);
      const parent = route.path;
      const isDropdownItem = route.parent === '/' ? false : true;

      route.children = getChildren(parent);

      if (route.children && route.children.length > 0) {
        return <SubMenu key={route.id} route={route} children={this.renderSubMenu(route.children)} linkTo={linkTo} hasMoreResponsiveButton={hasMoreResponsiveButton} />;
      }

      return (
        <li key={route.id} className={`bt-nav-item${isDropdownItem ? ' bt-dropdown-item' : ''}`}>
          <NavLink className="bt-nav-link" to={linkTo}>
            {route.name}
          </NavLink>
        </li>
      );
    });

    return menuRoutes;
  }

  render() {
    const excludedRoutes = this.exclude ? this.props.routes.filter(route => this.exclude(route.id)) : this.props.routes;

    let routes = this.props.hasMoreResponsiveButton ? excludedRoutes.slice(this.props.limit * -1) : excludedRoutes;

    const dropDownClasses = `bt-dropdown-menu${this.props.isOpen ? ' bt-show' : ''}`;
    const navClasses = 'bt-navbar-nav bt-mr-auto bt-pr-sm-0 bt-mt-sm-0';

    return <ul className={this.props.hasMoreResponsiveButton ? dropDownClasses : navClasses}>{this.renderSubMenu(routes).map(listItem => listItem)}</ul>;
  }
}

/**
 * This component represent the more button while the window is under 600px, and will contains all the nav items.
 *
 * Handle onClick to show its nav items.
 *
 * PROPS:: `callback` - Will run the callback when the onClick event has been fired.
 *
 * //TODO: See if we can use the bootstrap v4 SVG.
 */
class MoreButtonCollapse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
    };
    this.callback = this.props.callback;
  }

  handleClick = () => {
    this.callback(!this.state.clicked);

    this.setState({
      clicked: !this.state.clicked,
    });
  };

  render() {
    return (
      <button type="button" className="bt-navbar-toggler wcHamburgerToggler" onClick={this.handleClick}>
        <span className="bt-sr-only">Toggle navigation</span>

        <i className="zmdi zmdi-menu zmdi-hc-2x wcIcon" />
      </button>
    );
  }
}

/**
 * Bootstrap v3 navigation - Create the nav links with looping the static routes from the configuration data using the [path,name].
 * The component use our custom bootstrap v4.
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
const NavigationHorizontal = observer(
  class NavigationHorizontal extends React.Component {
    constructor(props) {
      super(props);
      this.routesConfiguration = this.props.routesConfiguration;
      //this.rootRoutes = this.props.routesConfiguration.getRootRoutes().filter(route => WcpcContent({ wc_section: route.id }));
      this.rootRoutes = this.props.routesConfiguration.getRootRoutes();

      this.state = {
        collapse: false,
      };

      this.values = {
        containerSize: '',
        countRoutes: this.rootRoutes.length,
        countItemsNavItems: this.rootRoutes.length,
        countItemsMoreButton: 0,
      };
    }

    handleCountNavItems(containerSize) {
      let count = this.values.countRoutes;

      if (!ABLE_SUB_MENUS) return this.values.countRoutes;

      if (containerSize === 'lg') {
        count -= this.values.countRoutes / 4;
      } else if (containerSize === 'md') {
        count -= this.values.countRoutes / 3;
      }
      /*  if (containerSize === 'lg' && count > 7) {
        count -= this.values.countRoutes / 4;
      } else if (containerSize === 'md' && count > 5) {
        count -= this.values.countRoutes / 3;
      } */

      count = Math.floor(count);

      return count;
    }

    handleCountMoreButton(containerSize) {
      if (containerSize === 'sm') return 0;
      return this.values.countRoutes - this.handleCountNavItems(containerSize);
    }

    updateDimensions(containerSize) {
      this.values.containerSize = containerSize;
      this.values.countItemsNavItems = this.handleCountNavItems(containerSize);
      this.values.countItemsMoreButton = this.handleCountMoreButton(containerSize);
    }

    componentDidMount() {
      this.updateDimensions(this.props.responsiveStore.mainSize);
      // ResponsiveContainer({children:  this.updateDimensions});
    }

    isCollapseCallback(condition) {
      this.setState({ collapse: condition });
    }

    render() {
      this.updateDimensions(this.props.responsiveStore.wcContainerSize);

      return (
        <nav className="wcHorizontalNav bt-navbar bt-navbar-inverse bt-navbar-expand-sm bt-navbar-light">
          <MoreButtonCollapse callback={this.isCollapseCallback.bind(this)} />
          <div className={`bt-collapse bt-navbar-collapse ${this.state.collapse ? 'bt-show bt-collapsed' : ''}`}>
            <NestedItems
              routes={this.rootRoutes}
              exclude={this.routesConfiguration.routesExcludeTest}
              getPath={this.routesConfiguration.getPath}
              getChildren={this.routesConfiguration.getChildren}
              limit={this.values.countItemsNavItems}
            />
          </div>
          {ABLE_SUB_MENUS &&
            this.values.countItemsMoreButton !== 0 && (
              <MoreButtonResponsive
                routes={this.rootRoutes}
                exclude={this.routesConfiguration.routesExcludeTest}
                getPath={this.routesConfiguration.getPath}
                getChildren={this.routesConfiguration.getChildren}
                limit={this.values.countItemsMoreButton}
              />
            )}
          <div className="wcClear" />
        </nav>
      );
    }
  },
);

export default NavigationHorizontal;
