import SignInPage from 'screens/Auth0Login/SignInPage';
import {MedplumProvider} from '@medplum/react-hooks';
import {MedplumClient} from '@medplum/core';
import AppNavigator from 'navigators/AppNavigator';

const medplum = new MedplumClient({
  baseUrl: 'https://api-stage.healthconnect.systems/',
});

const AppTest = () => {
  return (
    <MedplumProvider medplum={medplum}>
      <AppNavigator />
    </MedplumProvider>
  );
};
export default AppTest;
