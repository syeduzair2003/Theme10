"use server";
import { apiSubscribeNewsletter } from "@/apis/page_optimization";
interface SubscribeResponse {
  success: boolean;
  message?: string | null;
}
export async function subscribeNewsLetter(
  company_id: string,
  formData: FormData
): Promise<SubscribeResponse> {
  const email = formData.get("email") as string;
  if (!email) {
    throw new Error("Email is required");
  }
  try {
    const response = await apiSubscribeNewsletter(company_id, email);
    const isSuccess =
      response?.status === true || response?.status === "true";
    if (isSuccess) {
      console.log("Subscribed successfully:", email);
      return { success: true, message: response?.message };
    } else {
      console.error("Newsletter subscription failed:", response);
      return { success: false, message: response?.message };
    }
  } catch (err: any) {
    console.error("Newsletter subscription failed:", err);
    return { success: false, message: err?.message || "Server error" };
  }
}