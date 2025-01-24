import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInPage from 'screens/Auth0Login/SignInPage';
import {navigationRef} from 'redux/NavigationService';
import WebviewPage from 'screens/Auth0Login/WebviewPage';
import { Login } from 'screens';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={'signin'}
          component={SignInPage}
        />
        <Stack.Screen
          name={'webViewScreen'}
          options={{
            headerShown: false,
          }}
          component={WebviewPage}
        />
        <Stack.Screen
          name={'otpLogin'}
          options={{
            headerShown: false,
          }}
          component={Login}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigator;
