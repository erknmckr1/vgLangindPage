"use client";
import axios from "../../lib/axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import {
  HomeIcon,
  PackageIcon,
  SettingsIcon,
  ChartNoAxesCombined,
  CornerUpLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function SidebarDashboard() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        console.log("Logout successful:", response.data.message);
        router.push("/signin");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sidebarItems = [
    {
      label: "Ana Sayfa",
      href: "/dashboard/home",
      icon: <HomeIcon className="w-5 h-5" />,
    },
    {
      label: "Ürün Yönetimi",
      href: "/dashboard/products",
      icon: <PackageIcon className="w-5 h-5" />,
    },
    {
      label: "Siparişler",
      href: "/dashboard/orders",
      icon: <PackageIcon className="w-5 h-5 rotate-90" />,
    },
    {
      label: "Tahsilatlar",
      href: "/dashboard/payments",
      icon: <ChartNoAxesCombined className="w-5 h-5" />,
    },
    {
      label: "Kargo Takibi",
      href: "/dashboard/shipping",
      icon: <PackageIcon className="w-5 h-5" />,
    },
    {
      label: "Vega Analitik",
      href: "/dashboard/analytics",
      icon: <ChartNoAxesCombined className="w-5 h-5" />,
    },
    {
      label: "AI Asistan",
      href: "/dashboard/assistant",
      icon: <SettingsIcon className="w-5 h-5" />,
    },
    {
      label: "Ayarlar",
      href: "/dashboard/settings",
      icon: <SettingsIcon className="w-5 h-5" />,
    },
    {
      label: "Çıkış Yap",
      href: "/logout",
      icon: <CornerUpLeft className="w-5 h-5" />,
      onClick: logout,
    },
  ];
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-full border-r bg-muted text-muted-foreground transition-all duration-300",
        "w-[72px] lg:w-[240px] p-4",
      )}
    >
      <nav className="flex flex-col gap-2 items-center lg:items-start">
        <div className="w-10 h-10 bg-black rounded-full mb-4" />

        {/* Kullanıcı adı - sadece geniş ekranlarda görünür */}
        <span className="text-sm font-medium hidden lg:inline mb-4">
          Erkan Mustafa Çakir
        </span>

        {/* Menü */}
        {sidebarItems.map((item) =>
          item.label === "Çıkış Yap" ? (
            <button
              key={item.href}
              onClick={item.onClick}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200 text-sm w-full justify-center lg:justify-start hover:bg-primary/10 hover:text-primary",
              )}
            >
              {item.icon}
              <span className="hidden lg:inline">{item.label}</span>
            </button>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200 text-sm w-full justify-center lg:justify-start hover:bg-primary/10 hover:text-primary",
                pathname === item.href && "bg-accent text-primary font-medium",
              )}
              onClick={() => {
                item.onClick?.();
                console.log(`Navigating to: ${item.href}`);
              }}
            >
              {item.icon}
              <span className="hidden lg:inline">{item.label}</span>
            </Link>
          ),
        )}
      </nav>
    </aside>
  );
}
