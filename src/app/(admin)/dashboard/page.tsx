"use client";

import React, { useState } from "react";
import {
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FilterX,
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import {
  StatutDonutChart,
  RegionBarChart,
  DemarcheTypeBarChart,
  PaymentPieChart,
  AgeBarChart,
  MonthlyLineChart,
} from "@/components/dashboard/Charts";
import chartStyles from "@/components/dashboard/Charts.module.css";
import styles from "./Dashboard.module.css";

export default function DashboardPage() {
  // Filter States
  const [region, setRegion] = useState("all");
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");

  const resetFilters = () => {
    setRegion("all");
    setStatus("all");
    setType("all");
  };

  // Mock Date for Header
  const currentDate = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.container}>
      {/* Title Header */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Vue d'ensemble</h1>
          <p className={styles.subtitle}>Statistiques en temps réel et performances de la mairie</p>
        </div>
        <div className={styles.dateDisplay}>
          <Calendar size={16} />
          <span>{currentDate}</span>
        </div>
      </div>

      {/* Filter Panel */}
      <div className={`${styles.filterPanel} glassmorphism`}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Région</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className={styles.select}
          >
            <option value="all">Toutes les régions</option>
            <option value="dakar">Dakar</option>
            <option value="kedougou">Kédougou</option>
            <option value="matam">Matam</option>
            <option value="saint-louis">Saint-Louis</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Statut</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={styles.select}
          >
            <option value="all">Tous les statuts</option>
            <option value="attente">En attente</option>
            <option value="approuve">Approuvé</option>
            <option value="pret">Prêt</option>
            <option value="rejete">Rejeté</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Type de démarche</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={styles.select}
          >
            <option value="all">Toutes les démarches</option>
            <option value="naissance">Acte de naissance</option>
            <option value="mariage">Certificat de mariage</option>
            <option value="deces">Certificat de décès</option>
            <option value="signalement">Signalement</option>
            <option value="occupation">Occupation</option>
          </select>
        </div>

        {(region !== "all" || status !== "all" || type !== "all") && (
          <button onClick={resetFilters} className={styles.btnReset}>
            <FilterX size={16} />
            <span>Réinitialiser</span>
          </button>
        )}
      </div>

      {/* KPI Cards Row */}
      <div className={styles.statsGrid}>
        <StatCard
          label="Montant FCFA"
          value="15 240 000 ₣"
          icon={DollarSign}
          trend="+14.2%"
          trendType="up"
          color="success"
        />
        <StatCard
          label="Approuvé"
          value="247"
          icon={Clock}
          trend="+8%"
          trendType="up"
          color="primary"
        />
        <StatCard
          label="Prêt"
          value="246"
          icon={CheckCircle}
          trend="+18.4%"
          trendType="up"
          color="info"
        />
        <StatCard
          label="Rejeté"
          value="270"
          icon={XCircle}
          trend="-2.1%"
          trendType="down"
          color="danger"
        />
        <StatCard
          label="En attente"
          value="237"
          icon={AlertCircle}
          trend="+4.3%"
          trendType="up"
          color="warning"
        />
      </div>

      {/* Charts section matching PowerBI layout */}
      <div className={chartStyles.chartGrid}>
        {/* Row 1: Donut, Region bar, Type bar */}
        <StatutDonutChart />
        <RegionBarChart />
        <DemarcheTypeBarChart />

        {/* Row 2: Payment pie, Age bar, Monthly line */}
        <PaymentPieChart />
        <AgeBarChart />
        <MonthlyLineChart />
      </div>
    </div>
  );
}
