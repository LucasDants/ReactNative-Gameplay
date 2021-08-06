import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {SignIn} from './src/screens/SignIn';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <SignIn />;
};

export default App;
