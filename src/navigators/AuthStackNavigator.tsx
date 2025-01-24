import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AUTH_STACK_NAVIGATOR} from './routes';
import {Login, Home} from 'screens';

const AuthStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AUTH_STACK_NAVIGATOR.LOGIN_SCREEN}
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={AUTH_STACK_NAVIGATOR.HOME}
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
