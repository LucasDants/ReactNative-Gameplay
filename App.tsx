import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Background} from './src/components/Background';
import {Home} from './src/screens/Home';
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
      <Home />
    </Background>
  );
};

export default App;
