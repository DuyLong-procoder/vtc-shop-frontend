import type { LoginValues, RegisterValues } from "./auth-schemas";

const BASE = "https://dummyjson.com";

export async function apiLogin(payload: LoginValues) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Login failed");
  return data as {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    accessToken: string;
    refreshToken: string;
  };
}

export async function apiRegister(payload: RegisterValues) {
  // Theo đề: register chỉ để demo tạo user, KHÔNG login được
  const { confirmPassword, ...body } = payload;

  const res = await fetch(`${BASE}/users/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Register failed");
  return data;
}
