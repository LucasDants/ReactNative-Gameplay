import React from 'react';

import {
  Alert,
  ImageBackground,
  Share,
  Text,
  View,
  Platform,
  Linking,
} from 'react-native';
import {BorderlessButton, FlatList} from 'react-native-gesture-handler';
import {Background} from '../../components/Background';
import {Header} from '../../components/Header';
import Icon from 'react-native-vector-icons/Fontisto';
import {styles} from './styles';
import {theme} from '../../global/styles/theme';
import bannerImg from '../../assets/banner.png';
import {ListHeader} from '../../components/ListHeader';
import {Member, MemberProps} from '../../components/Member';
import {ListDivider} from '../../components/ListDivider';
import {ButtonIcon} from '../../components/ButtonIcon';
import {useRoute} from '@react-navigation/native';
import {AppointmentProps} from '../../components/Appointment';
import {useState} from 'react';
import {api} from '../../services/api';
import {useEffect} from 'react';
import {Load} from '../../components/Load';

type RouteParams = {
  guildSelected: AppointmentProps;
};

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
};

export function AppointmentDetails() {
  const routes = useRoute();
  const {guildSelected} = routes.params as RouteParams;
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);

  function handleShareInvitation() {
    const message =
      Platform.OS === 'ios'
        ? `Junte-se a ${guildSelected.guild.name}`
        : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite,
    });
  }

  function handleOpenGuild() {
    if (widget.instant_invite) {
      Linking.openURL(widget.instant_invite);
    }
  }

  useEffect(() => {
    async function fetchGuildWidget() {
      try {
        const response = await api.get(
          `/guilds/${guildSelected.guild.id}/widget.json`,
        );
        setWidget(response.data);
      } catch {
        Alert.alert(
          'Verique as configurações do servidor. Será que o Widget está habilitado?',
        );
      } finally {
        setLoading(false);
      }
    }

    fetchGuildWidget();
  }, []);

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          guildSelected.guild.owner && (
            <BorderlessButton onPress={handleShareInvitation}>
              <Icon name="share" size={24} color={theme.colors.primary} />
            </BorderlessButton>
          )
        }
      />
      <ImageBackground source={bannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{guildSelected.guild.name}</Text>
          <Text style={styles.subtitle}>{guildSelected.description}</Text>
        </View>
      </ImageBackground>
      {loading ? (
        <Load />
      ) : (
        <>
          <ListHeader
            title="Jogadores"
            subtitle={`Total ${widget.members.length}`}
          />
          <FlatList
            data={widget.members}
            keyExtractor={item => item.id}
            renderItem={({item}) => <Member data={item} />}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            style={styles.members}
          />
        </>
      )}
      {guildSelected.guild.owner && (
        <View style={styles.footer}>
          <ButtonIcon title="Entrar na partida" onPress={handleOpenGuild} />
        </View>
      )}
    </Background>
  );
}
