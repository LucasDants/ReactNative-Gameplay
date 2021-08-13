import React, {createContext, ReactNode, useState, useContext} from 'react';
import {CLIENT_ID, REDIRECT_URL} from '@env';
import {SCOPE, CDN_IMAGE} from '../configs';
import {authorize, AuthorizeResult} from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '../services/api';
import {COLLECTION_USERS} from '../configs/storage';
import {useEffect} from 'react';

type User = {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
};

type AuthContextData = {
  user: User;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

function AuthContextProvider({children}: AuthContextProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  const config = {
    clientId: CLIENT_ID,
    redirectUrl: REDIRECT_URL,
    scopes: SCOPE,
    serviceConfiguration: {
      authorizationEndpoint: `${api.defaults.baseURL}/oauth2/authorize`,
      tokenEndpoint: `${api.defaults.baseURL}/oauth2/token`,
      revocationEndpoint: `${api.defaults.baseURL}/oauth2/token/revoke`,
    },
  };

  async function signIn() {
    try {
      setLoading(true);
      const {accessToken} = (await authorize(config)) as AuthorizeResult;
      if (accessToken !== '') {
        api.defaults.headers.authorization = `Bearer ${accessToken}`;

        const userInfo = await api.get('/users/@me');

        const userData = {
          ...userInfo.data,
          firstName: userInfo.data.username.split(' ')[0],
          avatar: `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`,
          token: accessToken,
        };

        await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData));
        setUser(userData);
      }
    } catch {
      throw new Error('Não foi possível autenticar');
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(COLLECTION_USERS);
  }

  async function loadUserStorageData() {
    const storage = await AsyncStorage.getItem(COLLECTION_USERS);

    if (storage) {
      const userLogged = JSON.parse(storage) as User;
      api.defaults.headers.authorization = `Bearer ${userLogged.token}`;
      setUser(userLogged);
    }
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{user, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export {AuthContextProvider, useAuth};
