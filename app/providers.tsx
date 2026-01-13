"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type LoginPayload = { username: string; password: string };
type RegisterPayload = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  gender: string;
};

type UserInfo = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
};

type AuthContextValue = {
  user: UserInfo | null;
  isLoggedIn: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const BASE = "https://dummyjson.com";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);

  const isLoggedIn = !!user;

  const login = async (payload: LoginPayload) => {
    const res = await fetch(`${BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.message || "Login failed");

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    setUser({
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    });
  };

  const register = async (payload: RegisterPayload) => {
    const res = await fetch(`${BASE}/users/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.message || "Register failed");

    // Theo đề: register xong không login được => chỉ thông báo OK là đủ
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  // Optional: auto load user from token (nếu bạn muốn)
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    fetch(`${BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((me) => {
        if (!me) return;
        setUser({
          id: me.id,
          username: me.username,
          email: me.email,
          firstName: me.firstName,
          lastName: me.lastName,
        });
      })
      .catch(() => {});
  }, []);

  const value = useMemo(
    () => ({ user, isLoggedIn, login, register, logout }),
    [user, isLoggedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
