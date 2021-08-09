import React, {ReactNode} from 'react';

import {Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../../global/styles/theme';
import Icon from 'react-native-vector-icons/Feather';
import {styles} from './styles';
import {BorderlessButton} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

type HeaderProps = {
  title: string;
  action?: ReactNode;
};

export function Header({title, action}: HeaderProps) {
  const {secondary100, secondary40, heading} = theme.colors;
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <LinearGradient
      colors={[secondary100, secondary40]}
      style={styles.container}>
      <BorderlessButton onPress={handleGoBack}>
        <Icon name="arrow-left" size={24} color={heading} />
      </BorderlessButton>
      <Text style={styles.title}>{title}</Text>
      {action && <View>{action}</View>}
    </LinearGradient>
  );
}
