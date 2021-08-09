import React from 'react';
import {useState} from 'react';
import {FlatList, View} from 'react-native';
import {Appointment} from '../../components/Appointment';
import {Background} from '../../components/Background';
import {ButtonAdd} from '../../components/ButtonAdd';
import {CategorySelect} from '../../components/CategorySelect';
import {ListDivider} from '../../components/ListDivider';
import {ListHeader} from '../../components/ListHeader';
import {Profile} from '../../components/Profile';
import {styles} from './styles';

export function Home() {
  const [category, setCategory] = useState('');

  const appointments = [
    {
      id: '1',
      guild: {
        id: '1',
        name: 'Teste',
        icon: 'https://github.com/LucasDants.png',
        owner: true,
      },
      category: '1',
      date: '08/06 às 15:00h',
      description: 'É isso ai',
    },
    {
      id: '2',
      guild: {
        id: '1',
        name: 'Teste',
        icon: 'https://github.com/LucasDants.png',
        owner: true,
      },
      category: '1',
      date: '08/06 às 15:00h',
      description: 'É isso ai',
    },
  ];

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd activeOpacity={0.7} />
      </View>
      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />
      <View style={styles.content}>
        <ListHeader title="Partidas Agendadas" subtitle="Total 6" />
        <FlatList
          data={appointments}
          keyExtractor={item => item.id}
          renderItem={({item}) => <Appointment data={item} />}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ListDivider />}
          style={styles.matches}
        />
      </View>
    </Background>
  );
}
