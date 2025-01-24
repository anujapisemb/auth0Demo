import {createNavigationContainerRef, NavigationContainer} from '@react-navigation/native';
import React from 'react';
import analytics from '@react-native-firebase/analytics';
import BootSplash from 'react-native-bootsplash';
import MainStackNavigator from './MainStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import {ErrorHandler} from 'components';
import useTypedSelector from 'hooks/useTypedSelector';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInPage from 'screens/Auth0Login/SignInPage';
import WebviewPage from 'screens/Auth0Login/WebviewPage';

const navigationRef = createNavigationContainerRef();
const Stack = createNativeStackNavigator();
const RootStackNavigator = () => {
  const {accessToken} = useTypedSelector((state) => state.appReducer);

  return (
    <ErrorHandler>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => BootSplash.hide({fade: true})}
        onStateChange={async () => {
          await analytics().logScreenView({
            screen_name: navigationRef.current?.getCurrentRoute()?.name,
          });
        }}
      >
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
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorHandler>
  );
};
export default RootStackNavigator;
