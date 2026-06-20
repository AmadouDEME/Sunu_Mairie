"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FileCheck,
  Users,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      name: "Tableau de bord",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Gestion des Demandes",
      path: "/demandes",
      icon: FileText,
    },
    {
      name: "Validation & Signatures",
      path: "/signatures",
      icon: FileCheck,
    },
    {
      name: "Citoyens",
      path: "/citoyens",
      icon: Users,
    },
    {
      name: "Paramètres",
      path: "/parametres",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    // In a real app, clear tokens here
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(4px)",
            zIndex: 40,
          }}
        />
      )}

      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.logoContainer}>
          <Image
            src="/logo.jpg"
            alt="Sunu Mairie Logo"
            width={44}
            height={44}
            className={styles.logo}
            priority
          />
          <span className={styles.brandName}>Sunu Mairie</span>
          <button
            onClick={onClose}
            className="lg:hidden ml-auto p-1 text-slate-500 hover:text-slate-800"
            style={{
              marginLeft: "auto",
              padding: "4px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Fermer le menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className={styles.nav}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path || pathname?.startsWith(item.path + "/");
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={onClose}
                className={`${styles.navItem} ${
                  isActive ? styles.navItemActive : ""
                }`}
              >
                <Icon className={styles.icon} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.footer}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <LogOut className={styles.icon} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  );
}
