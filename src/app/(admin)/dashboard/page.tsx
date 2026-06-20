"use client";

import {
  AgeBarChart,
  DemarcheTypeBarChart,
  MonthlyLineChart,
  PaymentPieChart,
  StatutDonutChart,
} from "@/components/dashboard/Charts";
import chartStyles from "@/components/dashboard/Charts.module.css";
import StatCard from "@/components/dashboard/StatCard";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  XCircle,
} from "lucide-react";
import styles from "./Dashboard.module.css";

export default function DashboardPage() {

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
          <p className={styles.subtitle}>
            Statistiques en temps réel et performances de la mairie
          </p>
        </div>
        <div className={styles.dateDisplay}>
          <Calendar size={16} />
          <span>{currentDate}</span>
        </div>
      </div>
      {/* KPI Cards Row */}
      <div className={styles.statsGrid}>
        <StatCard
          label="Montant FCFA"
          value="0.00 FCFA"
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
        <DemarcheTypeBarChart />

        {/* Row 2: Payment pie, Age bar, Monthly line */}
        <PaymentPieChart />
        <AgeBarChart />
        <MonthlyLineChart />
      </div>
    </div>
  );
}
