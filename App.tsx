/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';

import RootStackNavigator from './src/navigators/RootStackNavigator';
import Toast from 'react-native-toast-message';
import LanguageProvider from './src/hocs/LanguageProvider';
import {ThemeProvider} from './src/contexts/ThemeContext';
import analytics from '@react-native-firebase/analytics';
import {Auth0Provider} from 'react-native-auth0';

function App(): React.JSX.Element {
  // ...

  useEffect(() => {
    try {
      (async () => {
        const appInstanceId = await analytics().getAppInstanceId();
        await analytics().logAppOpen();

        console.log('APP INSTANTANCE', appInstanceId);
      })();
    } catch (error) {}
  }, []);
  return (
    <>
      <Auth0Provider
        domain="dev-ycu1i4dckbqx7x8m.us.auth0.com"
        clientId="qhMCttcZVep213x90hODQshUZTKZ06kO"
      >
          <LanguageProvider>
            <ThemeProvider>
              <RootStackNavigator />
            </ThemeProvider>
          </LanguageProvider>
      </Auth0Provider>
      <Toast />
    </>
  );
}

export default App;
