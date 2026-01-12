"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/providers";

export default function ProfilePage() {
  const { user, isLoggedIn, getMe } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;
    setLoading(true);
    getMe().finally(() => setLoading(false));
  }, [isLoggedIn, getMe]);

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-10">
        <p className="text-gray-600">Bạn cần đăng nhập để xem Profile.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <pre className="bg-white border rounded-xl p-6 overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      )}
    </div>
  );
}
