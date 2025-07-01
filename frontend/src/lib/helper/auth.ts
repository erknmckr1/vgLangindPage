import { cookies } from "next/headers";

interface User {
  id: string;
  name: string;
  email: string;
  // diğer alanlar...
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access_token")?.value;

  if (!accessToken) return null;

  try {
    const res = await fetch(`${process.env.INTERNAL_API_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
      credentials: "include", // SSR'da güvenli cookie erişimi için
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("SSR me fetch error:", err);
    return null;
  }
}
