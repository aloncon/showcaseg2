import React from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import shallowCompare from 'react-addons-shallow-compare';
import configuration from './configuration';
import { WcReports } from './WcEvents';

const { staticRoutes } = configuration;

const logPageView = (page, location, history) => {
    let pageLocation = location.pathname.replace(/.*\/(.*)/, "$1");
    if (pageLocation === page) {
        WcReports("brand-level-pageview",pageLocation) //Report code when Showcase Uploas
    }
  }

/**
 * Generate the routes looping the static routes from the configuration data.
 *
 */
class GenerateRoutes extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        const landingpageRouteID = staticRoutes.getLandingpageRouteID(),
            routesConfig = staticRoutes.getRoutes(),
            getPath = staticRoutes.getPath;

        const { location } = this.props;

        return (
            <Switch>
                {routesConfig.map(route => {
                    const propsRoutes = {
                        key: route.id,
                        path: route.id,
                        component: route.component,
                    };

                    propsRoutes.path = getPath(route.id, route.parent);

                    if (route.notExact === undefined || route.notExact === false) propsRoutes['exact'] = true;

                    return <Route {...propsRoutes} onUpdate={logPageView(route.id, location)} />;
                })}
                <Redirect from="/" to={landingpageRouteID} />
            </Switch>
        );
    }
}

export default withRouter(GenerateRoutes);
