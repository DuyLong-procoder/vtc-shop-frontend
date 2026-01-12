import { z } from "zod";

export const checkoutSchema = z.object({
  country: z.string().min(1, "Country is required"),
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postcode: z.string().min(1, "Postcode is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),

  companyName: z.string().optional(),
  apartment: z.string().optional(),
  orderNotes: z.string().optional(),
  createAccount: z.boolean().optional(),
  shipDifferentAddress: z.boolean().optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
