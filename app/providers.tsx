"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const API_BASE = "https://dummyjson.com";

type DummyUser = {
  id?: number;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
};

type LoginPayload = {
  username: string;
  password: string;
};

type RegisterPayload = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  gender: "male" | "female" | "other";
};

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: DummyUser | null;
};

type AuthContextValue = {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: DummyUser | null;

  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;

  getMe: () => Promise<DummyUser | null>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "myshop_auth_v1";

function safeParse(v: string | null) {
  try {
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
}

async function readJson(res: Response) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = (data?.message || data?.error || "Request failed") as string;
    throw new Error(msg);
  }
  return data;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    accessToken: null,
    refreshToken: null,
    user: null,
  });

  // load storage
  useEffect(() => {
    const saved = safeParse(localStorage.getItem(STORAGE_KEY));
    if (saved?.accessToken || saved?.refreshToken || saved?.user) {
      setState({
        accessToken: saved.accessToken ?? null,
        refreshToken: saved.refreshToken ?? null,
        user: saved.user ?? null,
      });
    }
  }, []);

  // save storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const logout = () => {
    setState({ accessToken: null, refreshToken: null, user: null });
    localStorage.removeItem(STORAGE_KEY);
    toast.success("Đã đăng xuất");
  };

  const refresh = async () => {
    if (!state.refreshToken) throw new Error("Missing refreshToken");
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: state.refreshToken }),
    });

    const data = await readJson(res);
    // response: { accessToken, refreshToken }
    setState((prev) => ({
      ...prev,
      accessToken: data.accessToken ?? prev.accessToken,
      refreshToken: data.refreshToken ?? prev.refreshToken,
    }));
  };

  const getMe = async () => {
    if (!state.accessToken) return null;

    const doFetch = async (token: string) => {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return readJson(res);
    };

    try {
      const me = await doFetch(state.accessToken);
      setState((prev) => ({ ...prev, user: me }));
      return me as DummyUser;
    } catch (e: any) {
      // nếu token hết hạn -> thử refresh 1 lần rồi gọi lại /me
      if (String(e?.message || "").toLowerCase().includes("token")) {
        await refresh();
        const token = safeParse(localStorage.getItem(STORAGE_KEY))?.accessToken || state.accessToken;
        const me = await doFetch(token);
        setState((prev) => ({ ...prev, user: me }));
        return me as DummyUser;
      }
      throw e;
    }
  };

  const login = async (payload: LoginPayload) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await readJson(res);
    // response mẫu: { accessToken, refreshToken, ...userFields }
    const accessToken = data.accessToken as string | undefined;
    const refreshToken = data.refreshToken as string | undefined;

    if (!accessToken || !refreshToken) {
      throw new Error("Login success but missing token(s) in response");
    }

    setState({
      accessToken,
      refreshToken,
      user: {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        image: data.image,
      },
    });

    // bắt buộc “GET USER INFO” -> gọi luôn /auth/me sau login
    await getMe();

    toast.success("Đăng nhập thành công!");
  };

  const register = async (payload: RegisterPayload) => {
    const res = await fetch(`${API_BASE}/users/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    await readJson(res);

    toast.success("Đăng ký thành công! (DummyJSON không cho login user mới)");
    toast("Bạn phải dùng tài khoản: emilys / emilyspass để đăng nhập.", { icon: "ℹ️" });
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoggedIn: !!state.accessToken,
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
      user: state.user,
      login,
      register,
      logout,
      getMe,
      refresh,
    }),
    [state.accessToken, state.refreshToken, state.user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
