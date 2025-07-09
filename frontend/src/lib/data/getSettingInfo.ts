// lib/services/getSettingsInfo.ts
import { cookies } from "next/headers";

export async function getSettingsInfo() {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return null;

  const [userInfo, billingInfo, storeProfile, themeInfo] = await Promise.all([
    fetch(`${process.env.INTERNAL_USER_API_URL}/users/user-info`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    fetch(`${process.env.INTERNAL_USER_API_URL}/billing-info`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    fetch(`${process.env.INTERNAL_USER_API_URL}/store-profile`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    fetch(`${process.env.INTERNAL_USER_API_URL}/theme`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  ]);

  if (
    ![userInfo.ok, billingInfo.ok, storeProfile.ok, themeInfo.ok].every(Boolean)
  ) {
    console.error("At least one settings fetch failed");
    return null;
  }

  return {
    userInfo: await userInfo.json(),
    billingInfo: await billingInfo.json(),
    storeProfile: await storeProfile.json(),
    themeInfo: await themeInfo.json(),
  };
}
