import React from 'react';

import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Guild, GuildProps} from '../../components/Guild';
import {ListDivider} from '../../components/ListDivider';

import {styles} from './styles';

type GuildsProps = {
  handleGuildSelect: (guild: GuildProps) => void;
};

export function Guilds({handleGuildSelect}: GuildsProps) {
  const guilds = [
    {
      id: '1',
      name: 'Lendários',
      icon: null,
      owner: true,
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={guilds}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Guild data={item} onPress={() => handleGuildSelect(item)} />
        )}
        ItemSeparatorComponent={() => <ListDivider isCentered />}
        contentContainerStyle={{paddingBottom: 69, paddingTop: 100}}
        ListHeaderComponent={() => <ListDivider isCentered />}
        showsVerticalScrollIndicator={false}
        style={styles.guilds}
      />
    </View>
  );
}
