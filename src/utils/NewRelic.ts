import {Platform} from 'react-native';
import NewRelic from 'newrelic-react-native-agent';

// Set the app token based on the platform
const appToken =
  Platform.OS === 'ios'
    ? 'AAeb775ada7ea5c1ff43356ff73c0c187ec3c14bf7-NRMA'
    : 'AAd6bda9f81ee03299a8c4cbd7283154dc393d1883-NRMA';

// Initialize the New Relic agent
NewRelic.startAgent({
  appToken,
  applicationPlatform: 'ReactNative',
  loggingEnabled: true,
});

console.log('New Relic initialized successfully');
