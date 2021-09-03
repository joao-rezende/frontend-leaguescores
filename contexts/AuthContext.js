import { createContext, useState, useEffect } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';
import Api from "../services/Api";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const api = Api();

  const isAuthenticated = !!user;
  const maxAgeCookie = 60 * 20; //20 minutes

  useEffect(async () => {
    const { 'leaguescores.token': userID } = parseCookies();

    if (userID) {
      const { user } = await api.get(`/api/users/${userID}`);

      setUser(user);
      setCookie(undefined, 'leaguescores.token', userID, {
        path: "/",
        maxAge: maxAgeCookie,
      });
    }
  }, []);

  async function signIn({ email, password, rememberme }) {
    setError(null);

    const { result, user, message } = await api.post('/api/login', { email, password });

    if (!result) {
      setError(message);
      return false;
    }

    setCookie(undefined, 'leaguescores.token', user.userID, {
      path: "/",
      maxAge: rememberme ? 157680000 : maxAgeCookie,
    });

    setUser(user);

    Router.push('/admin/home');
  }

  function signOut() {
    destroyCookie(undefined, 'leaguescores.token', {
      path: "/",
    });
    setUser(null);
    Router.push('/');
  }

  return (
    <AuthContext.Provider value={{ user, error, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}