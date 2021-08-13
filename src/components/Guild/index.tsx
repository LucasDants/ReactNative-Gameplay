import React from 'react';

import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {theme} from '../../global/styles/theme';
import {GuildIcon} from '../GuildIcon';

import {styles} from './styles';

export type GuildProps = {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
};

type GuildScreenProps = TouchableOpacityProps & {
  data: GuildProps;
};

export function Guild({data, ...rest}: GuildScreenProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} {...rest}>
      <GuildIcon guildId={data.id} iconId={data.icon} />
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.type}>
            {data.owner ? 'Administrador' : 'Convidado'}
          </Text>
        </View>
      </View>
      <Icon name="chevron-right" color={theme.colors.heading} size={24} />
    </TouchableOpacity>
  );
}
