import { useEffect, useState } from "react";
import { atom, useAtom } from "jotai";
import nookies from "nookies";

import firebase, { auth } from "@/lib/firebase";
import { IUser } from "@/types/user";

import { fetcher } from "@/utils/fetcher";
import firebaseAdmin from "@/lib/firebaseAdmin";

const userAtom = atom(undefined as IUser);
const isAuthedAtom = atom((get) => !!get(userAtom));

const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);
  const [isAuthed] = useAtom(isAuthedAtom);

  const signUp = async (email: string, password: string) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (response) => {
        const token = await response.user.getIdToken();
        nookies.set(undefined, "token", token, {});

        // const [_user, _error] = await fetcher.get("/auth/signup-action");
        const [user, error] = await fetcher.get<IUser>("/auth/login-action");

        setUser(user);
      });
  };

  const signinWithEmail = async (email: string, password: string) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(async (response) => {
        const token = await response.user.getIdToken();
        nookies.set(undefined, "token", token, {});

        const [user, error] = await fetcher.get<IUser>("/auth/login-action");

        setUser(user);
      });
  };

  const signout = () => {
    return auth.signOut().then(() => {
      setUser(undefined);
    });
  };

  const update = async (data: { name: string; email: string }) => {
    const [newUser, error] = await fetcher.post<IUser>("/user", data);
    if (error) throw error;
  };

  // When the firebase JS SDK is still loading, show a loading state
  // Otherwise enjoy the undefined errors
  const [authStateLoading, setAuthStateLoading] = useState(true);

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(undefined);
        nookies.set(undefined, "token", "", {});

        setAuthStateLoading(false);
        return;
      }

      const token = await user.getIdToken();
      setUser(formatUser(user));
      nookies.set(undefined, "token", token, {});
      setAuthStateLoading(false);
    });
  }, []);

  return {
    authStateLoading,
    user,
    isAuthed,
    signUp,
    signinWithEmail,
    signout,
    update,
  };
};

export const formatUser = (
  user: firebase.User | firebaseAdmin.auth.UserRecord
): IUser => {
  const returnUser = {
    uid: user.uid,
    email: user.email,
    name: user.displayName ?? "",
  };
  return returnUser;
};

export default useAuth;
