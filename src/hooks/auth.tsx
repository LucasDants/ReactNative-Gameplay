import React, {createContext, ReactNode, useState, useContext} from 'react';
import {
  SCOPE,
  CLIEND_ID,
  CDN_IMAGE,
  REDIRECT_URI,
  RESPONSE_TYPE,
} from '../configs';
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
  signIn: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

function AuthContextProvider({children}: AuthContextProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  const authUrl = `/oauth2/authorize?client_id=${CLIEND_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

  async function signIn() {
    try {
      setLoading(true);
    } catch {
      throw new Error('Não foi possível autenticar');
    }
  }

  return (
    <AuthContext.Provider value={{user, signIn}}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export {AuthContextProvider, useAuth};
