"use client";

import React, { useState } from "react";
import styles from "./Parametres.module.css";

// Mock Administrators list
const INITIAL_ADMINS = [
  {
    id: "ADM-001",
    name: "Admin Keur Massar",
    email: "admin@sunumairie.sn",
    role: "Super Administrateur",
    roleClass: styles.roleSuper,
    status: "Actif",
  },
  {
    id: "ADM-002",
    name: "Modou Diagne",
    email: "m.diagne@sunumairie.sn",
    role: "Chef d'État-Civil",
    roleClass: styles.roleChef,
    status: "Actif",
  },
  {
    id: "ADM-003",
    name: "Fatoumata Badiane",
    email: "f.badiane@sunumairie.sn",
    role: "Agent de validation",
    roleClass: styles.roleAgent,
    status: "Actif",
  },
];

export default function ParametresPage() {
  const [activeTab, setActiveTab] = useState("tarifs");
  const [saveLoading, setSaveLoading] = useState(false);

  // Pricing inputs
  const [prices, setPrices] = useState({
    naissance: "1000",
    mariage: "3000",
    deces: "1000",
    occupation: "25000",
    signalement: "0",
  });

  // Payment keys inputs
  const [waveKey, setWaveKey] = useState("wv_live_5af2e10c9b4e82dcf...");
  const [orangeMoneyMerchant, setOrangeMoneyMerchant] =
    useState("OM_MERCH_724018");
  const [freeMoneyKey, setFreeMoneyKey] = useState("fm_sec_8bf09a12c8e3100...");
  const [sandboxMode, setSandboxMode] = useState(true);

  const handlePriceChange = (key: string, val: string) => {
    setPrices((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);

    setTimeout(() => {
      setSaveLoading(false);
      alert("Paramètres enregistrés avec succès !");
    }, 800);
  };

  return (
    <div className={styles.container}>
      {/* Title */}
      <div className={styles.titleSection}>
        <h1 className={styles.title}>Paramètres</h1>
        <p className={styles.subtitle}>
          Configurez les tarifs, gérez les administrateurs et modifiez les clés
          de paiement Wave et Orange Money.
        </p>
      </div>

      {/* Tabs navigation */}
      <div className={styles.tabsList}>
        <button
          onClick={() => setActiveTab("tarifs")}
          className={`${styles.tabBtn} ${activeTab === "tarifs" ? styles.tabBtnActive : ""}`}>
          Tarifs des démarches
        </button>
        <button
          onClick={() => setActiveTab("admins")}
          className={`${styles.tabBtn} ${activeTab === "admins" ? styles.tabBtnActive : ""}`}>
          Administrateurs & Rôles
        </button>
        <button
          onClick={() => setActiveTab("paiement")}
          className={`${styles.tabBtn} ${activeTab === "paiement" ? styles.tabBtnActive : ""}`}>
          Passerelles de paiement
        </button>
      </div>

      {/* TAB 1: PRICING */}
      {activeTab === "tarifs" && (
        <form onSubmit={handleSave} className={`${styles.panel} glassmorphism`}>
          <h2 className={styles.panelTitle}>
            Tarification des documents administratifs
          </h2>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Acte de naissance</label>
              <div className={styles.inputWrapper}>
                <input title="Coût en FCFA"
                  type="number"
                  value={prices.naissance}
                  onChange={(e) =>
                    handlePriceChange("naissance", e.target.value)
                  }
                  className={styles.input}
                  required
                />
                <span className={styles.currencySuffix}>FCFA</span>
              </div>
              <span className={styles.helpText}>
                Coût appliqué pour la délivrance d'une copie littérale.
              </span>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Certificat de mariage</label>
              <div className={styles.inputWrapper}>
                <input
                  type="number"
                  value={prices.mariage}
                  onChange={(e) => handlePriceChange("mariage", e.target.value)}
                  className={styles.input}
                  required
                />
                <span className={styles.currencySuffix}>FCFA</span>
              </div>
              <span className={styles.helpText}>
                Frais d'établissement du certificat de mariage.
              </span>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Certificat de décès</label>
              <div className={styles.inputWrapper}>
                <input
                  type="number"
                  value={prices.deces}
                  onChange={(e) => handlePriceChange("deces", e.target.value)}
                  className={styles.input}
                  required
                />
                <span className={styles.currencySuffix}>FCFA</span>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Signalement</label>
              <div className={styles.inputWrapper}>
                <input
                  type="number"
                  value={prices.signalement}
                  onChange={(e) =>
                    handlePriceChange("signalement", e.target.value)
                  }
                  className={styles.input}
                  required
                />
                <span className={styles.currencySuffix}>FCFA</span>
              </div>
              <span className={styles.helpText}>
                Frais de dépôt ou gratuité (0 FCFA) pour le traitement des
                signalements.
              </span>
            </div>

            <div className={styles.formGroup} style={{ gridColumn: "span 2" }}>
              <label className={styles.label}>Occupation d'espace public</label>
              <div className={styles.inputWrapper}>
                <input
                  type="number"
                  value={prices.occupation}
                  onChange={(e) =>
                    handlePriceChange("occupation", e.target.value)
                  }
                  className={styles.input}
                  required
                />
                <span className={styles.currencySuffix}>FCFA</span>
              </div>
              <span className={styles.helpText}>
                Frais de dossier pour l'occupation temporaire du domaine public
                (kiosque, terrasse, terrasse de café, etc.).
              </span>
            </div>
          </div>

          <div className={styles.footer}>
            <button
              type="submit"
              className={styles.btnSave}
              disabled={saveLoading}>
              {saveLoading
                ? "Enregistrement..."
                : "Enregistrer les modifications"}
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: ADMINS LIST */}
      {activeTab === "admins" && (
        <div className={`${styles.panel} glassmorphism`}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid var(--border)",
              paddingBottom: 12,
            }}>
            <h2
              className={styles.panelTitle}
              style={{ border: "none", padding: 0, margin: 0 }}>
              Administrateurs du système
            </h2>
            <button
              onClick={() => alert("Ajouter un administrateur (Simulé)")}
              className={styles.btnSave}
              style={{ padding: "8px 16px", fontSize: "0.85rem" }}>
              Créer un profil
            </button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th className={styles.th} style={{ textAlign: "left" }}>
                    ID
                  </th>
                  <th className={styles.th} style={{ textAlign: "left" }}>
                    Nom complet
                  </th>
                  <th className={styles.th} style={{ textAlign: "left" }}>
                    Email
                  </th>
                  <th className={styles.th} style={{ textAlign: "left" }}>
                    Rôle
                  </th>
                  <th className={styles.th} style={{ textAlign: "left" }}>
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody>
                {INITIAL_ADMINS.map((admin) => (
                  <tr key={admin.id}>
                    <td className={styles.td} style={{ fontWeight: 600 }}>
                      {admin.id}
                    </td>
                    <td className={styles.td}>{admin.name}</td>
                    <td className={styles.td}>{admin.email}</td>
                    <td className={styles.td}>
                      <span
                        className={`${styles.roleBadge} ${admin.roleClass}`}>
                        {admin.role}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <span
                        style={{
                          color: "var(--success-text)",
                          fontWeight: 600,
                        }}>
                        {admin.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PAYMENT GATEWAYS */}
      {activeTab === "paiement" && (
        <form onSubmit={handleSave} className={`${styles.panel} glassmorphism`}>
          <h2 className={styles.panelTitle}>Clés API pour Mobile Money</h2>

          <div className={styles.formGroup} style={{ marginBottom: 10 }}>
            <div className={styles.switchContainer}>
              <div className={styles.switchText}>
                <span className={styles.switchTitle}>Mode Test (Sandbox)</span>
                <span className={styles.helpText}>
                  Activer cette option pour simuler des paiements sans débit
                  réel.
                </span>
              </div>
              <input
                type="checkbox"
                checked={sandboxMode}
                onChange={() => setSandboxMode(!sandboxMode)}
                style={{
                  width: 44,
                  height: 22,
                  cursor: "pointer",
                  accentColor: "var(--primary)",
                }}
              />
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Clé Secrète Wave</label>
              <input
                type="password"
                value={waveKey}
                onChange={(e) => setWaveKey(e.target.value)}
                className={styles.input}
                placeholder="wv_live_..."
                required
              />
              <span className={styles.helpText}>
                Clé d'authentification pour la passerelle de paiement Wave.
              </span>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Merchant ID Orange Money (OM)
              </label>
              <input
                type="text"
                value={orangeMoneyMerchant}
                onChange={(e) => setOrangeMoneyMerchant(e.target.value)}
                className={styles.input}
                placeholder="OM_MERCH_..."
                required
              />
              <span className={styles.helpText}>
                Identifiant marchand unique de la Sonatel pour Orange Money.
              </span>
            </div>

            <div className={styles.formGroup} style={{ gridColumn: "span 2" }}>
              <label className={styles.label}>Clé API Free Money</label>
              <input
                type="password"
                value={freeMoneyKey}
                onChange={(e) => setFreeMoneyKey(e.target.value)}
                className={styles.input}
                placeholder="fm_sec_..."
                required
              />
            </div>
          </div>

          <div className={styles.footer}>
            <button
              type="button"
              onClick={() =>
                alert("Test de connexion des passerelles réussi !")
              }
              className={styles.btnSave}
              style={{
                backgroundColor: "transparent",
                color: "var(--text-secondary)",
                border: "1px solid var(--border)",
                boxShadow: "none",
                marginRight: "auto",
              }}>
              Tester la connexion
            </button>
            <button
              type="submit"
              className={styles.btnSave}
              disabled={saveLoading}>
              {saveLoading ? "Enregistrement..." : "Sauvegarder les clés"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
