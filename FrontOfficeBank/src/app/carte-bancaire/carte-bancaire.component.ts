import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarteBancaire } from '../Models/CarteBancaire';
import { CarteBancaireService } from '../service/carte-bancaire.service';
import { CompteBancaireService } from '../service/compte-bancaire.service';

@Component({
  selector: 'app-carte-bancaire',
  templateUrl: './carte-bancaire.component.html',
  styleUrls: ['./carte-bancaire.component.css']
})
export class CarteBancaireComponent implements OnInit {
  cartes: CarteBancaire[] = [];
  carteForm: FormGroup;
  showForm = false; // Gérer l'affichage du formulaire
  comptes: any[] = []; // Liste des comptes

  constructor(private carteBancaireService: CarteBancaireService,private compteService: CompteBancaireService, private fb: FormBuilder) {
    this.carteForm = this.fb.group({
      typeCarte: ['', Validators.required],
      dateExpiration: ['', Validators.required],
      statut: ['', Validators.required],
      idCompte: [null, Validators.required]  // ID du compte lié à la carte
    });
  }

  ngOnInit(): void {
    this.getCartes(); // Récupère la liste des cartes
    this.getComptes(); // Récupère la liste des comptes
  }

  getCartes(): void {
    this.carteBancaireService.getAllCartes().subscribe(data => {
      this.cartes = data;
    });
  }

  getComptes(): void {
    this.compteService.getAllComptes().subscribe(data => {
      this.comptes = data; // Assigne les comptes récupérés à la variable comptes
    }, error => {
      console.error('Erreur lors de la récupération des comptes :', error);
    });
  }

  addCarte(): void {
    if (this.carteForm.valid) {
      this.carteBancaireService.addCarte(this.carteForm.value).subscribe(() => {
        this.getCartes();
        this.carteForm.reset();
        this.showForm = false;
      });
    }
  }

  deleteCarte(id: number | undefined): void {
    if (id === undefined) {
      console.error('ID de la carte invalide.');
      return;
    }

    if (confirm('Voulez-vous vraiment supprimer cette carte ?')) {
      this.carteBancaireService.deleteCarte(id).subscribe({
        next: () => this.getCartes(),
        error: (err) => console.error('Erreur lors de la suppression :', err)
      });
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  getStatusColor(statut: string): string {
    switch (statut) {
      case 'Active': return '#28a745'; // Vert
      case 'Expirée': return '#dc3545'; // Rouge
      case 'En cours': return '#ffc107'; // Jaune
      default: return '#6c757d'; // Gris par défaut
    }
  }

  getStatusIcon(statut: string): string {
    switch (statut) {
      case 'Active': return 'fas fa-check-circle'; // Icône de validation ✅
      case 'Expirée': return 'fas fa-times-circle'; // Icône de croix ❌
      case 'En cours': return 'fas fa-hourglass-half'; // Icône d'attente ⏳
      default: return 'fas fa-question-circle'; // Icône par défaut ❓
    }
  }
}
