import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Background} from './src/components/Background';
import {AuthContextProvider} from './src/hooks/auth';
import {Routes} from './src/routes';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </Background>
  );
};

export default App;
