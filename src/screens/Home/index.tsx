import React, {useCallback} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {FlatList, View} from 'react-native';
import {Appointment, AppointmentProps} from '../../components/Appointment';
import {Background} from '../../components/Background';
import {ButtonAdd} from '../../components/ButtonAdd';
import {CategorySelect} from '../../components/CategorySelect';
import {ListDivider} from '../../components/ListDivider';
import {ListHeader} from '../../components/ListHeader';
import {Load} from '../../components/Load';
import {Profile} from '../../components/Profile';
import {COLLECTION_APPOINTMENTS} from '../../configs/storage';
import {styles} from './styles';

export function Home() {
  const [category, setCategory] = useState('');
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function handleAppointmentDetails(guildSelected: AppointmentProps) {
    console.log(guildSelected);
    navigation.navigate('AppointmentDetails', {
      guildSelected,
    });
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate');
  }

  useFocusEffect(
    useCallback(() => {
      async function loadAppointments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage: AppointmentProps[] = response
          ? JSON.parse(response)
          : [];

        if (category) {
          setAppointments(storage.filter(item => item.category === category));
        } else {
          setAppointments(storage);
        }
        setLoading(false);
      }

      loadAppointments();
    }, [category]),
  );

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>
      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />
      {loading ? (
        <Load />
      ) : (
        <>
          <ListHeader
            title="Partidas Agendadas"
            subtitle={`Total ${appointments.length}`}
          />
          <FlatList
            data={appointments}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Appointment
                data={item}
                onPress={() => handleAppointmentDetails(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 69}}
            ItemSeparatorComponent={() => <ListDivider />}
            style={styles.matches}
          />
        </>
      )}
    </Background>
  );
}
