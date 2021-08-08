import React from 'react';

import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SvgProps} from 'react-native-svg';
import {theme} from '../../global/styles/theme';
import {styles} from './styles';

type CategoryProps = TouchableOpacityProps & {
  title: string;
  icon: React.FC<SvgProps>;
  checked?: boolean;
};

export function Category({
  title,
  icon: Icon,
  checked = false,
  ...rest
}: CategoryProps) {
  const {secondary50, secondary70} = theme.colors;
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <LinearGradient
        style={styles.container}
        colors={[secondary50, secondary70]}>
        <View style={[styles.content, {opacity: checked ? 1 : 0.4}]}>
          <View style={checked ? styles.checked : styles.check} />
          <Icon width={48} height={48} />
          <Text style={styles.title}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
