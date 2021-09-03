import { createContext, useState, useEffect } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const isAuthenticated = !!user;
  const maxAgeCookie = 60 * 20; //20 minutes

  useEffect(() => {
    const { 'leaguescores.token': userID } = parseCookies();

    if (userID) {
      fetch(`${process.env.APIHOST}/users/${userID}`).then(async res => {
        const { user } = await res.json();
        setUser(user);

        setCookie(undefined, 'leaguescores.token', userID, {
          path: "/",
          maxAge: maxAgeCookie, 
        });
      });
    }
  }, []);

  async function signIn({ email, password, rememberme }) {
    setError(null);

    const res = await fetch(
      `${process.env.APIHOST}/login`,
      {
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      }
    );

    const { result, user, message } = await res.json();

    if (!result) {
      setError(message);
      return false;
    }

    setCookie(undefined, 'leaguescores.token', user.userID, {
      path: "/",
      maxAge: rememberme ? 157680000 :maxAgeCookie, //1 hour
    });

    setUser(user);

    Router.push('/admin/home');
  }

  function signOut () {
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