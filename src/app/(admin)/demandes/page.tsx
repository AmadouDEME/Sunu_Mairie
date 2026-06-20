"use client";

import DemandeDetailModal from "@/components/demandes/DemandeDetailModal";
import { ChevronLeft, ChevronRight, Eye, Search } from "lucide-react";
import { useMemo, useState } from "react";
import styles from "./Demandes.module.css";

// Initial mock data of administrative requests updated to match the new types and statuses
const INITIAL_DEMANDES = [
  {
    id: "DM-2026-001",
    citoyen: "Aïssatou Diallo",
    phone: "+221 77 450 12 34",
    type: "Acte de naissance",
    typeCode: "naissance",
    date: "19/06/2026",
    region: "Grand Dakar",
    paid: true,
    paymentMethod: "Wave",
    amount: "1000",
    status: "En attente",
    meta: {
      childName: "Moussa Diallo",
      birthDate: "15/06/2026",
      fatherName: "Ibrahima Diallo",
      motherName: "Aïssatou Diallo",
    },
  },
  {
    id: "DM-2026-002",
    citoyen: "Mamadou Fall",
    phone: "+221 76 890 56 12",
    type: "Occupation",
    typeCode: "occupation",
    date: "18/06/2026",
    region: "Grand Dakar",
    paid: true,
    paymentMethod: "Orange Money",
    amount: "25000",
    status: "Approuvé",
    meta: {
      address: "Sor, Rue 5, Grand Dakar",
      area: "450 m²",
      usage: "Habitation R+1",
      architect: "Cabinet S. Fall",
    },
  },
  {
    id: "DM-2026-003",
    citoyen: "Cheikh Ndiaye",
    phone: "+221 70 234 89 01",
    type: "Certificat de mariage",
    typeCode: "mariage",
    date: "17/06/2026",
    region: "Grand Dakar",
    paid: true,
    paymentMethod: "Wave",
    amount: "3000",
    status: "Prêt",
    meta: {
      husbandName: "Cheikh Ndiaye",
      wifeName: "Fatoumata Sow",
      marriageDate: "12/06/2026",
      regime: "Monogamie - Biens communs",
    },
  },
  {
    id: "DM-2026-004",
    citoyen: "Mariama Sarr",
    phone: "+221 77 876 54 32",
    type: "Signalement",
    typeCode: "signalement",
    date: "16/06/2026",
    region: "Kedougou",
    paid: true,
    paymentMethod: "Espèces",
    amount: "500",
    status: "Rejeté",
    rejectReason:
      "La pièce d'identité fournie est périmée depuis plus d'un an.",
  },
  {
    id: "DM-2026-005",
    citoyen: "Ousmane Cissé",
    phone: "+221 77 345 67 89",
    type: "Acte de naissance",
    typeCode: "naissance",
    date: "15/06/2026",
    region: "Grand Dakar",
    paid: true,
    paymentMethod: "Orange Money",
    amount: "1000",
    status: "En attente",
    meta: {
      childName: "Seynabou Cissé",
      birthDate: "10/06/2026",
      fatherName: "Ousmane Cissé",
      motherName: "Rokhaya Diop",
    },
  },
  {
    id: "DM-2026-006",
    citoyen: "Khadija Sy",
    phone: "+221 70 765 43 21",
    type: "Certificat de décès",
    typeCode: "deces",
    date: "14/06/2026",
    region: "Grand Dakar",
    paid: true,
    paymentMethod: "Free Money",
    amount: "1000",
    status: "Prêt",
  },
  {
    id: "DM-2026-007",
    citoyen: "Boubacar Diop",
    phone: "+221 76 111 22 33",
    type: "Signalement",
    typeCode: "signalement",
    date: "12/06/2026",
    region: "Grand Dakar",
    paid: false,
    paymentMethod: "Non payé",
    amount: "15000",
    status: "En attente",
  },
  {
    id: "DM-2026-008",
    citoyen: "Fatou Sow",
    phone: "+221 77 999 88 77",
    type: "Signalement",
    typeCode: "signalement",
    date: "11/06/2026",
    region: "Grand Dakar",
    paid: true,
    paymentMethod: "Wave",
    amount: "500",
    status: "Approuvé",
  },
  {
    id: "DM-2026-009",
    citoyen: "Abdoulaye Guèye",
    phone: "+221 77 555 44 33",
    type: "Occupation",
    typeCode: "occupation",
    date: "10/06/2026",
    region: "Kedougou",
    paid: true,
    paymentMethod: "Orange Money",
    amount: "25000",
    status: "Prêt",
  },
  {
    id: "DM-2026-010",
    citoyen: "Rama Ndiaye",
    phone: "+221 77 222 33 44",
    type: "Acte de naissance",
    typeCode: "naissance",
    date: "09/06/2026",
    region: "Grand Dakar",
    paid: true,
    paymentMethod: "Wave",
    amount: "1000",
    status: "Rejeté",
    rejectReason:
      "L'acte de mariage des parents est obligatoire pour cette demande.",
  },
];

export default function DemandesPage() {
  const [demandes, setDemandes] = useState<any[]>(INITIAL_DEMANDES);

  // Filters & Pagination State
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Detail Modal State
  const [selectedDemande, setSelectedDemande] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 6;

  // Filter Logic
  const filteredDemandes = useMemo(() => {
    return demandes.filter((item) => {
      const matchesSearch =
        item.citoyen.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        item.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesType =
        typeFilter === "all" ||
        item.typeCode.toLowerCase() === typeFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [demandes, search, statusFilter, typeFilter]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredDemandes.length / itemsPerPage) || 1;
  const paginatedDemandes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDemandes.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDemandes, currentPage]);

  const handleOpenDetail = (demande: any) => {
    setSelectedDemande(demande);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = (
    id: string,
    newStatus: string,
    rejectReason?: string,
  ) => {
    setDemandes((prevList) =>
      prevList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: newStatus,
            rejectReason: rejectReason || undefined,
          };
        }
        return item;
      }),
    );

    // If modal is open and shows this item, update selectedDemande state
    if (selectedDemande && selectedDemande.id === id) {
      setSelectedDemande((prev: any) => ({
        ...prev,
        status: newStatus,
        rejectReason: rejectReason || undefined,
      }));
    }
  };

  return (
    <div className={styles.container}>
      {/* Title */}
      <div className={styles.titleSection}>
        <h1 className={styles.title}>Gestion des Demandes</h1>
        <p className={styles.subtitle}>
          Visualisez, prenez en charge et signez numériquement les dossiers
          administratifs.
        </p>
      </div>

      {/* Filter panel */}
      <div className={`${styles.filterPanel} glassmorphism`}>
        <div className={styles.leftFilters}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Rechercher par nom ou numéro..."
              className={styles.searchInput}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className={styles.select}>
            <option value="all">Tous les statuts</option>
            <option value="en attente">En attente</option>
            <option value="approuvé">Approuvé</option>
            <option value="prêt">Prêt</option>
            <option value="rejeté">Rejeté</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setCurrentPage(1);
            }}
            className={styles.select}>
            <option value="all">Tous les documents</option>
            <option value="naissance">Acte de naissance</option>
            <option value="mariage">Certificat de mariage</option>
            <option value="deces">Certificat de décès</option>
            <option value="signalement">Signalement</option>
            <option value="occupation">Occupation</option>
          </select>
        </div>
      </div>

      {/* Table grid */}
      <div className={`${styles.tableWrapper} glassmorphism`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>ID Demande</th>
              <th className={styles.th}>Citoyen</th>
              <th className={styles.th}>Type de Démarche</th>
              <th className={styles.th}>Date de Soumission</th>
              <th className={styles.th}>Commune</th>
              <th className={styles.th}>Paiement</th>
              <th className={styles.th}>Statut</th>
              <th className={styles.th} style={{ textAlign: "right" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedDemandes.length > 0 ? (
              paginatedDemandes.map((item) => (
                <tr key={item.id} className={styles.tr}>
                  <td className={styles.td} style={{ fontWeight: 600 }}>
                    {item.id}
                  </td>
                  <td className={styles.td}>{item.citoyen}</td>
                  <td className={styles.td}>{item.type}</td>
                  <td className={styles.td}>{item.date}</td>
                  <td className={styles.td}>{item.region}</td>
                  <td className={styles.td}>
                    <div className={styles.paymentBadge}>
                      <span
                        className={`${styles.paymentDot} ${
                          item.paid ? styles.paymentPaid : styles.paymentUnpaid
                        }`}
                      />
                      <span className={styles.paymentMethod}>
                        {item.paid
                          ? `Payé (${item.paymentMethod})`
                          : "Non payé"}
                      </span>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <span
                      className={`${styles.badge} ${
                        item.status === "En attente"
                          ? styles.badgeAttente
                          : item.status === "Approuvé"
                            ? styles.badgeCours
                            : item.status === "Prêt"
                              ? styles.badgeSigne
                              : styles.badgeRejete
                      }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className={styles.td} style={{ textAlign: "right" }}>
                    <button
                      onClick={() => handleOpenDetail(item)}
                      className={styles.btnView}>
                      <Eye size={14} />
                      <span>Traiter</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className={styles.td}
                  style={{
                    textAlign: "center",
                    padding: "40px 0",
                    color: "var(--text-muted)",
                  }}>
                  Aucune demande ne correspond à vos filtres.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Bar */}
        {filteredDemandes.length > 0 && (
          <div className={styles.pagination}>
            <span>
              Affichage de {(currentPage - 1) * itemsPerPage + 1} à{" "}
              {Math.min(currentPage * itemsPerPage, filteredDemandes.length)}{" "}
              sur {filteredDemandes.length} demandes
            </span>
            <div className={styles.pageButtons}>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className={styles.pageBtn}>
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`${styles.pageBtn} ${
                    currentPage === i + 1 ? styles.pageBtnActive : ""
                  }`}>
                  {i + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                className={styles.pageBtn}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Request Detail Modal */}
      <DemandeDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        demande={selectedDemande}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
