"use client";

import React, { useState } from "react";
import { X, FileText, Download, Check } from "lucide-react";
import styles from "./DemandeDetailModal.module.css";

interface DemandeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  demande: any;
  onUpdateStatus: (id: string, newStatus: string, rejectReason?: string) => void;
}

export default function DemandeDetailModal({
  isOpen,
  onClose,
  demande,
  onUpdateStatus,
}: DemandeDetailModalProps) {
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  if (!isOpen || !demande) return null;

  const handleProcess = () => {
    onUpdateStatus(demande.id, "Approuvé");
  };

  const handleSign = () => {
    onUpdateStatus(demande.id, "Prêt");
    onClose();
  };

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectReason.trim()) return;
    onUpdateStatus(demande.id, "Rejeté", rejectReason);
    setShowRejectForm(false);
    setRejectReason("");
    onClose();
  };

  // Render specific metadata depending on request type
  const renderDemandeMetadata = () => {
    switch (demande.typeCode) {
      case "naissance":
        return (
          <div className={styles.infoGrid}>
            <div className={styles.infoBlock}>
              <span className={styles.label}>Nom complet de l'enfant</span>
              <span className={styles.value}>{demande.meta?.childName || "Mamadou Fall"}</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.label}>Date de naissance</span>
              <span className={styles.value}>{demande.meta?.birthDate || "12/04/2026"}</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.label}>Nom du Père</span>
              <span className={styles.value}>{demande.meta?.fatherName || "Abdou Fall"}</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.label}>Nom de la Mère</span>
              <span className={styles.value}>{demande.meta?.motherName || "Mariama Diallo"}</span>
            </div>
          </div>
        );
      case "mariage":
        return (
          <div className={styles.infoGrid}>
            <div className={styles.infoBlock}>
              <span className={styles.label}>Nom de l'Époux</span>
              <span className={styles.value}>{demande.meta?.husbandName || "Cheikh Ndiaye"}</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.label}>Nom de l'Épouse</span>
              <span className={styles.value}>{demande.meta?.wifeName || "Fatoumata Sow"}</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.label}>Date du Mariage</span>
              <span className={styles.value}>{demande.meta?.marriageDate || "12/06/2026"}</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.label}>Régime matrimonial</span>
              <span className={styles.value}>{demande.meta?.regime || "Monogamie - Biens communs"}</span>
            </div>
          </div>
        );
      case "deces":
        return (
          <div className={styles.infoGrid}>
            <div className={styles.infoBlock}>
              <span className={styles.label}>Nom complet du Défunt</span>
              <span className={styles.value}>{demande.citoyen}</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.label}>Date du Décès</span>
              <span className={styles.value}>{demande.date}</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.label}>Lieu du Décès</span>
              <span className={styles.value}>Hôpital Principal de Dakar</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.label}>Déclarant</span>
              <span className={styles.value}>Khadija Sy (Épouse)</span>
            </div>
          </div>
        );
      case "occupation":
        return (
          <div className={styles.infoGrid}>
            <div className={styles.infoBlock}>
              <span className={styles.label}>Adresse de l'occupation</span>
              <span className={styles.value}>{demande.meta?.address || "Mermoz, Lot 234, Dakar"}</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.label}>Superficie demandée (m²)</span>
              <span className={styles.value}>{demande.meta?.area || "450 m²"}</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.label}>Usage prévu</span>
              <span className={styles.value}>{demande.meta?.usage || "Terrasse de Café / Commerce temporaire"}</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.label}>Durée sollicitée</span>
              <span className={styles.value}>1 an (renouvelable)</span>
            </div>
          </div>
        );
      case "signalement":
        return (
          <div className={styles.infoGrid}>
            <div className={styles.infoBlock}>
              <span className={styles.label}>Type d'anomalie</span>
              <span className={styles.value}>{demande.meta?.docName || "Éclairage public défectueux / Nid de poule"}</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.label}>Localisation</span>
              <span className={styles.value}>Avenue Bourguiba, angle Rue 12</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.label}>Témoin / Déclarant</span>
              <span className={styles.value}>{demande.meta?.witness || "Mariama Sarr"}</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.label}>Niveau d'urgence</span>
              <span className={styles.value} style={{ color: "var(--warning-text)", fontWeight: 700 }}>Moyen</span>
            </div>
          </div>
        );
      default:
        return (
          <div className={styles.infoGrid}>
            <div className={styles.infoBlock}>
              <span className={styles.label}>Description de la démarche</span>
              <span className={styles.value}>Dossier de demande générale d'autorisation municipale.</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} glassmorphism`}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <h2 className={styles.modalTitle}>Demande {demande.id}</h2>
            <p className={styles.modalSubtitle}>Soumis le {demande.date}</p>
          </div>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Fermer">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* Main Grid */}
          <div className={styles.grid}>
            {/* Left section: Citizen Information */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Citoyen Demandeur</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoBlock}>
                  <span className={styles.label}>Nom complet</span>
                  <span className={styles.value}>{demande.citoyen}</span>
                </div>
                <div className={styles.infoBlock}>
                  <span className={styles.label}>Numéro de Téléphone</span>
                  <span className={styles.value}>{demande.phone || "+221 77 123 45 67"}</span>
                </div>
                <div className={styles.infoBlock}>
                  <span className={styles.label}>Région</span>
                  <span className={styles.value}>{demande.region}</span>
                </div>
                <div className={styles.infoBlock}>
                  <span className={styles.label}>Paiement</span>
                  <span className={styles.value}>
                    {demande.paid ? "Payé" : "Non payé"} ({demande.paymentMethod})
                  </span>
                </div>
              </div>
            </div>

            {/* Right section: Documents & Status */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Statut & Documents</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoBlock}>
                  <span className={styles.label}>Statut Actuel</span>
                  <span className={styles.value}>{demande.status}</span>
                </div>
                <div className={styles.infoBlock}>
                  <span className={styles.label}>Coût démarche</span>
                  <span className={styles.value}>{demande.amount || "1 000"} FCFA</span>
                </div>
              </div>

              {demande.status === "Rejeté" && demande.rejectReason && (
                <div className={styles.rejectionForm} style={{ margin: 0 }}>
                  <span className={styles.rejectionTitle}>Motif du rejet</span>
                  <p style={{ fontSize: "0.85rem", color: "var(--danger-text)" }}>
                    {demande.rejectReason}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Middle section: Request details depending on type */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Détails de la Démarche</h3>
            {renderDemandeMetadata()}
          </div>

          {/* Attachments Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Pièces Jointes</h3>
            <div className={styles.docList}>
              <div className={styles.docItem}>
                <div className={styles.docInfo}>
                  <FileText className={styles.docIcon} size={18} />
                  <span>Pièce d'Identité Nationale (CNI).pdf</span>
                </div>
                <button className={styles.btnDownload} title="Télécharger">
                  <Download size={16} />
                </button>
              </div>

              {demande.typeCode === "occupation" && (
                <div className={styles.docItem}>
                  <div className={styles.docInfo}>
                    <FileText className={styles.docIcon} size={18} />
                    <span>Plan de Masse - Espace Public.pdf</span>
                  </div>
                  <button className={styles.btnDownload} title="Télécharger">
                    <Download size={16} />
                  </button>
                </div>
              )}

              {demande.typeCode === "mariage" && (
                <div className={styles.docItem}>
                  <div className={styles.docInfo}>
                    <FileText className={styles.docIcon} size={18} />
                    <span>Certificat de Célibat & Fiche Témoins.pdf</span>
                  </div>
                  <button className={styles.btnDownload} title="Télécharger">
                    <Download size={16} />
                  </button>
                </div>
              )}

              {demande.typeCode === "signalement" && (
                <div className={styles.docItem}>
                  <div className={styles.docInfo}>
                    <FileText className={styles.docIcon} size={18} />
                    <span>Photo_Preuve_Signalement.jpg</span>
                  </div>
                  <button className={styles.btnDownload} title="Télécharger">
                    <Download size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Reject Form */}
          {showRejectForm && (
            <form onSubmit={handleRejectSubmit} className={styles.rejectionForm}>
              <div className={styles.rejectionTitle}>Expliquer le motif du rejet</div>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Ex: Document d'identité expiré ou illisible, signature témoin manquante..."
                className={styles.textarea}
                required
              />
              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={() => setShowRejectForm(false)}
                  className={styles.btnCancel}
                  style={{ padding: "6px 12px", fontSize: "0.8rem" }}
                >
                  Annuler
                </button>
                <button type="submit" className={styles.btnDanger} style={{ padding: "6px 12px", fontSize: "0.8rem" }}>
                  Confirmer le rejet
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button onClick={onClose} className={styles.btnCancel}>
            Fermer
          </button>

          {!showRejectForm && (
            <>
              {demande.status === "En attente" && (
                <>
                  <button onClick={() => setShowRejectForm(true)} className={styles.btnDanger}>
                    Rejeter
                  </button>
                  <button onClick={handleProcess} className={styles.btnPrimary}>
                    Approuver
                  </button>
                </>
              )}

              {demande.status === "Approuvé" && (
                <>
                  <button onClick={() => setShowRejectForm(true)} className={styles.btnDanger}>
                    Rejeter
                  </button>
                  <button onClick={handleSign} className={styles.btnSuccess}>
                    <Check size={16} />
                    Signer & Rendre Prêt
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
