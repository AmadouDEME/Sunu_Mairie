"use client";

import { Calendar, Mail, MapPin, Phone, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import styles from "./Citoyens.module.css";

// Mock citizens data
const CITIZENS_DATA = [
  {
    id: "CIT-001",
    name: "Aïssatou Diallo",
    email: "aissatou.diallo@gmail.com",
    phone: "+221 77 450 12 34",
    nin: "2752199400234",
    region: "Keur Massar",
    registeredDate: "12/01/2026",
    requestsCount: 3,
    spent: "7 000",
    address: "Fann Résidence, Keur Massar",
    status: "Actif",
    history: [
      {
        id: "DM-2026-001",
        type: "Acte de naissance",
        status: "En attente",
        date: "19/06/2026",
      },
      {
        id: "DM-2025-104",
        type: "Signalement",
        status: "Prêt",
        date: "15/12/2025",
      },
      {
        id: "DM-2025-089",
        type: "Certificat de mariage",
        status: "Prêt",
        date: "02/10/2025",
      },
    ],
  },
  {
    id: "CIT-002",
    name: "Mamadou Fall",
    email: "mamadou.fall@outlook.com",
    phone: "+221 76 890 56 12",
    nin: "1682198800543",
    region: "Grand Dakar",
    registeredDate: "18/02/2026",
    requestsCount: 2,
    spent: "26 000",
    address: "Sor, Rue 5, Grand Dakar",
    status: "Actif",
    history: [
      {
        id: "DM-2026-002",
        type: "Occupation",
        status: "Approuvé",
        date: "18/06/2026",
      },
      {
        id: "DM-2026-015",
        type: "Signalement",
        status: "Prêt",
        date: "12/03/2026",
      },
    ],
  },
  {
    id: "CIT-003",
    name: "Cheikh Ndiaye",
    email: "cheikh.ndiaye@yahoo.fr",
    phone: "+221 70 234 89 01",
    nin: "1722199000124",
    region: "Grand Yoff",
    registeredDate: "05/03/2026",
    requestsCount: 1,
    spent: "3 000",
    address: "Ourossogui, Quartier Escale",
    status: "Actif",
    history: [
      {
        id: "DM-2026-003",
        type: "Certificat de mariage",
        status: "Prêt",
        date: "17/06/2026",
      },
    ],
  },
  {
    id: "CIT-004",
    name: "Mariama Sarr",
    email: "mariama.sarr@gmail.com",
    phone: "+221 77 876 54 32",
    nin: "2802199500987",
    region: "Kedougou",
    registeredDate: "10/01/2026",
    requestsCount: 2,
    spent: "1 000",
    address: "Kédougou, Quartier Togoro",
    status: "Actif",
    history: [
      {
        id: "DM-2026-004",
        type: "Signalement",
        status: "Rejeté",
        date: "24/02/2026",
      },
      {
        id: "DM-2026-020",
        type: "Acte de naissance",
        status: "Prêt",
        date: "24/02/2026",
      },
    ],
  },
  {
    id: "CIT-005",
    name: "Ousmane Cissé",
    email: "ousmane.cisse@gmail.com",
    phone: "+221 77 345 67 89",
    nin: "1652198500742",
    region: "Keur Massar",
    registeredDate: "20/04/2026",
    requestsCount: 2,
    spent: "2 000",
    address: "Parcelles Assainies, U.22",
    status: "Actif",
    history: [
      {
        id: "DM-2026-005",
        type: "Acte de naissance",
        status: "En attente",
        date: "15/06/2026",
      },
      {
        id: "DM-2026-033",
        type: "Signalement",
        status: "Prêt",
        date: "05/05/2026",
      },
    ],
  },
  {
    id: "CIT-006",
    name: "Khadija Sy",
    email: "khadija.sy@live.fr",
    phone: "+221 70 765 43 21",
    nin: "2852199900854",
    region: "Grand Dakar",
    registeredDate: "03/05/2026",
    requestsCount: 1,
    spent: "1 000",
    address: "Ndar Tout, Grand Dakar",
    status: "Actif",
    history: [
      {
        id: "DM-2026-006",
        type: "Certificat de décès",
        status: "Prêt",
        date: "14/06/2026",
      },
    ],
  },
];

export default function CitoyensPage() {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Filter list
  const filteredCitizens = useMemo(() => {
    return CITIZENS_DATA.filter((citoyen) => {
      const matchesSearch =
        citoyen.name.toLowerCase().includes(search.toLowerCase()) ||
        citoyen.email.toLowerCase().includes(search.toLowerCase()) ||
        citoyen.nin.includes(search);

      const matchesRegion =
        regionFilter === "all" ||
        citoyen.region.toLowerCase() === regionFilter.toLowerCase();

      return matchesSearch && matchesRegion;
    });
  }, [search, regionFilter]);

  const selectedCitizen = useMemo(() => {
    return CITIZENS_DATA.find((c) => c.id === selectedId) || null;
  }, [selectedId]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className={styles.container}>
      {/* Title */}
      <div className={styles.titleSection}>
        <h1 className={styles.title}>Citoyens</h1>
        <p className={styles.subtitle}>
          Consultez l'annuaire des citoyens inscrits sur l'application mobile et
          l'historique de leurs démarches.
        </p>
      </div>

      {/* Filter panel */}
      <div className={`${styles.filterPanel} glassmorphism`}>
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Rechercher par nom, email ou NIN..."
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className={styles.select}>
          <option value="all">Toutes les Communes</option>
          <option value="Keur Massar">Keur Massar</option>
          <option value="Grand Dakar">Grand Dakar</option>
          <option value="Grand Yoff">Grand Yoff</option>
          <option value="kedougou">Kédougou</option>
        </select>
      </div>

      {/* Main Grid: list + detail side card */}
      <div className={styles.mainLayout}>
        <div
          className={`${selectedCitDakar-Plateautyles.listCol : styles.listColFull}`}>
          <div className={`${styles.tableWrapper} glassmorphism`}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Citoyen</th>
                  <th className={styles.th}>NIN</th>
                  <th className={styles.th}>Commune</th>
                  <th className={styles.th}>Inscrit le</th>
                  <th className={styles.th} style={{ textAlign: "center" }}>
                    Démarches
                  </th>
                  <th className={styles.th} style={{ textAlign: "right" }}>
                    Total Payé
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCitizens.length > 0 ? (
                  filteredCitizens.map((item) => (
                    <tr
                      key={item.id}
                      className={`${styles.tr} ${item.id === selectedId ? styles.trActive : ""}`}
                      onClick={() =>
                        setSelectedId(item.id === selectedId ? null : item.id)
                      }>
                      <td className={styles.td}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                          }}>
                          <div
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: "50%",
                              background: "var(--primary-light)",
                              color: "var(--primary)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 700,
                              fontSize: "0.8rem",
                            }}>
                            {getInitials(item.name)}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}>
                            <span style={{ fontWeight: 600 }}>{item.name}</span>
                            <span
                              style={{
                                fontSize: "0.75rem",
                                color: "var(--text-muted)",
                              }}>
                              {item.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td
                        className={styles.td}
                        style={{ fontFamily: "monospace" }}>
                        {item.nin}
                      </td>
                      <td className={styles.td}>{item.region}</td>
                      <td className={styles.td}>{item.registeredDate}</td>
                      <td
                        className={styles.td}
                        style={{ textAlign: "center", fontWeight: 600 }}>
                        {item.requestsCount}
                      </td>
                      <td
                        className={styles.td}
                        style={{
                          textAlign: "right",
                          fontWeight: 700,
                          color: "var(--success-text)",
                        }}>
                        {item.spent} F
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className={styles.td}
                      style={{
                        textAlign: "center",
                        padding: "40px 0",
                        color: "var(--text-muted)",
                      }}>
                      Aucun citoyen ne correspond aux critères.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Profile Details */}
        {selectedCitizen && (
          <div className={styles.detailCol}>
            <div className={`${styles.detailCard} glassmorphism`}>
              <button
                onClick={() => setSelectedId(null)}
                className={styles.closeBtn}
                aria-label="Fermer">
                <X size={16} />
              </button>

              {/* Profile Header */}
              <div className={styles.profileHeader}>
                <div className={styles.avatar}>
                  {getInitials(selectedCitizen.name)}
                </div>
                <div className={styles.profileTitles}>
                  <h3 className={styles.name}>{selectedCitizen.name}</h3>
                  <span className={styles.nin}>
                    NIN : {selectedCitizen.nin}
                  </span>
                </div>
              </div>

              {/* Core metrics */}
              <div className={styles.statsRow}>
                <div className={styles.statBlock}>
                  <span className={styles.statVal}>
                    {selectedCitizen.requestsCount}
                  </span>
                  <span className={styles.statLabel}>Demandes</span>
                </div>
                <div style={{ width: 1, backgroundColor: "var(--border)" }} />
                <div className={styles.statBlock}>
                  <span
                    className={styles.statVal}
                    style={{ color: "var(--success-text)" }}>
                    {selectedCitizen.spent} F
                  </span>
                  <span className={styles.statLabel}>Payé</span>
                </div>
                <div style={{ width: 1, backgroundColor: "var(--border)" }} />
                <div className={styles.statBlock}>
                  <span
                    className={styles.statVal}
                    style={{ color: "var(--primary)" }}>
                    100%
                  </span>
                  <span className={styles.statLabel}>Actif</span>
                </div>
              </div>

              {/* Personal Info */}
              <div className={styles.infoSection}>
                <h4 className={styles.sectionTitle}>Coordonnées</h4>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>
                    <Mail
                      size={14}
                      style={{
                        marginRight: 6,
                        display: "inline",
                        verticalAlign: "middle",
                      }}
                    />
                    Email
                  </span>
                  <span className={styles.infoVal}>
                    {selectedCitizen.email}
                  </span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>
                    <Phone
                      size={14}
                      style={{
                        marginRight: 6,
                        display: "inline",
                        verticalAlign: "middle",
                      }}
                    />
                    Téléphone
                  </span>
                  <span className={styles.infoVal}>
                    {selectedCitizen.phone}
                  </span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>
                    <MapPin
                      size={14}
                      style={{
                        marginRight: 6,
                        display: "inline",
                        verticalAlign: "middle",
                      }}
                    />
                    Adresse
                  </span>
                  <span className={styles.infoVal}>
                    {selectedCitizen.address}
                  </span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>
                    <Calendar
                      size={14}
                      style={{
                        marginRight: 6,
                        display: "inline",
                        verticalAlign: "middle",
                      }}
                    />
                    Inscription
                  </span>
                  <span className={styles.infoVal}>
                    {selectedCitizen.registeredDate}
                  </span>
                </div>
              </div>

              {/* History */}
              <div className={styles.infoSection}>
                <h4 className={styles.sectionTitle}>Historique récent</h4>
                <div className={styles.historyList}>
                  {selectedCitizen.history.map((hist) => (
                    <div key={hist.id} className={styles.historyItem}>
                      <div>
                        <span className={styles.histName}>{hist.type}</span>
                        <div className={styles.histDate}>
                          Réf: {hist.id} • le {hist.date}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color:
                            hist.status === "Prêt"
                              ? "var(--success-text)"
                              : hist.status === "En attente"
                                ? "var(--warning-text)"
                                : hist.status === "Approuvé"
                                  ? "var(--primary)"
                                  : "var(--danger-text)",
                        }}>
                        {hist.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
