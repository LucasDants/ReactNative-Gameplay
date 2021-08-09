import React from 'react';

import {ImageBackground, Text, View} from 'react-native';
import {BorderlessButton, FlatList} from 'react-native-gesture-handler';
import {Background} from '../../components/Background';
import {Header} from '../../components/Header';
import Icon from 'react-native-vector-icons/Fontisto';
import {styles} from './styles';
import {theme} from '../../global/styles/theme';
import bannerImg from '../../assets/banner.png';
import {ListHeader} from '../../components/ListHeader';
import {Member} from '../../components/Member';
import {ListDivider} from '../../components/ListDivider';
import {ButtonIcon} from '../../components/ButtonIcon';

export function AppointmentDetails() {
  const members = [
    {
      id: '1',
      username: 'Lucas',
      avatar_url: 'https://github.com/LucasDants.png',
      status: 'online',
    },
    {
      id: '2',
      username: 'Lucas',
      avatar_url: 'https://github.com/LucasDants.png',
      status: 'online',
    },
  ];

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          <BorderlessButton>
            <Icon name="share" size={24} color={theme.colors.primary} />
          </BorderlessButton>
        }
      />
      <ImageBackground source={bannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>Lendários</Text>
          <Text style={styles.subtitle}>
            É hoje que vamos chegar ao challenger sem perder uma partida ad md10
          </Text>
        </View>
      </ImageBackground>
      <ListHeader title="Jogadores" subtitle="Total 3" />
      <FlatList
        data={members}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Member data={item} />}
        ItemSeparatorComponent={() => <ListDivider />}
        style={styles.members}
      />
      <View style={styles.footer}>
        <ButtonIcon title="Entrar na partida" />
      </View>
    </Background>
  );
}
