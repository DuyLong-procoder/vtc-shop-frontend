"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { ArrowRight, Lock, User, Mail, KeyRound } from "lucide-react";
import { useAuth } from "@/app/providers";

/**
 * ✅ UI giống mẫu
 * ✅ Validate: react-hook-form + zod
 * ✅ Login: POST /auth/login (username + password)
 * ✅ Register: POST /users/add (DummyJSON: tạo user mới nhưng không login được)
 */

// ---------- Schemas ----------
const loginSchema = z.object({
  usernameOrEmail: z.string().min(1, "Please enter username / email"),
  password: z.string().min(1, "Please enter password"),
  remember: z.boolean().optional(),
});

const registerSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

function inputBase() {
  return "w-full h-[56px] pl-12 pr-4 rounded-lg bg-[#F7F7F7] border border-transparent focus:border-gray-300 focus:bg-white focus:outline-none transition";
}

export default function AuthPage() {
  const router = useRouter();
  const { login, register } = useAuth();

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usernameOrEmail: "emilys", // đúng yêu cầu thầy
      password: "emilyspass",
      remember: true,
    },
    mode: "onSubmit",
  });

  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmitLogin = async (values: LoginForm) => {
    try {
      // API DummyJSON login bắt buộc username + password.
      // Nếu người dùng nhập email emily@example.com -> map về username emilys (cho “giống mẫu”)
      const isEmail = values.usernameOrEmail.includes("@");
      const username =
        isEmail && values.usernameOrEmail.trim().toLowerCase() === "emily@example.com"
          ? "emilys"
          : values.usernameOrEmail.trim();

      await login({ username, password: values.password });
      router.push("/");
    } catch (e: any) {
      toast.error(e?.message || "Login failed");
    }
  };

  const onSubmitRegister = async (values: RegisterForm) => {
    try {
      // UI mẫu chỉ có email + password, nhưng API /users/add yêu cầu nhiều field
      // => mình tự generate các field còn thiếu để vẫn đúng API thầy đưa.
      const email = values.email.trim();
      const username = email.split("@")[0] || `user${Date.now()}`;
      await register({
        firstName: "New",
        lastName: "User",
        username,
        password: values.password,
        email,
        gender: "other",
      });

      registerForm.reset();
    } catch (e: any) {
      toast.error(e?.message || "Register failed");
    }
  };

  return (
    <div className="bg-[#F6F6F6] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* ===================== LOGIN CARD ===================== */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Image */}
            <div className="relative w-full h-[260px]">
              {/* Bạn đặt ảnh vào: public/assets/img/auth/login.jpg */}
              <Image
                src="/assets/img/auth/login.jpg"
                alt="Login"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-white shadow-sm border flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#C3293E]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Login Here</h2>
                  <p className="text-sm text-gray-500 mt-1 max-w-[520px]">
                    Your personal data will be used to support your experience throughout this website, to manage access
                    to your account.
                  </p>
                </div>
              </div>

              <form onSubmit={loginForm.handleSubmit(onSubmitLogin)} className="space-y-4">
                {/* Username / email */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...loginForm.register("usernameOrEmail")}
                    placeholder="Username / email address"
                    className={inputBase()}
                  />
                  {loginForm.formState.errors.usernameOrEmail?.message ? (
                    <p className="mt-2 text-sm text-red-600">
                      {loginForm.formState.errors.usernameOrEmail.message}
                    </p>
                  ) : null}
                </div>

                {/* Password */}
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    {...loginForm.register("password")}
                    placeholder="Password"
                    className={inputBase()}
                  />
                  {loginForm.formState.errors.password?.message ? (
                    <p className="mt-2 text-sm text-red-600">{loginForm.formState.errors.password.message}</p>
                  ) : null}
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-sm text-gray-500 select-none">
                    <input
                      type="checkbox"
                      {...loginForm.register("remember")}
                      className="w-4 h-4 rounded border-gray-300 accent-[#C3293E]"
                    />
                    Remember me
                  </label>

                  <Link href="#" className="text-sm text-gray-800 underline hover:text-[#C3293E]">
                    Forget Password
                  </Link>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loginForm.formState.isSubmitting}
                  className="mt-2 w-full h-[56px] rounded-lg bg-[#C3293E] text-white font-bold flex items-center justify-center gap-3 hover:bg-red-800 transition disabled:opacity-60"
                >
                  Login Now <ArrowRight className="w-5 h-5" />
                </button>

                {/* hint */}
                <p className="text-xs text-gray-500 mt-2">
                  * Thầy yêu cầu login bằng: <b>emilys / emilyspass</b>
                </p>
              </form>
            </div>
          </div>

          {/* ===================== REGISTER CARD ===================== */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Image */}
            <div className="relative w-full h-[260px]">
              {/* Bạn đặt ảnh vào: public/assets/img/auth/register.jpg */}
              <Image
                src="/assets/img/auth/register.jpg"
                alt="Register"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-white shadow-sm border flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#C3293E]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Sign Up</h2>
                  <p className="text-sm text-gray-500 mt-1 max-w-[520px]">
                    Your personal data will be used to support your experience throughout this website, to manage access
                    to your account.
                  </p>
                </div>
              </div>

              <form onSubmit={registerForm.handleSubmit(onSubmitRegister)} className="space-y-4">
                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    {...registerForm.register("email")}
                    placeholder="Email address"
                    className={inputBase()}
                  />
                  {registerForm.formState.errors.email?.message ? (
                    <p className="mt-2 text-sm text-red-600">{registerForm.formState.errors.email.message}</p>
                  ) : null}
                </div>

                {/* Password */}
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    {...registerForm.register("password")}
                    placeholder="Password"
                    className={inputBase()}
                  />
                  {registerForm.formState.errors.password?.message ? (
                    <p className="mt-2 text-sm text-red-600">{registerForm.formState.errors.password.message}</p>
                  ) : null}
                </div>

                <div className="pt-1">
                  <button
                    type="button"
                    className="text-sm underline text-gray-800 hover:text-[#C3293E]"
                    onClick={() => {
                      toast("DummyJSON: user mới tạo sẽ KHÔNG dùng để login được.", { icon: "ℹ️" });
                    }}
                  >
                    Already Have Account?
                  </button>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={registerForm.formState.isSubmitting}
                  className="mt-2 w-full h-[56px] rounded-lg bg-[#EFE7DE] text-gray-900 font-bold flex items-center justify-center gap-3 hover:bg-[#e7dccf] transition disabled:opacity-60"
                >
                  Register Now <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              <p className="text-xs text-gray-500 mt-4">
                * Register dùng API <b>/users/add</b> (theo yêu cầu thầy) — nhưng user mới tạo không login được.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
