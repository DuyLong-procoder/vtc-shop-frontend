"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { loginSchema, type LoginValues } from "@/lib/auth/auth-schemas";
import { apiLogin } from "@/lib/auth/auth-api";
import { useAuth } from "@/app/providers";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth(); // nếu bạn chưa có hàm login() thì xem ghi chú bên dưới

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "emilys",
      password: "emilyspass",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: LoginValues) => {
    try {
      const data = await apiLogin(values);

      // Lưu token (bạn có thể để trong AuthProvider)
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      login?.(data); // cập nhật state đăng nhập (nếu có)
      toast.success("Login successful!");
      router.push("/");
    } catch (err: any) {
      toast.error(err?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <input
          className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#C3293E]/20"
          placeholder="Username / email address"
          {...register("username")}
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#C3293E]/20"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <button
        disabled={isSubmitting}
        className="w-full rounded-lg bg-[#C3293E] py-3 font-bold text-white hover:bg-red-800 transition disabled:opacity-60"
      >
        {isSubmitting ? "Logging in..." : "Login Now"}
      </button>

      <p className="text-xs text-gray-500">
        * Theo đề bài: chỉ login được bằng tài khoản <b>emilys / emilyspass</b>
      </p>
    </form>
  );
}
