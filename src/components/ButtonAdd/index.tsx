import React from 'react';

import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../global/styles/theme';
import {styles} from './styles';

export function ButtonAdd({...rest}: TouchableOpacityProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Icon name="plus" color={theme.colors.heading} size={24} />
    </TouchableOpacity>
  );
}
