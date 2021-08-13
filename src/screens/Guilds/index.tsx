import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';

import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Guild, GuildProps} from '../../components/Guild';
import {ListDivider} from '../../components/ListDivider';
import {Load} from '../../components/Load';
import {api} from '../../services/api';

import {styles} from './styles';

type GuildsProps = {
  handleGuildSelect: (guild: GuildProps) => void;
};

export function Guilds({handleGuildSelect}: GuildsProps) {
  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchGuilds() {
    const response = await api.get('/users/@me/guilds');
    setGuilds(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchGuilds();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Load />
      ) : (
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
      )}
    </View>
  );
}
