"use client";

import {
  CheckCircle,
  FileCheck,
  FileSignature,
  HelpCircle,
  QrCode,
} from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./Signatures.module.css";

// Mock documents ready for signature (Approved status)
const INITIAL_QUEUE = [
  {
    id: "DM-2026-002",
    citoyen: "Mamadou Fall",
    type: "Occupation",
    typeCode: "occupation",
    date: "18/06/2026",
    region: "Grand Dakar",
    amount: "25 000",
    meta: {
      address: "Sor, Rue 5, Grand Dakar",
      area: "450 m²",
      usage: "Habitation R+1",
      architect: "Cabinet S. Fall",
    },
  },
  {
    id: "DM-2026-008",
    citoyen: "Fatou Sow",
    type: "Signalement",
    typeCode: "signalement",
    date: "11/06/2026",
    region: "Keur Massar",
    amount: "0",
    meta: {
      docName: "Dépôt sauvage d'ordures",
      witness: "Fatou Sow",
      validity: "Moyenne",
    },
  },
  {
    id: "DM-2026-011",
    citoyen: "Cheikh Tidiane Diop",
    type: "Certificat de mariage",
    typeCode: "mariage",
    date: "19/06/2026",
    region: "Keur Massar",
    amount: "3 000",
    meta: {
      husbandName: "Cheikh Tidiane Diop",
      wifeName: "Awa Ndiaye",
      marriageDate: "18/06/2026",
      regime: "Monogamie - Séparation de biens",
    },
  },
  {
    id: "DM-2026-012",
    citoyen: "Aminata Sow",
    type: "Acte de naissance",
    typeCode: "naissance",
    date: "19/06/2026",
    region: "Grand Yoff",
    amount: "1 000",
    meta: {
      childName: "Abdoulaye Sow",
      birthDate: "15/06/2026",
      fatherName: "Moussa Sow",
      motherName: "Aminata Sow",
    },
  },
];

export default function SignaturesPage() {
  const [queue, setQueue] = useState(INITIAL_QUEUE);
  const [activeId, setActiveId] = useState(INITIAL_QUEUE[0]?.id || "");
  const [signedIds, setSignedIds] = useState<string[]>([]);

  // Signing Animation States
  const [isSigning, setIsSigning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState("");

  const activeDoc = queue.find((doc) => doc.id === activeId);

  // Sign simulation
  const handleSignDocument = () => {
    if (!activeId || isSigning) return;

    setIsSigning(true);
    setProgress(0);
    setStepText("Initialisation du module de signature...");
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSigning) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 5;

          // Update texts depending on progression
          if (next < 25) {
            setStepText("Génération de la paire de clés cryptographiques...");
          } else if (next < 50) {
            setStepText("Calcul de l'empreinte SHA-256 du document...");
          } else if (next < 75) {
            setStepText("Sécurisation par jeton d'authentification unique...");
          } else if (next < 95) {
            setStepText("Apposition du sceau numérique officiel...");
          } else {
            setStepText("Enregistrement de la signature...");
          }

          if (next >= 100) {
            clearInterval(interval);
            setIsSigning(false);
            setSignedIds((prevSigned) => [...prevSigned, activeId]);
          }
          return next;
        });
      }, 80);
    }
    return () => clearInterval(interval);
  }, [isSigning, activeId]);

  const handleNextDocument = () => {
    // Remove signed document from queue
    setQueue((prevQueue) => prevQueue.filter((doc) => doc.id !== activeId));
    // Set next active document
    const remaining = queue.filter((doc) => doc.id !== activeId);
    if (remaining.length > 0) {
      setActiveId(remaining[0].id);
    } else {
      setActiveId("");
    }
  };

  const isCurrentSigned = signedIds.includes(activeId);

  return (
    <div className={styles.container}>
      {/* Title */}
      <div className={styles.titleSection}>
        <h1 className={styles.title}>Validation & Signatures</h1>
        <p className={styles.subtitle}>
          Signez numériquement les dossiers approuvés. L'apposition du sceau
          rend le document "Prêt".
        </p>
      </div>

      <div className={styles.workspace}>
        {/* Left Side: Document Queue */}
        <div className={`${styles.queueCard} glassmorphism`}>
          <div className={styles.headerRow}>
            <h2 className={styles.cardTitle}>File d'attente</h2>
            <span className={styles.badgeCount}>
              {queue.length} document{queue.length > 1 ? "s" : ""}
            </span>
          </div>

          <div className={styles.docList}>
            {queue.length > 0 ? (
              queue.map((doc) => {
                const isSigned = signedIds.includes(doc.id);
                return (
                  <div
                    key={doc.id}
                    className={`${styles.docItem} ${
                      doc.id === activeId ? styles.docItemActive : ""
                    }`}
                    onClick={() => {
                      if (!isSigning) setActiveId(doc.id);
                    }}>
                    <div className={styles.docHeader}>
                      <span className={styles.docId}>{doc.id}</span>
                      {isSigned ? (
                        <span
                          style={{
                            color: "var(--success)",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}>
                          <CheckCircle size={14} />
                          <span style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                            Prêt
                          </span>
                        </span>
                      ) : (
                        <span className={styles.docDate}>{doc.date}</span>
                      )}
                    </div>
                    <div className={styles.docType}>{doc.type}</div>
                    <div className={styles.docCitizen}>
                      Citoyen : {doc.citoyen}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={styles.emptyState}>
                <FileCheck size={40} style={{ color: "var(--text-muted)" }} />
                <span>Aucun document en attente</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Document Preview & Seal */}
        <div className={`${styles.previewCard} glassmorphism`}>
          {isSigning && (
            <div className={styles.signingOverlay}>
              <span className={styles.signingTitle}>{stepText}</span>
              <div className={styles.progressBarBg}>
                <div
                  className={styles.progressBarFill}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span
                style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                {progress}%
              </span>
            </div>
          )}

          {activeDoc ? (
            <>
              <div className={styles.headerRow}>
                <h2 className={styles.cardTitle}>Aperçu du Document</h2>
                {isCurrentSigned ? (
                  <button
                    onClick={handleNextDocument}
                    className={styles.btnPrimary}>
                    Document Suivant
                  </button>
                ) : (
                  <button
                    onClick={handleSignDocument}
                    className={styles.btnSuccess}>
                    <FileSignature size={18} />
                    Apposer le Sceau & Valider
                  </button>
                )}
              </div>

              <div className={styles.previewArea}>
                {/* A4 Sheet template */}
                <div className={styles.certificate}>
                  <div className={styles.certHeader}>
                    <span className={styles.republicText}>
                      République du Sénégal
                    </span>
                    <span className={styles.mottoText}>
                      Un Peuple - Un But - Une Foi
                    </span>
                    <span style={{ marginTop: 4 }}>
                      VILLE DE Keur Massar - COMMUNE MUNICIPALE
                    </span>
                  </div>

                  <h3 className={styles.certTitle}>{activeDoc.type}</h3>

                  <div className={styles.certBody}>
                    <div className={styles.certRow}>
                      <span className={styles.certLabel}>
                        Référence dossier :
                      </span>
                      <span
                        className={styles.certVal}
                        style={{ fontFamily: "monospace", fontWeight: 700 }}>
                        {activeDoc.id}
                      </span>
                    </div>
                    <div className={styles.certRow}>
                      <span className={styles.certLabel}>Nom du Citoyen :</span>
                      <span className={styles.certVal}>
                        {activeDoc.citoyen}
                      </span>
                    </div>
                    <div className={styles.certRow}>
                      <span className={styles.certLabel}>Date de dépôt :</span>
                      <span className={styles.certVal}>{activeDoc.date}</span>
                    </div>
                    <div className={styles.certRow}>
                      <span className={styles.certLabel}>
                        Commune / Commune :
                      </span>
                      <span className={styles.certVal}>{activeDoc.region}</span>
                    </div>

                    {/* Conditional render of fields depending on type */}
                    {activeDoc.typeCode === "naissance" && (
                      <>
                        <div className={styles.certRow}>
                          <span className={styles.certLabel}>
                            Nom de l'enfant :
                          </span>
                          <span className={styles.certVal}>
                            {activeDoc.meta.childName}
                          </span>
                        </div>
                        <div className={styles.certRow}>
                          <span className={styles.certLabel}>
                            Date de Naissance :
                          </span>
                          <span className={styles.certVal}>
                            {activeDoc.meta.birthDate}
                          </span>
                        </div>
                        <div className={styles.certRow}>
                          <span className={styles.certLabel}>
                            Père & Mère :
                          </span>
                          <span className={styles.certVal}>
                            Fils de {activeDoc.meta.fatherName} et de{" "}
                            {activeDoc.meta.motherName}
                          </span>
                        </div>
                      </>
                    )}

                    {activeDoc.typeCode === "mariage" && (
                      <>
                        <div className={styles.certRow}>
                          <span className={styles.certLabel}>Conjoints :</span>
                          <span className={styles.certVal}>
                            {activeDoc.meta.husbandName} &{" "}
                            {activeDoc.meta.wifeName}
                          </span>
                        </div>
                        <div className={styles.certRow}>
                          <span className={styles.certLabel}>Célébré le :</span>
                          <span className={styles.certVal}>
                            {activeDoc.meta.marriageDate}
                          </span>
                        </div>
                        <div className={styles.certRow}>
                          <span className={styles.certLabel}>
                            Régime Matrimonial :
                          </span>
                          <span className={styles.certVal}>
                            {activeDoc.meta.regime}
                          </span>
                        </div>
                      </>
                    )}

                    {activeDoc.typeCode === "occupation" && (
                      <>
                        <div className={styles.certRow}>
                          <span className={styles.certLabel}>
                            Adresse terrain :
                          </span>
                          <span className={styles.certVal}>
                            {activeDoc.meta.address}
                          </span>
                        </div>
                        <div className={styles.certRow}>
                          <span className={styles.certLabel}>Superficie :</span>
                          <span className={styles.certVal}>
                            {activeDoc.meta.area}
                          </span>
                        </div>
                        <div className={styles.certRow}>
                          <span className={styles.certLabel}>
                            Usage & Architecte :
                          </span>
                          <span className={styles.certVal}>
                            {activeDoc.meta.usage} par{" "}
                            {activeDoc.meta.architect}
                          </span>
                        </div>
                      </>
                    )}

                    {activeDoc.typeCode === "signalement" && (
                      <>
                        <div className={styles.certRow}>
                          <span className={styles.certLabel}>
                            Description anomalie:
                          </span>
                          <span className={styles.certVal}>
                            {activeDoc.meta.docName}
                          </span>
                        </div>
                        <div className={styles.certRow}>
                          <span className={styles.certLabel}>
                            Signalé par :
                          </span>
                          <span className={styles.certVal}>
                            {activeDoc.meta.witness}
                          </span>
                        </div>
                        <div className={styles.certRow}>
                          <span className={styles.certLabel}>Urgence :</span>
                          <span className={styles.certVal}>
                            {activeDoc.meta.validity}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Digital Seal */}
                  <div className={styles.sealContainer}>
                    {isCurrentSigned && (
                      <div className={styles.seal}>
                        <QrCode size={40} />
                        <div className={styles.sealText}>
                          <span className={styles.sealTitle}>
                            Document Prêt
                          </span>
                          <span style={{ fontSize: "0.55rem" }}>
                            Sceau Officiel de Keur Massar
                          </span>
                          <span className={styles.sealCode}>
                            SEC-QR-{activeDoc.id}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <HelpCircle
                size={48}
                style={{ color: "var(--text-muted)", marginBottom: 12 }}
              />
              <h3 style={{ color: "var(--text-primary)" }}>
                Sélectionnez un document
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  textAlign: "center",
                  maxWidth: 300,
                }}>
                Choisissez un dossier dans la file d'attente à gauche pour
                charger son aperçu officiel et y apposer le sceau municipal.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
