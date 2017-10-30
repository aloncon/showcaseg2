import React from 'react';
import { Route, Link } from 'react-router-dom';
import autoBreadcrumb from 'auto-breadcrumb';
import '../style/breadcrumbs.css';

/**
 * Breadcrumbs
 *
 * Props::
 *
 * config (MANDATORY):: JSON object, holds the the static routes configuration.
 *
 * displayHomeName (OPTIONAL):: Boolean, true to display the word 'Home' when the path is: '/'. False by default.
 *
 * isDisplayBreadcrumbRoot (OPTIONAL):: Boolean, true to display the breadcrumbs in the root path: '/'. False by default.
 *
 * customRender (OPTIONAL):: Function(name,path), a custom way to display the name breadcrumbs.
 *
 * TODO: Add the option to change the style for the breadcrumbs.
 */
class Breadcrumbs extends React.Component {
  constructor(props) {
    super(props);

    /**
     * Extract the path and the name values from the static routes configuration.
     *
     * Return new JSON object.
     *
     * KEY= path , VALUE= name
     */
    this.getRoutesConfig = () => {
      let newConfig = {};
      Object.keys(props.config).forEach(route => {
        const [path, name] = [props.config[route].path, props.config[route].name];
        const displayHomeName = props.options.displayHomeName || false ;
        if (path === '/' && displayHomeName) {
          return;
        }
        newConfig[path] = name;
      });

      return newConfig;
    };

    this.state = {
      breadcrumbConfiguration: {
        staticRoutesMap: this.getRoutesConfig(),
        isDisplayInHome: props.options.isDisplayBreadcrumbRoot || false,
        containerProps: {
          className: 'breadcrumbs',
        },
        itemRender: props.options.customRender || ((name, path) => (path ? <Link to={path}>{name}</Link> : `${name}`)),
      },
    };

    this.BreadcrumbConfig = autoBreadcrumb(this.state.breadcrumbConfiguration);
  }

  render() {
    return (
      <Route
        render={({ location }) => {
          return (
            <div>
              <this.BreadcrumbConfig pathname={location.pathname} />
            </div>
          );
        }}
      />
    );
  }
}

export default Breadcrumbs;
