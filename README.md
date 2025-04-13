# 💼 Application de Gestion de Comptes Bancaires

Projet full-stack développé avec **Angular** en frontend et **Spring Boot** en backend, permettant la gestion de comptes bancaires, virements, crédits, cartes bancaires et authentification sécurisée.

---

## 📌 Fonctionnalités principales

### 👤 Utilisateurs
- Inscription / Connexion sécurisée (JWT)
- Gestion de profil utilisateur

### 💳 Comptes Bancaires
- Création d’un compte
- Consultation des comptes
- Virement entre comptes
- Validation de compte par l’administrateur

### 💰 Transactions
- Suivi des virements (émetteur / destinataire)
- Historique des opérations

### 📄 Crédits & Cartes
- Demande de crédit
- Création de carte bancaire liée à un compte

---

## 🧱 Architecture


- Angular communique avec Spring Boot via `HttpClient`
- Spring Boot expose des routes sécurisées par JWT
- MySQL stocke les utilisateurs, comptes, transactions...

---

## 🚀 Lancement du projet

### 📦 Backend – Spring Boot

```bash
# Prérequis : Java 17+, Maven, MySQL
cd backend
mvn clean install
mvn spring-boot:run
# Prérequis : Node.js, Angular CLI
cd frontend
npm install
ng serve
