import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Vui lòng nhập username"),
  password: z.string().min(1, "Vui lòng nhập password"),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "Vui lòng nhập First name"),
    lastName: z.string().min(1, "Vui lòng nhập Last name"),
    username: z.string().min(3, "Username tối thiểu 3 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Password tối thiểu 6 ký tự"),
    gender: z.enum(["male", "female"], { message: "Vui lòng chọn giới tính" }),
    confirmPassword: z.string().min(6, "Xác nhận password tối thiểu 6 ký tự"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password không khớp",
    path: ["confirmPassword"],
  });

export type RegisterValues = z.infer<typeof registerSchema>;
