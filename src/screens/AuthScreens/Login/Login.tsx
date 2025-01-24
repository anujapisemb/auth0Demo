import React, {useState} from 'react';
import {View, TextInput, Button, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import useViewModel from './Login.viewmodel';
import {useStyles} from './Login.styles';
import Logo from 'assets/logosvg.svg';
import Image from 'components/Image';
import {useTheme} from 'contexts/ThemeContext';
import {Text} from 'components';

const themes = ['dark', 'light', 'other'];

const Login = () => {
  const {username, password, setPassword, setUsername, onSubmit, sendOtp, code, setCode} = useViewModel();
  const styles = useStyles();
  const {setTheme} = useTheme();
  const onPress = (value) => {
    setTheme(value);
  };
  return (
    <View style={styles.container}>
      <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
        <Button
          title={'Send OTP'}
          onPress={sendOtp}
        />
        <TextInput
          value={code}
          inputMode="numeric"
          onChangeText={(text) => setCode(text)}
          style={styles.input}
        />
        <Button
          title={'Submit'}
          onPress={onSubmit}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: Dimensions.get('window').width - 120,
    marginHorizontal: 16,
  },
});

export default Login;
