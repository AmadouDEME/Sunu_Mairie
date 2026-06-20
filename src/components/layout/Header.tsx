"use client";

import { useTheme } from "@/context/ThemeContext";
import { Bell, Menu, Moon, Search, Sun } from "lucide-react";
import styles from "./Header.module.css";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <button
            onClick={onMenuClick}
            className={styles.menuButton}
            aria-label="Ouvrir le menu">
            <Menu size={24} />
          </button>

          <div className={styles.searchBar}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Rechercher une demande, un citoyen..."
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.actions}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={styles.iconBtn}
            aria-label="Changer de thème"
            title="Changer de thème">
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Notifications */}
          <button
            className={styles.iconBtn}
            aria-label="Notifications"
            title="Notifications">
            <Bell size={20} />
            <span className={styles.badge} />
          </button>

          {/* User Profile */}
          <div className={styles.profile}>
            <div className={styles.avatar}>AD</div>
            <div className={styles.profileInfo}>
              <span className={styles.adminName}>Admin Grand Dakar</span>
              <span className={styles.adminRole}>Super Administrateur</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
