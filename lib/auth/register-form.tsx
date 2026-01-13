"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { registerSchema, type RegisterValues } from "@/lib/auth/auth-schemas";
import { apiRegister } from "@/lib/auth/auth-api";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { gender: "male" },
    mode: "onBlur",
  });

  const onSubmit = async (values: RegisterValues) => {
    try {
      await apiRegister(values);
      toast.success("Register success! (Theo đề: đăng ký xong không login được)");
    } catch (err: any) {
      toast.error(err?.message || "Register failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <input
            className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#C3293E]/20"
            placeholder="First name"
            {...register("firstName")}
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
        </div>
        <div>
          <input
            className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#C3293E]/20"
            placeholder="Last name"
            {...register("lastName")}
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
        </div>
      </div>

      <div>
        <input
          className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#C3293E]/20"
          placeholder="Username"
          {...register("username")}
        />
        {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
      </div>

      <div>
        <input
          className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#C3293E]/20"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <select
          className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#C3293E]/20"
          {...register("gender")}
        >
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>}
      </div>

      <div>
        <input
          type="password"
          className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#C3293E]/20"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
      </div>

      <div>
        <input
          type="password"
          className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#C3293E]/20"
          placeholder="Confirm password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        disabled={isSubmitting}
        className="w-full rounded-lg bg-gray-100 py-3 font-bold text-black hover:bg-gray-200 transition disabled:opacity-60"
      >
        {isSubmitting ? "Registering..." : "Register Now"}
      </button>
    </form>
  );
}
