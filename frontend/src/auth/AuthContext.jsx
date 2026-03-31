import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { clearUser, getAllUsers, loadUser, saveUser, setAllUsers } from "./storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadUser();
    setUser(stored);
    setHydrated(true);
  }, []);

  const api = useMemo(() => {
    return {
      user,
      hydrated,
      login: async ({ email, password }) => {
        const users = getAllUsers();
        const found = users.find((u) => u.email === email && u.password === password);
        if (!found) {
          const err = new Error("Invalid email or password");
          err.code = "INVALID_CREDENTIALS";
          throw err;
        }
        const nextUser = { name: found.name, email: found.email };
        saveUser(nextUser);
        setUser(nextUser);
        return nextUser;
      },
      signup: async ({ name, email, password }) => {
        const users = getAllUsers();
        const exists = users.some((u) => u.email === email);
        if (exists) {
          const err = new Error("User already exists");
          err.code = "USER_EXISTS";
          throw err;
        }
        const nextUsers = [...users, { name, email, password }];
        setAllUsers(nextUsers);
      },
      logout: () => {
        clearUser();
        setUser(null);
      },
    };
  }, [user, hydrated]);

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

