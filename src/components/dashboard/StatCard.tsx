"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import styles from "./StatCard.module.css";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  trendType: "up" | "down" | "neutral";
  color: "primary" | "success" | "warning" | "danger" | "info";
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendType,
  color,
}: StatCardProps) {
  // Map color prop to CSS variables or inline styles
  const colorMap = {
    primary: {
      bg: "var(--primary-light)",
      text: "var(--primary)",
      glow: "var(--primary)",
    },
    success: {
      bg: "var(--success-light)",
      text: "var(--success)",
      glow: "var(--success)",
    },
    warning: {
      bg: "var(--warning-light)",
      text: "var(--warning)",
      glow: "var(--warning)",
    },
    danger: {
      bg: "var(--danger-light)",
      text: "var(--danger)",
      glow: "var(--danger)",
    },
    info: {
      bg: "var(--info-light)",
      text: "var(--info)",
      glow: "var(--info)",
    },
  };

  const currentColors = colorMap[color];

  return (
    <div className={`${styles.card} glassmorphism`}>
      {/* Background Glow */}
      <div
        className={styles.cardGlow}
        style={{ backgroundColor: currentColors.glow }}
      />

      <div
        className={styles.iconWrapper}
        style={{
          backgroundColor: currentColors.bg,
          color: currentColors.text,
        }}
      >
        <Icon size={24} />
      </div>

      <div className={styles.info}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
        <div className={styles.footer}>
          <span
            className={
              trendType === "up"
                ? styles.trendUp
                : trendType === "down"
                ? styles.trendDown
                : styles.trendFlat
            }
          >
            {trend}
          </span>
          <span style={{ color: "var(--text-muted)" }}>par rapport au mois dernier</span>
        </div>
      </div>
    </div>
  );
}
