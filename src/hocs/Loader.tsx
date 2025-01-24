import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  ColorValue,
} from 'react-native';

type Props = {
  size: 'small' | 'large';
  color: ColorValue;
};

const Loader = ({size, color}: Props) => {
  const {t} = useTranslation();
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size={size} color={color} />
      <Text style={styles.loaderTextStyle}>{t('loading.title')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderTextStyle: {
    color: 'white',
    marginTop: 10,
    fontWeight: '600',
  },
});

export default Loader;
