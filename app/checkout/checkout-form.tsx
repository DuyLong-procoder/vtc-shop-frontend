'use client';

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, CheckoutInput } from "@/lib/validations/checkout.schema";
import OrderSummary from "./order-summary";
import { useRouter } from "next/navigation";

export default function CheckoutForm() {
  const router = useRouter();

  const methods = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    shouldFocusError: true,
    defaultValues: {
      country: "United States",
      firstName: "",
      lastName: "",
      companyName: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      postcode: "",
      email: "",
      phone: "",
      orderNotes: "",
      createAccount: false,
      shipDifferentAddress: false,
    }
  });

  const { formState: { errors } } = methods;

  const onSubmit = (data: CheckoutInput) => {
    // 1. Thông báo thành công
    alert("Thanh toán thành công! Đơn hàng của bạn đã được tiếp nhận.");

    // 2. Làm sạch giỏ hàng
    localStorage.removeItem('cart');
    localStorage.removeItem('cart-storage');
    localStorage.removeItem('shopping-cart');
    
    // Thông báo cho các component khác (như Header) cập nhật lại số lượng 0
    window.dispatchEvent(new Event("storage"));

    // 3. Chuyển về trang chủ
    window.location.href = "/";
  };

  return (
    <FormProvider {...methods}>
      <form
        id="checkoutForm"
        onSubmit={methods.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-[1400px] mx-auto py-16 px-4"
      >
        {/* LEFT COLUMN */}
        <div className="lg:col-span-7 space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-[26px] font-bold text-[#1A1C24]">Billing Details</h2>
          </div>

          <div className="space-y-5">
            {/* COUNTRY */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Country *</label>
              <select
                {...methods.register("country")}
                className={`border p-3.5 rounded-sm bg-white outline-none ${
                  errors.country ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="United States">United States</option>
                <option value="Vietnam">Vietnam</option>
              </select>
              {errors.country && (
                <p className="text-red-500 text-xs italic">{errors.country.message}</p>
              )}
            </div>

            {/* FIRST + LAST NAME */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">First Name *</label>
                <input
                  {...methods.register("firstName")}
                  className={`border p-3.5 rounded-sm outline-none ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs italic">{errors.firstName.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">Last Name *</label>
                <input
                  {...methods.register("lastName")}
                  className={`border p-3.5 rounded-sm outline-none ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs italic">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* ADDRESS */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Address *</label>
              <input
                {...methods.register("address")}
                className={`border p-3.5 rounded-sm outline-none ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-xs italic">{errors.address.message}</p>
              )}
            </div>

            {/* CITY */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">City *</label>
              <input
                {...methods.register("city")}
                className={`border p-3.5 rounded-sm outline-none ${
                  errors.city ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.city && (
                <p className="text-red-500 text-xs italic">{errors.city.message}</p>
              )}
            </div>

            {/* STATE + ZIP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">State *</label>
                <input
                  {...methods.register("state")}
                  className={`border p-3.5 rounded-sm outline-none ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.state && (
                  <p className="text-red-500 text-xs italic">{errors.state.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">Postcode *</label>
                <input
                  {...methods.register("postcode")}
                  className={`border p-3.5 rounded-sm outline-none ${
                    errors.postcode ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.postcode && (
                  <p className="text-red-500 text-xs italic">{errors.postcode.message}</p>
                )}
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Email *</label>
              <input
                {...methods.register("email")}
                className={`border p-3.5 rounded-sm outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email.message}</p>
              )}
            </div>

            {/* PHONE */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Phone *</label>
              <input
                {...methods.register("phone")}
                className={`border p-3.5 rounded-sm outline-none ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs italic">{errors.phone.message}</p>
              )}
            </div>

            {/* OPTIONS */}
            <div className="pt-4 space-y-4">
              <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer group">
                <input type="checkbox" {...methods.register("createAccount")} className="w-4 h-4 rounded border-gray-300 accent-[#C3293E]" />
                <span className="group-hover:text-black transition-colors">Create an account?</span>
              </label>
              
              <label className="flex items-center gap-3 text-[22px] font-bold text-gray-300 cursor-pointer hover:text-black transition-colors">
                Ship to a different address?
                <input type="checkbox" {...methods.register("shipDifferentAddress")} className="w-5 h-5 rounded border-gray-300 accent-[#C3293E]" />
              </label>
            </div>

            {/* NOTES */}
            <div className="flex flex-col gap-2 pt-4">
              <label className="text-sm font-semibold text-gray-700">Order Notes</label>
              <textarea 
                {...methods.register("orderNotes")} 
                placeholder="Notes about your order, e.g. special notes for delivery." 
                className="w-full border border-gray-200 p-3.5 rounded-sm outline-none focus:border-black h-32 resize-none" 
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-5">
          <OrderSummary onPlaceOrder={methods.handleSubmit(onSubmit)} />
        </div>
      </form>
    </FormProvider>
  );
}