import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

import {categories} from '../../utils/categories';
import {GuildIcon} from '../GuildIcon';

import PlayerSvg from '../../assets/player.svg';
import CalendaSvg from '../../assets/calendar.svg';

import {styles} from './styles';
import {theme} from '../../global/styles/theme';

export type GuildProps = {
  owner: boolean;
  name: string;
  icon: string;
  id: string;
};

export type AppointmentProps = {
  id: string;
  guild: GuildProps;
  category: string;
  date: string;
  description: string;
};

type AppointmentScreenProps = TouchableOpacityProps & {
  data: AppointmentProps;
};

export function Appointment({data, ...rest}: AppointmentScreenProps) {
  const [category] = categories.filter(item => item.id === data.category);
  const {owner} = data.guild;
  const {primary, on} = theme.colors;

  return (
    <TouchableOpacity {...rest}>
      <View style={styles.container}>
        <GuildIcon urlImage={data.guild.icon} />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{data.guild.name}</Text>
            <Text style={styles.category}>{category.title}</Text>
          </View>
          <View style={styles.footer}>
            <View style={styles.dateInfo}>
              <CalendaSvg />
              <Text style={styles.date}>{data.date}</Text>
            </View>
            <View style={styles.playersInfo}>
              <PlayerSvg fill={owner ? primary : on} />
              <Text style={[styles.player, {color: owner ? primary : on}]}>
                {owner ? 'Anfitrião' : 'Visitante'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
