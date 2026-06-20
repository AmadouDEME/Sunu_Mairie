"use client";

import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styles from "./Charts.module.css";

// --- HELPERS ---
function SafeChart({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text-muted)",
          fontSize: "0.85rem",
        }}>
        Chargement du graphique...
      </div>
    );
  }

  return <>{children}</>;
}

// Custom Tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipLabel}>{label || payload[0].name}</p>
        <p className={styles.tooltipVal}>
          {payload[0].value.toLocaleString()}
          {payload[0].unit ? ` ${payload[0].unit}` : " demandes"}
        </p>
      </div>
    );
  }
  return null;
};

// --- 1. STATUT DONUT CHART ---
export function StatutDonutChart() {
  const data = [
    { name: "Rejeté", value: 270, color: "var(--danger)" },
    { name: "Approuvé", value: 247, color: "var(--primary)" },
    { name: "Prêt", value: 246, color: "var(--success)" },
    { name: "En attente", value: 237, color: "var(--warning)" },
  ];

  return (
    <div className={`${styles.chartCard} ${styles.col4} glassmorphism`}>
      <div className={styles.chartHeader}>
        <div>
          <h3 className={styles.chartTitle}>Démarche par Statut</h3>
          <p className={styles.chartSubtitle}>
            Répartition globale des demandes
          </p>
        </div>
      </div>
      <div className={styles.chartWrapper}>
        <SafeChart>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  fontSize: "0.8rem",
                  color: "var(--text-secondary)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </SafeChart>
      </div>
    </div>
  );
}

// --- 2. REPARTITION PAR REGION ---
export function RegionBarChart() {
  const data = [
    { name: "Grand Dakar", value: 254 },
    { name: "Kedougou", value: 252 },
    { name: "Grand Yoff", value: 251 },
    { name: "Keur Massar", value: 243 },
  ];

  return (
    <div className={`${styles.chartCard} ${styles.col4} glassmorphism`}>
      <div className={styles.chartHeader}>
        <div>
          <h3 className={styles.chartTitle}>Répartition par Commune</h3>
          <p className={styles.chartSubtitle}>
            Nombre de demandes par localité
          </p>
        </div>
      </div>
      <div className={styles.chartWrapper}>
        <SafeChart>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
                horizontal={true}
                vertical={false}
              />
              <XAxis type="number" stroke="var(--text-muted)" fontSize={11} />
              <YAxis
                dataKey="name"
                type="category"
                stroke="var(--text-muted)"
                fontSize={11}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                fill="var(--primary)"
                radius={[0, 4, 4, 0]}
                barSize={16}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`url(#regionGrad)`} />
                ))}
              </Bar>
              <defs>
                <linearGradient id="regionGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop
                    offset="0%"
                    stopColor="var(--primary)"
                    stopOpacity={0.7}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--primary)"
                    stopOpacity={1}
                  />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </SafeChart>
      </div>
    </div>
  );
}

// --- 3. DEMARCHE PAR TYPE ---
export function DemarcheTypeBarChart() {
  const data = [
    { name: "Acte Naissance", value: 452 },
    { name: "Signalement", value: 382 },
    { name: "Certif. Mariage", value: 246 },
    { name: "Certif. Décès", value: 189 },
    { name: "Occupation", value: 124 },
  ];

  return (
    <div className={`${styles.chartCard} ${styles.col4} glassmorphism`}>
      <div className={styles.chartHeader}>
        <div>
          <h3 className={styles.chartTitle}>Démarche par Type</h3>
          <p className={styles.chartSubtitle}>Types de documents demandés</p>
        </div>
      </div>
      <div className={styles.chartWrapper}>
        <SafeChart>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
                horizontal={true}
                vertical={false}
              />
              <XAxis type="number" stroke="var(--text-muted)" fontSize={11} />
              <YAxis
                dataKey="name"
                type="category"
                stroke="var(--text-muted)"
                fontSize={10}
                width={90}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                fill="var(--success)"
                radius={[0, 4, 4, 0]}
                barSize={14}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`url(#typeGrad)`} />
                ))}
              </Bar>
              <defs>
                <linearGradient id="typeGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop
                    offset="0%"
                    stopColor="var(--success)"
                    stopOpacity={0.7}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--success)"
                    stopOpacity={1}
                  />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </SafeChart>
      </div>
    </div>
  );
}

// --- 4. REPARTITION PAR MODE DE PAIEMENT ---
export function PaymentPieChart() {
  const data = [
    { name: "Wave", value: 395, color: "#1e3a8a" }, // Deep blue
    { name: "Orange Money", value: 362, color: "#ea580c" }, // Orange
    { name: "Free Money", value: 198, color: "#dc2626" }, // Red
    { name: "Espèces", value: 135, color: "#16a34a" }, // Green
    { name: "Wari / Wafacash", value: 92, color: "#8b5cf6" }, // Purple
  ];

  return (
    <div className={`${styles.chartCard} ${styles.col4} glassmorphism`}>
      <div className={styles.chartHeader}>
        <div>
          <h3 className={styles.chartTitle}>Mode de Paiement</h3>
          <p className={styles.chartSubtitle}>Canaux financiers utilisés</p>
        </div>
      </div>
      <div className={styles.chartWrapper}>
        <SafeChart>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={75}
                paddingAngle={2}
                dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="square"
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  fontSize: "0.75rem",
                  color: "var(--text-secondary)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </SafeChart>
      </div>
    </div>
  );
}

// --- 5. DEMANDE PAR TRANCHE D'AGE ---
export function AgeBarChart() {
  const data = [
    { name: "18-25 ans", value: 195 },
    { name: "26-35 ans", value: 247 },
    { name: "36-50 ans", value: 232 },
    { name: "51-65 ans", value: 168 },
    { name: "65 ans +", value: 98 },
  ];

  return (
    <div className={`${styles.chartCard} ${styles.col4} glassmorphism`}>
      <div className={styles.chartHeader}>
        <div>
          <h3 className={styles.chartTitle}>Demandes par Tranche d'Âge</h3>
          <p className={styles.chartSubtitle}>
            Démographie des citoyens demandeurs
          </p>
        </div>
      </div>
      <div className={styles.chartWrapper}>
        <SafeChart>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
                vertical={false}
              />
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} />
              <YAxis stroke="var(--text-muted)" fontSize={11} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                fill="var(--info)"
                radius={[4, 4, 0, 0]}
                barSize={24}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`url(#ageGrad)`} />
                ))}
              </Bar>
              <defs>
                <linearGradient id="ageGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--info)" stopOpacity={1} />
                  <stop
                    offset="100%"
                    stopColor="var(--info)"
                    stopOpacity={0.7}
                  />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </SafeChart>
      </div>
    </div>
  );
}

// --- 6. DEMARCHE MENSUELLE ---
export function MonthlyLineChart() {
  const data = [
    { name: "Jan", value: 180 },
    { name: "Fév", value: 142 },
    { name: "Mar", value: 215 },
    { name: "Avr", value: 175 },
    { name: "Mai", value: 260 },
    { name: "Juin", value: 247 },
  ];

  return (
    <div className={`${styles.chartCard} ${styles.col4} glassmorphism`}>
      <div className={styles.chartHeader}>
        <div>
          <h3 className={styles.chartTitle}>Démarches Mensuelles</h3>
          <p className={styles.chartSubtitle}>
            Évolution des requêtes sur 6 mois
          </p>
        </div>
      </div>
      <div className={styles.chartWrapper}>
        <SafeChart>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 15, left: -20, bottom: 5 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
                vertical={false}
              />
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} />
              <YAxis stroke="var(--text-muted)" fontSize={11} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--primary)"
                strokeWidth={3}
                activeDot={{ r: 6 }}
                dot={{
                  r: 4,
                  stroke: "var(--primary)",
                  strokeWidth: 2,
                  fill: "var(--sidebar-bg)",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </SafeChart>
      </div>
    </div>
  );
}
