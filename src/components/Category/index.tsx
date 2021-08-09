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
  hasCheckBox?: boolean;
  checked?: boolean;
};

export function Category({
  title,
  icon: Icon,
  checked = false,
  hasCheckBox = false,
  ...rest
}: CategoryProps) {
  const {secondary40, secondary50, secondary70, secondary75} = theme.colors;
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <LinearGradient
        style={styles.container}
        colors={[secondary50, secondary70]}>
        <LinearGradient
          style={[styles.content, {opacity: checked ? 1 : 0.5}]}
          colors={[checked ? secondary75 : secondary50, secondary40]}>
          {hasCheckBox && (
            <View style={checked ? styles.checked : styles.check} />
          )}
          <Icon width={48} height={48} />
          <Text style={styles.title}>{title}</Text>
        </LinearGradient>
      </LinearGradient>
    </TouchableOpacity>
  );
}
