import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  MoonIcon,
  SunIcon,
  LanguageIcon,
  Bars3Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  ArrowDownTrayIcon,
  InboxStackIcon,
  UsersIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
// Import package.json for dynamic version in footer
// Vite supports JSON imports
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pkg from "../package.json";
import Dashboard from "./pages/Dashboard";
import PRImport from "./pages/PRImport";
import RFQList from "./pages/RFQList";
import SupplierResponses from "./pages/SupplierResponses";
import PriceComparison from "./pages/PriceComparison";
import Suppliers from "./pages/Suppliers";
import Items from "./pages/Items";
import Categories from "./pages/Categories";
import SupplierPortalRFQs from "./pages/supplier/PortalRFQs";
import SupplierPortalRFQDetail from "./pages/supplier/PortalRFQDetail";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  section?: string;
}

const navItems = (t: any): NavItem[] => [
  {
    path: "/",
    label: t("navigation.dashboard"),
    icon: <HomeIcon className="w-5 h-5" />,
  },
  {
    path: "/pr-import",
    label: t("navigation.prImport"),
    icon: <ArrowDownTrayIcon className="w-5 h-5" />,
  },
  {
    path: "/rfqs",
    label: t("navigation.rfq"),
    icon: <InboxStackIcon className="w-5 h-5" />,
  },
  {
    path: "/responses",
    label: t("navigation.supplierResponses"),
    icon: <InboxStackIcon className="w-5 h-5" />,
  },
  {
    path: "/comparison",
    label: t("navigation.priceComparison"),
    icon: <Squares2X2Icon className="w-5 h-5" />,
  },
  {
    path: "/suppliers",
    label: t("navigation.suppliers"),
    icon: <UsersIcon className="w-5 h-5" />,
    section: t("navigation.masterData"),
  },
  {
    path: "/items",
    label: t("navigation.items"),
    icon: <Squares2X2Icon className="w-5 h-5" />,
  },
  {
    path: "/categories",
    label: t("navigation.categories"),
    icon: <Squares2X2Icon className="w-5 h-5" />,
  },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  "group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors " +
  (isActive
    ? "bg-brand-600 text-white shadow-inner"
    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700");

export default function App() {
  const { t, i18n } = useTranslation();
  const [dark, setDark] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem("ui:sidebar-collapsed") === "1";
    } catch {
      return false;
    }
  });
  const [role, setRole] = useState<"buyer" | "supplier">(() => {
    try {
      return (
        (localStorage.getItem("ui:role") as "buyer" | "supplier") || "buyer"
      );
    } catch {
      return "buyer";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("ui:theme", dark ? "dark" : "light");
    } catch {}
  }, [dark]);

  // restore theme
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ui:theme");
      if (saved === "dark") setDark(true);
    } catch {}
  }, []);

  // persist collapse state
  useEffect(() => {
    try {
      localStorage.setItem("ui:sidebar-collapsed", collapsed ? "1" : "0");
    } catch {}
  }, [collapsed]);
  useEffect(() => {
    try {
      localStorage.setItem("ui:role", role);
    } catch {}
  }, [role]);

  const toggleCollapse = useCallback(() => setCollapsed((c) => !c), []);

  // accessibility shortcut: press 'c' to toggle sidebar
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "c" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleCollapse();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [toggleCollapse]);

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "en" ? "th" : "en");
  };

  const items: NavItem[] =
    role === "buyer"
      ? navItems(t)
      : [
          {
            path: "/portal/rfqs",
            label: "My RFQs",
            icon: <InboxStackIcon className="w-5 h-5" />,
          },
        ];
  let lastSection: string | undefined;
  return (
    <div className="min-h-screen flex flex-col">
      {/* Topbar */}
      <header className="h-14 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur z-20 supports-[backdrop-filter]:backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleCollapse}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-pressed={collapsed}
          >
            {collapsed ? (
              <ChevronRightIcon className="w-5 h-5" />
            ) : (
              <ChevronLeftIcon className="w-5 h-5" />
            )}
          </button>
          <span className="font-semibold text-brand-600 hidden sm:inline">
            {t("appName")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDark((d) => !d)}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
          >
            {dark ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={toggleLang}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle language"
          >
            <LanguageIcon className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 pl-3 ml-2 border-l border-gray-200 dark:border-gray-700">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-xs font-bold">
              {role === "buyer" ? "PU" : "SP"}
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-medium">
                {role === "buyer" ? "Purchasing User" : "Supplier User"}
              </span>
              <span className="text-[10px] uppercase text-gray-500 dark:text-gray-400">
                ROLE: {role.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="hidden md:block ml-3">
            <select
              aria-label="Role switcher"
              value={role}
              onChange={(e) => setRole(e.target.value as "buyer" | "supplier")}
              className="text-xs bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brand-500"
            >
              <option value="buyer">Buyer</option>
              <option value="supplier">Supplier</option>
            </select>
          </div>
        </div>
      </header>
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside
          className={
            (collapsed ? "w-16" : "w-60") +
            " transition-all duration-300 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col overflow-y-auto"
          }
        >
          <nav
            className="flex-1 py-3 space-y-1 px-2"
            aria-label="Main navigation"
          >
            {items.map((item) => {
              const section = (item as NavItem).section;
              const sectionHeader =
                section && section !== lastSection ? section : undefined;
              if (sectionHeader) lastSection = section;
              return (
                <React.Fragment key={item.path}>
                  {sectionHeader && (
                    <div
                      className={
                        (collapsed ? "text-[10px] text-center" : "px-3") +
                        " pt-3 pb-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase"
                      }
                    >
                      {sectionHeader}
                    </div>
                  )}
                  <NavLink
                    to={item.path}
                    end={item.path === "/"}
                    className={navLinkClass}
                    title={collapsed ? item.label : undefined}
                  >
                    {item.icon}
                    {!collapsed && <span>{item.label}</span>}
                  </NavLink>
                </React.Fragment>
              );
            })}
          </nav>
        </aside>
        {/* Main content area */}
        <main className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <Routes>
              {role === "buyer" && (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/pr-import" element={<PRImport />} />
                  <Route path="/rfqs" element={<RFQList />} />
                  <Route path="/responses" element={<SupplierResponses />} />
                  <Route path="/comparison" element={<PriceComparison />} />
                  <Route path="/suppliers" element={<Suppliers />} />
                  <Route path="/items" element={<Items />} />
                  <Route path="/categories" element={<Categories />} />
                </>
              )}
              {role === "supplier" && (
                <>
                  <Route path="/" element={<SupplierPortalRFQs />} />
                  <Route path="/portal/rfqs" element={<SupplierPortalRFQs />} />
                  <Route
                    path="/portal/rfqs/:id"
                    element={<SupplierPortalRFQDetail />}
                  />
                </>
              )}
            </Routes>
          </div>
          <footer className="h-10 flex items-center justify-between px-4 text-xs bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <span className="text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Procurement Portal Mockups
            </span>
            <span className="text-gray-400 hidden sm:inline">
              v{pkg.version}
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
}
