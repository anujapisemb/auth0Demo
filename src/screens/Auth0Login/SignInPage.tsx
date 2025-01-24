import {BaseLoginRequest} from '@medplum/core';
import {useMedplum} from '@medplum/react-hooks';
import {useCallback, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import WebView from 'react-native-webview';
import NavigationService from 'redux/NavigationService';
import {auth0} from 'screens/AuthScreens/Login/auth0';

const MEDPLUM_BASE_URL = 'https://api-stage.healthconnect.systems/';
export const MEDPLUM_PROJECT_ID = 'fdf3e41c-9a91-4dac-90de-36482c8ada6e';
export const MEDPLUM_CLIENT_ID = '349a9b28-28fa-4f22-abe3-77548b3fdb87';
export const WEB_APP_REDIRECT_URI = 'http://localhost:8000/signin';
const EXTERNAL_AUTHORIZE_URL = 'https://dev-ycu1i4dckbqx7x8m.us.auth0.com/authorize';
const EXTERNAL_CLIENT_ID = 'qhMCttcZVep213x90hODQshUZTKZ06kO';
const EXTERNAL_REDIRECT_URI = MEDPLUM_BASE_URL + 'auth/external';
// const EXTERNAL_REDIRECT_URI =  'https://webhook.site/f88b5178-1463-4820-8e6b-fe6bb42eefb6';

const SignInPage = () => {
  const medplum = useMedplum();
  const [url, setUrl] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  console.log('Medplum:', medplum); // This should not log undefined

  // Check for the "code" query param
  // const code = new URLSearchParams(window.location.search).get('code');

  // useEffect(() => {
  //   console.log('SignInPage mounted');
  //   console.log('Current URL:', window.location.href);

  //   if (code) {
  //     console.log('Found auth code in URL:', code);
  //     medplum
  //       .processCode(code)
  //       .then(() => {
  //         console.log('Successfully processed code. Navigating to home page.');
  //         navigate('/');
  //       })
  //       .catch((err) => {
  //         console.error('Error processing code:', err);
  //       });
  //   } else {
  //     console.log('No "code" param found in URL. User not returning from Auth0 yet.');
  //   }
  // }, [medplum, navigate, code]);

  const handleClick = useCallback(() => {
    console.log('Starting external auth flow');
    console.log('External authorize URL:', EXTERNAL_AUTHORIZE_URL);
    console.log('External client ID:', EXTERNAL_CLIENT_ID);
    console.log('External redirect URI:', EXTERNAL_REDIRECT_URI);

    // medplum
    //   .signInWithExternalAuth(
    //     EXTERNAL_AUTHORIZE_URL,
    //     EXTERNAL_CLIENT_ID,
    //     EXTERNAL_REDIRECT_URI,
    //     {
    //       projectId: MEDPLUM_PROJECT_ID,
    //       clientId: MEDPLUM_CLIENT_ID,
    //       redirectUri: WEB_APP_REDIRECT_URI,
    //     },
    //     // pass "false" to disable PKCE
    //      false
    //   )
    //   .then(() => {
    //     console.log('signInWithExternalAuth call succeeded (redirecting to Auth0)...');
    //   })
    //   .catch((err) => {
    //     console.error('signInWithExternalAuth call failed:', err);
    //   });
    let url = getExternalAuthRedirectUri(
      EXTERNAL_AUTHORIZE_URL,
      EXTERNAL_CLIENT_ID,
      EXTERNAL_REDIRECT_URI,
      {
        projectId: MEDPLUM_PROJECT_ID,
        clientId: MEDPLUM_CLIENT_ID,
        redirectUri: WEB_APP_REDIRECT_URI,
      },
      // pass "false" to disable PKCE
      false,
    );
    console.log('URL', url);
    // setUrl(url);
    if (url) {
      NavigationService.navigate('webViewScreen', {
        url,
      });
    }
  }, [medplum]);

  const handleSigninWithOtp = useCallback(() => {
    NavigationService.navigate('otpLogin');
  }, []);

  const handleSigninWithGoogle = useCallback(async () => {
    const credentials = await auth0.webAuth.authorize({
      scope: 'openid profile email',
      connection: 'google-oauth2', // This tells Auth0 to use Google
      additionalParameters: {prompt: 'login'},
    });
    console.log('Access Token: ', credentials);
    if (credentials.idToken) {
      let result = await fetch(
        `https://api-stage.healthconnect.systems/auth/external?code=${credentials.idToken}&state=${encodeURIComponent(
          JSON.stringify({
            projectId: 'fdf3e41c-9a91-4dac-90de-36482c8ada6e',
            clientId: MEDPLUM_CLIENT_ID,
            redirectUri:
              'https://dev-web.todayhealth.ai/login',
          }),
        )}`,
      );

      console.log('handleSigninWithGoogle result', JSON.stringify(result));
      if (result && result?.url) {
        const parsedUrl = new URL(result?.url);
        const code = parsedUrl.searchParams.get('code');
        // const code = new URLSearchParams(result?.url).get('code=');
        console.log('code', code);

            const param = new URLSearchParams();
            param.append('grant_type', 'authorization_code');
            param.append('code', code?.toString());
            param.append('client_id', '');
            param.append('redirect_uri', 'https://dev-web.todayhealth.ai/login');
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

        // const param = new URLSearchParams();
        // param.append('grant_type', 'authorization_code');
        // param.append('code', credentials.idToken);
        // param.append('client_id', '');
        // param.append('redirect_uri', 'http://localhost:8000/');
        // var contentType = `application/x-www-form-urlencoded`;

        // medplum
        //   .post(`oauth2/token`, param.toString(), contentType)
        //   .then(async (response) => {
        //     console.log('response:: ', JSON.stringify(response));
        //   })
        //   .catch((error) => {
        //     console.log('error:: ', JSON.stringify(error));
        //   });
    }
  }, []);
  const handleSigninWithApple = useCallback(async () => {
    const credentials = await auth0.webAuth.authorize({
      scope: 'openid profile email',
      connection: 'apple', // This tells Auth0 to use Google
      additionalParameters: {prompt: 'login'},
    });
    console.log('Access Token: ', credentials);
    if (credentials.idToken) {
      let result = await fetch(
        `https://api-stage.healthconnect.systems/auth/external?code=${credentials.idToken}&state=${encodeURIComponent(
          JSON.stringify({
            projectId: 'fdf3e41c-9a91-4dac-90de-36482c8ada6e',
            clientId: MEDPLUM_CLIENT_ID,
            redirectUri:
              'https://dev-web.todayhealth.ai/login',
          }),
        )}`,
      );

      console.log('handleSigninWithGoogle result', JSON.stringify(result));
      if (result && result?.url) {
        const parsedUrl = new URL(result?.url);
        const code = parsedUrl.searchParams.get('code');
        // const code = new URLSearchParams(result?.url).get('code=');
        console.log('code', code);

            const param = new URLSearchParams();
            param.append('grant_type', 'authorization_code');
            param.append('code', code?.toString());
            param.append('client_id', '');
            param.append('redirect_uri', 'https://dev-web.todayhealth.ai/login');
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

        // const param = new URLSearchParams();
        // param.append('grant_type', 'authorization_code');
        // param.append('code', credentials.idToken);
        // param.append('client_id', '');
        // param.append('redirect_uri', 'http://localhost:8000/');
        // var contentType = `application/x-www-form-urlencoded`;

        // medplum
        //   .post(`oauth2/token`, param.toString(), contentType)
        //   .then(async (response) => {
        //     console.log('response:: ', JSON.stringify(response));
        //   })
        //   .catch((error) => {
        //     console.log('error:: ', JSON.stringify(error));
        //   });
    }
  }, []);
  function getExternalAuthRedirectUri(
    authorizeUrl: string,
    clientId: string,
    redirectUri: string,
    loginRequest: BaseLoginRequest,
    pkceEnabled = true,
  ): string {
    const url = new URL(authorizeUrl);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('client_id', clientId);
    url.searchParams.set('prompt', 'login');
    url.searchParams.set('redirect_uri', redirectUri);
    url.searchParams.set('scope', loginRequest.scope ?? 'openid profile email');
    url.searchParams.set('state', JSON.stringify(loginRequest));

    if (pkceEnabled) {
      const {codeChallenge, codeChallengeMethod} = loginRequest;
      if (!codeChallengeMethod) {
        throw new Error('`LoginRequest` for external auth must include a `codeChallengeMethod`.');
      }
      if (!codeChallenge) {
        throw new Error('`LoginRequest` for external auth must include a `codeChallenge`.');
      }
      url.searchParams.set('code_challenge_method', codeChallengeMethod);
      url.searchParams.set('code_challenge', codeChallenge);
    }

    return url.toString();
  }
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity
        onPress={handleClick}
        style={{backgroundColor: 'blue', paddingHorizontal: 18, paddingVertical: 8, borderRadius: 8}}
      >
        <Text style={{color: 'white', fontSize: 17}}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSigninWithOtp}
        style={{backgroundColor: 'blue', paddingHorizontal: 18, paddingVertical: 8, borderRadius: 8, marginTop: 16}}
      >
        <Text style={{color: 'white', fontSize: 17}}>Sign In with OTP</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSigninWithGoogle}
        style={{backgroundColor: 'blue', paddingHorizontal: 18, paddingVertical: 8, borderRadius: 8, marginTop: 16}}
      >
        <Text style={{color: 'white', fontSize: 17}}>Sign In with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSigninWithApple}
        style={{backgroundColor: 'blue', paddingHorizontal: 18, paddingVertical: 8, borderRadius: 8, marginTop: 16}}
      >
        <Text style={{color: 'white', fontSize: 17}}>Sign In with Apple</Text>
      </TouchableOpacity>
    </View>
  );
};
export default SignInPage;
