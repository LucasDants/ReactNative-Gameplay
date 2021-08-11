import React, {createContext, ReactNode, useState, useContext} from 'react';
import {
  SCOPE,
  CLIENT_ID,
  CDN_IMAGE,
  REDIRECT_URI,
  CLIENT_SECRET,
} from '../configs';
import {authorize, AuthorizeResult} from 'react-native-app-auth';
import {api} from '../services/api';

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
    clientSecret: CLIENT_SECRET,
    redirectUrl: REDIRECT_URI,
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

        setUser({
          ...userInfo.data,
          firstName: userInfo.data.username.split(' ')[0],
          avatar: `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`,
          token: accessToken,
        });
      }
      setLoading(false);
    } catch {
      throw new Error('Não foi possível autenticar');
    }
  }

  return (
    <AuthContext.Provider value={{user, loading, signIn}}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export {AuthContextProvider, useAuth};
