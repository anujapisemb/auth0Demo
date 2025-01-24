import {useNavigation} from '@react-navigation/native';
import {AUTH_STACK_NAVIGATOR} from 'navigators/routes';
import newRelic from 'newrelic-react-native-agent';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useAuth0} from 'react-native-auth0';
import {login} from 'redux/actions';
import {auth0} from './auth0';
import {useMedplum} from '@medplum/react-hooks';

const useViewModel = () => {
  const [username, setUsername] = useState<string>('jayesh');
  const [password, setPassword] = useState<string>('');
  const [code, setCode] = useState('');
  const [userId, setUserId] = useState('');
  const medplum = useMedplum();
  const {t} = useTranslation();
  const navigation = useNavigation();
  let {sendSMSCode} = useAuth0();

  const onSubmit = async () => {
    try {
      console.log('auth0 ', JSON.stringify(auth0));

      const loginResult = await auth0.auth.loginWithSMS({
        phoneNumber: '+919156369233',
        code,
      });
      console.log('loginResult :: ', JSON.stringify(loginResult));
      if (loginResult) {
        console.log('loginResult :: ', JSON.stringify(loginResult));
        console.log('userId', userId);
        if (loginResult?.idToken) {
          let result = await fetch(
            `https://api-stage.healthconnect.systems/auth/external?code=${
              loginResult?.idToken
            }&state=${encodeURIComponent(
              JSON.stringify({
                projectId: 'fdf3e41c-9a91-4dac-90de-36482c8ada6e',
                clientId: '1dfc7619-ccf5-4a27-b182-0b898affc913',
                redirectUri: 'http://localhost:8000/signin',
              }),
            )}`,
          );
          // auth0.users(result?.accessToken).getUser({id: userId}).then(console.log).catch(console.error);
          console.log('OTP result', JSON.stringify(result));
          console.log('OTP result url', JSON.stringify(result?.url));
          if (result && result?.url) {
            const parsedUrl = new URL(result?.url);
            const code = parsedUrl.searchParams.get('code');
            // const code = new URLSearchParams(result?.url).get('code=');
            console.log('code', code);

            const param = new URLSearchParams();
            param.append('grant_type', 'authorization_code');
            param.append('code', code?.toString());
            param.append('client_id', '');
            param.append('redirect_uri', 'http://localhost:8000/');
            var contentType = `application/x-www-form-urlencoded`;

            medplum
              .post(`oauth2/token`, param.toString(), contentType)
              .then(async (response) => {
                // dispatch(requestCompleted());
                console.log('response:: ', JSON.stringify(response));
                medplum
                  .get('https://api-stage.healthconnect.systems/oauth2/userinfo', {
                    headers: {
                      authorization: `Bearer ${response?.access_token}`,
                    },
                  })
                  .then((response) => {
                    console.log('userinfo response', JSON.stringify(response));
                  })
                  .catch((error) => {
                    console.log('userinfo error', JSON.stringify(error));
                  });
              })
              .catch((error) => {
                console.log('error:: ', JSON.stringify(error));
                // Toast.show(error, Toast.LONG);
              });
          }
        }
      }
    } catch (error) {
      console.log('error ', error);
    }
  };
  const sendOtp = async () => {
    try {
      console.log('auth0 ', JSON.stringify(auth0));

      const result = await auth0.auth.passwordlessWithSMS({phoneNumber: '+919156369233'});
      console.log('result:: ', JSON.stringify(result));
      if (result) {
        setUserId(result?.Id);
        console.log('result:: ', JSON.stringify(result));
      }
    } catch (error) {
      console.log('error ', error);
    }
  };

  return {username, password, setUsername, setPassword, onSubmit, sendOtp, code, setCode, t};
};

export default useViewModel;
