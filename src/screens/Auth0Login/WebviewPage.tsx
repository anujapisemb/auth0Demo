import {useMedplum} from '@medplum/react-hooks';
import {useRoute} from '@react-navigation/native';
import {useTheme} from 'contexts/ThemeContext';
import {useEffect, useState} from 'react';
import {StatusBar, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import NavigationService from 'redux/NavigationService';
import SvgIcon from 'utils/SvgIcon';
import back from '../../assets/svg/back.svg';

const WebviewPage = () => {
  const medplum = useMedplum();
  const [redirectUrl, setRedirectUrl] = useState('');
  const route = useRoute();
  const {url} = route?.params;
  const [uri, setUri] = useState('');
  const {themeColors} = useTheme();

  useEffect(() => {
    if (redirectUrl && redirectUrl.includes('?login=')) {
      console.log('redirectUrl:', redirectUrl); // This should not log undefined

      const parsedUrl = new URL(redirectUrl);
      const code = parsedUrl.searchParams.get('code');
      console.log('Code:', code);

      NavigationService.goBack();

      const param = new URLSearchParams();
      param.append('grant_type', 'authorization_code');
      param.append('code', code?.toString());
      param.append('client_id', '');
      param.append('redirect_uri', 'http://localhost:8000/');
      var contentType = `application/x-www-form-urlencoded`;

      medplum
        .post(`oauth2/token`, param.toString(), contentType)
        .then(async (response) => {
          console.log('response:: ', JSON.stringify(response));
        })
        .catch((error) => {
          console.log('error:: ', JSON.stringify(error));
        });
    }
  }, [redirectUrl]);

  useEffect(() => {
    async function setUrl() {
      setUri(url);
    }
    setUrl();
  }, [url]);
  const handleleftIconPressed = () => {
    NavigationService.goBack();
  };
  return (
    <View style={{flex: 1}}>
      <View>
        <SafeAreaView
          edges={['top']}
          style={{backgroundColor: 'white'}}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            paddingVertical: 15,
            paddingHorizontal: 20,
            height: 58,
          }}
        >
          <StatusBar
            backgroundColor={'white'}
            barStyle="dark-content"
          />
          <TouchableOpacity onPress={() => handleleftIconPressed()}>
            <SvgIcon
              name={back}
              width={25}
              height={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      {uri && (
        <WebView
          source={{
            uri: uri,
          }}
          onNavigationStateChange={(state) => {
            console.log('state', state?.url);
            setRedirectUrl(state.url);
          }}
          onLoadStart={() => {}}
          onLoad={() => {}}
          onLoadEnd={() => {}}
          onError={(error) => {
            console.log('onError', error);
          }}
          cacheEnabled={false}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          userAgent={
            'Mozilla/5.0 (Linux; Android 12; Pixel a5 Build/SP1A.210812.016) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/114.0.5735.130 Mobile Safari/537.36'
          }
        />
      )}
    </View>
  );
};
export default WebviewPage;
