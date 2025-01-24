import React from 'react';
import {StackActions, CommonActions} from '@react-navigation/native';
import { isEmptyOrNull } from 'utils/Validations';

export const navigationRef = React.createRef();

function navigate(routeName, params) {
  navigationRef.current && navigationRef.current.navigate(routeName, params);
}

function replace(routeName, params) {
  navigationRef.current &&
    navigationRef.current.dispatch(StackActions.replace(routeName, params));
}

function goBack() {
  navigationRef.current && navigationRef.current.goBack();
}

function popToTop(count) {
  if (isEmptyOrNull(count)) {
    navigationRef.current &&
      navigationRef.current.dispatch(StackActions.popToTop());
  } else {
    navigationRef.current &&
      navigationRef.current.dispatch(StackActions.pop(count));
  }
}

function reset(routeName) {
  navigationRef.current &&
    navigationRef.current.dispatch(
      CommonActions.reset({
        index: 0,
        routeNames: routeName,
        routes: [{name: routeName}],
      }),
    );
}

function getCurrentRoute() {
  let navigator = navigationRef.current;
  let currentRoute = navigator?.getCurrentRoute();
  return currentRoute;
}

export default {
  navigate,
  replace,
  goBack,
  reset,
  popToTop,
  getCurrentRoute
};
