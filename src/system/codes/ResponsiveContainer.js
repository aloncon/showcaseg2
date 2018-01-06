import React from 'react';
import { observer } from "mobx-react";
import ResponsiveStore from '../../store/ResponsiveStore';

/**
 * This component observers the wcContainer size from the `ResponsiveStore`.
 *
 * It have only two uses:
 *    * Have only one chid which is a function that have one parameter value - The wcContainer size.
 *    * Have querySize prop which need to be one of these values: sm, md, lg .
 *    If the querySize match the wcContainer size it will return the children otherwise it will return null.
 */
const ResponsiveObserver = observer(class extends React.Component {

   render() {
      const childrenCount = React.Children.count(this.props.children);
      const query = this.props.querySize;

      if (typeof this.props.children === 'function') {
         return this.props.children(this.props.resStore.wcContainerSize);
      }

      if (query && childrenCount && query === this.props.resStore.wcContainerSize) {
         return this.props.children;
      }

      return null;
   }
});

/**
 * A responsive container that return `ResponsiveObserver` with the it own props and the `ResponsiveStore`.
 */
const ResponsiveContainer = (props) => {
   return <ResponsiveObserver resStore={ResponsiveStore} {...props} />
}

/**
 * For examples please see:
 * FOLDER: src\custom_content\pages\ResTest.js
 * PATH: /resTest
 */
export default ResponsiveContainer;