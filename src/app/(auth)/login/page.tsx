"use client";

import { ArrowRight, Lock, Mail } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./Login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@sunumairie.sn");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);

    // Simulate authentication
    setTimeout(() => {
      if (email === "admin@sunumairie.sn" && password === "password") {
        router.push("/dashboard");
      } else {
        setError(
          "Identifiants incorrects. Veuillez utiliser admin@sunumairie.sn et 'password'.",
        );
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className={styles.container}>
      {/* Decorative Glow Elements */}
      <div className={styles.glow1} />
      <div className={styles.glow2} />

      <div className={`${styles.card} glassmorphism animate-fade-in`}>
        <div className={styles.header}>
          <Image
            src="/logo.jpg"
            alt="Sunu Mairie Logo"
            width={64}
            height={64}
            className={styles.logo}
            priority
          />

          <div className={styles.titleSection}>
            <h1 className={styles.title}>Portail Admin</h1>
            <p className={styles.subtitle}>
              Connectez-vous pour gérer les démarches municipales
            </p>
          </div>
        </div>

        {error && <div className={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Adresse Email
            </label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} />
              <input
                id="email"
                type="email"
                placeholder="nom@mairie.sn"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Mot de passe
            </label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.options}>
            <label className={styles.rememberMe}>
              <input
                type="checkbox"
                className={styles.checkbox}
                defaultChecked
              />
              <span>Se souvenir de moi</span>
            </label>
            <a
              href="#"
              className={styles.forgotLink}
              onClick={(e) => e.preventDefault()}>
              Mot de passe oublié ?
            </a>
          </div>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
}
