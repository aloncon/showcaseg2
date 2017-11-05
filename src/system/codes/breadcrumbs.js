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
export default class Breadcrumbs extends React.Component {
  constructor(props) {
    super(props);

    const { config, options } = props;

    const breadcrumbConfiguration = {
      staticRoutesMap: getRoutesConfig(config, options),
      isDisplayInHome: options.isDisplayBreadcrumbRoot || false,
      containerProps: {
        className: 'breadcrumbs',
      },
      itemRender: options.customRender || ((name, path) => (path ? <Link to={path}>{name}</Link> : `${name}`)),
    };

    this.BreadcrumbConfig = autoBreadcrumb(breadcrumbConfiguration);
  }

  render() {
    const BreadcrumbConfig = this.BreadcrumbConfig;

    return (
      <Route
        render={({ location }) => {
          return (
            <div>
              <BreadcrumbConfig pathname={location.pathname} />
            </div>
          );
        }}
      />
    );
  }
}

/**
     * Extract the path and the name values from the static routes configuration.
     *
     * Return new JSON object.
     *
     * KEY= path , VALUE= name
     */
const getRoutesConfig = (config, options) => {
  let newConfig = {};
  Object.keys(config).forEach(route => {
    const [path, name] = [config[route].path, config[route].name];
    const displayHomeName = options.displayHomeName || false;
    if (path === '/' && displayHomeName) {
      return;
    }
    newConfig[path] = name;
  });

  return newConfig;
};
