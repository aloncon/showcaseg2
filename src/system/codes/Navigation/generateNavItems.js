import React from 'react';
import { NavLink } from 'react-router-dom';

const generateNavItems = (config, routesExcludeTest) => {
  return config.map(route => {

    // Exclude routes from the navigation
    if (routesExcludeTest(route.name))
      return;

    // We handle the root path on the first NavLink above 'Home'
    if (route.path === '/')
      return;

    return (
    <li key={route.path}>
      <NavLink to={route.path}>{route.name}</NavLink>
    </li>
    );
  });
}

export default generateNavItems;


