import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token/token.service';
import { CompteBancaireService } from '../service/compte-bancaire.service';
import { CompteBancaire } from '../Models/CompteBancaire';
import { Transaction } from '../Models/transaction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compte-buser',
  templateUrl: './compte-buser.component.html',
  styleUrls: ['./compte-buser.component.css']
})
export class CompteBUserComponent implements OnInit {

  // Propriétés du composant
  totalBalance: number = 0; // Solde total de tous les comptes
  comptes: CompteBancaire[] = []; // Liste des comptes bancaires
  transactions: { [key: number]: { sent: Transaction[]; received: Transaction[] } } = {}; // Transactions par compte
  filteredTransactions: any[] = []; // Transactions filtrées pour l'affichage
  selectedCompte: number | null = null; // Compte sélectionné pour les opérations
  receiverAccount: number = 0; // Numéro de compte du destinataire pour un transfert
  transferAmount: number = 0; // Montant à transférer
  showTransferForm: boolean = false; // Afficher/masquer le formulaire de transfert
  showAccountInfo: boolean = false; // Afficher/masquer les informations des comptes
  showTransactionList: boolean = false; // Afficher/masquer la liste des transactions
  filterAccountNumber: number | null = null; // Filtre par numéro de compte
showTransactionForm: any;
newTransaction: any;

  constructor(
    private tokenService: TokenService, // Service pour gérer le token utilisateur
    private compteBancaireService: CompteBancaireService, // Service pour les opérations bancaires
    private router: Router // Service de routage
  ) {}

  // Méthode exécutée au chargement du composant
  ngOnInit(): void {
    const userId = this.tokenService.getUserId(); // Récupère l'ID de l'utilisateur connecté
    if (userId) {
      this.loadComptes(userId); // Charge les comptes de l'utilisateur
    }
  }




  // Afficher/masquer le formulaire de transfert
  toggleTransferForm(numCompte: number): void {
    if (this.selectedCompte === numCompte) {
      this.showTransferForm = !this.showTransferForm;
    } else {
      this.selectedCompte = numCompte;
      this.showTransferForm = true;
    }
  }

  toggleTransactionForm(numCompte: number): void {
    if (this.selectedCompte === numCompte) {
      this.showTransactionForm = !this.showTransactionForm;
    } else {
      this.selectedCompte = numCompte;
      this.showTransactionForm = true;
    }
  }




  loadTransactions(numCompte: number): void {
    if (!this.transactions[numCompte]) {
      this.transactions[numCompte] = { sent: [], received: [] };
    }
  
    this.compteBancaireService.getTransactionsBySender(numCompte).subscribe(
      (sentTransactions) => {
        this.transactions[numCompte].sent = sentTransactions;
        console.log(`Transactions envoyées pour ${numCompte}:`, this.transactions[numCompte].sent);
      },
      (error) => console.error('Erreur récupération transactions envoyées:', error)
    );
  
    this.compteBancaireService.getTransactionsByReceiver(numCompte).subscribe(
      (receivedTransactions) => {
        this.transactions[numCompte].received = receivedTransactions;
        console.log(`Transactions reçues pour ${numCompte}:`, this.transactions[numCompte].received);
      },
      (error) => console.error('Erreur récupération transactions reçues:', error)
    );
  }
  loadComptes(userId: number): void {
    this.compteBancaireService.getComptesByUserId(userId).subscribe(
      (comptes) => {
        this.comptes = comptes;
        this.totalBalance = comptes.reduce((sum, compte) => sum + compte.solde, 0);
        
        // Charger les transactions pour chaque compte récupéré
        this.comptes.forEach(compte => this.loadTransactions(compte.numCompte));
      },
      (error) => {
        console.error('Error loading comptes:', error);
      }
    );
  }
    
  // Applique le filtre sur les transactions
  applyFilter(): void {
    this.filteredTransactions = [];
    for (const key in this.transactions) {
      if (this.transactions.hasOwnProperty(key)) {
        const accountTransactions = this.transactions[key];
        this.filteredTransactions = this.filteredTransactions.concat(
          accountTransactions.sent.map(t => ({ ...t, type: 'sent' })), // Ajoute les transactions envoyées
          accountTransactions.received.map(t => ({ ...t, type: 'received' })) // Ajoute les transactions reçues
          .filter(t => !this.filterAccountNumber || t.sender.numCompte === this.filterAccountNumber || t.receiver.numCompte === this.filterAccountNumber))// Filtre par numéro de compte
      }
    }
  }

  // Effectue un transfert d'argent
  transferMoney(senderId: number): void {
    if (this.receiverAccount && this.transferAmount > 0) {
      this.compteBancaireService.transferMoney(senderId, this.receiverAccount, this.transferAmount).subscribe(
        (response) => {
          alert(response); // Affiche un message de succès
          this.selectedCompte = null; // Réinitialise le compte sélectionné
          this.loadComptes(senderId); // Recharge les comptes
        },
        (error) => {
          alert('Error during transfer: ' + error.message); // Affiche une erreur en cas de problème
        }
      );
    } else {
      alert('Please fill in all fields with valid values.'); // Affiche un message d'erreur si les champs sont invalides
    }
  }

  // Affiche le tableau de bord
  showDashboard(): void {
    this.showAccountInfo = false;
    this.showTransactionList = false;
  }

  // Affiche les informations des comptes
  showAccounts(): void {
    this.showAccountInfo = true;
    this.showTransactionList = false;
  }

  // Affiche la liste des transactions
  showTransactions(): void {
    this.showTransactionList = true;
    this.showAccountInfo = false;
    this.applyFilter(); // Applique le filtre lors de l'affichage
  }

  // Déconnecte l'utilisateur
  logout(): void {
    this.tokenService.clearToken(); // Supprime le token
    this.router.navigate(['/login']); // Redirige vers la page de connexion
  }
}