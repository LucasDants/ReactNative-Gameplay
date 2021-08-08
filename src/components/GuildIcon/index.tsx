import React from 'react';

import {Image} from 'react-native';

import {styles} from './styles';

type GuildIconProps = {
  urlImage: string;
};

export function GuildIcon({urlImage}: GuildIconProps) {
  return (
    <Image source={{uri: urlImage}} style={styles.image} resizeMode="cover" />
  );
}
