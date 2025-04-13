import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CarteBancaireService } from '../service/carte-bancaire.service';
import { CompteBancaireService } from '../service/compte-bancaire.service';
import { UserService } from '../service/User.service';

@Component({
  selector: 'app-statdash',
  templateUrl: './statdash.component.html',
  styleUrls: ['./statdash.component.css']
})
export class StatdashComponent implements OnInit {
  totalUsers: number = 0;
  totalComptes: number = 0;
  chart: any;
  totalCartes!: number;

  constructor(
    private userService: UserService,
    private compteService: CompteBancaireService,
    private carteservice:CarteBancaireService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    // Récupération du nombre d'utilisateurs
    this.userService.getAllUsers().subscribe(users => {
      this.totalUsers = users.length;
      this.updateChart();
    });

    // Récupération du nombre de comptes bancaires
    this.compteService.getAllComptes().subscribe(comptes => {
      this.totalComptes = comptes.length;
      this.updateChart();
    });
    this.carteservice.getAllCartes().subscribe(comptes => {
      this.totalCartes = comptes.length;
      this.updateChart();
    });
  }

  updateChart() {
    if (this.chart) {
      this.chart.destroy(); // Supprime l'ancien graphique avant d'en créer un nouveau
    }

    this.chart = new Chart("statChart", {
      type: 'bar',
      data: {
        labels: ['Utilisateurs', 'Comptes Bancaires'],
        datasets: [{
          label: 'Nombre total',
          data: [this.totalUsers, this.totalComptes],
          backgroundColor: ['#007bff', '#28a745'],
          borderColor: ['#0056b3', '#1e7e34'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
