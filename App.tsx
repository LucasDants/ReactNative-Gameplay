import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Background} from './src/components/Background';
import {SignIn} from './src/screens/SignIn';

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
      <SignIn />
    </Background>
  );
};

export default App;
