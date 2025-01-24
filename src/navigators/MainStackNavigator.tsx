import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MAIN_STACK_NAVIGATOR} from './routes';
import HomeTabNavigator from './HomeTabNavigator';

const MainStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={MAIN_STACK_NAVIGATOR.HOME_TAB_NAVIGATOR}
        component={HomeTabNavigator}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
