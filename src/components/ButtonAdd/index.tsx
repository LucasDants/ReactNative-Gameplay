import React from 'react';
import {RectButton, RectButtonProps} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../global/styles/theme';
import {styles} from './styles';

export function ButtonAdd({...rest}: RectButtonProps) {
  return (
    <RectButton style={styles.container} {...rest}>
      <Icon name="plus" color={theme.colors.heading} size={24} />
    </RectButton>
  );
}
