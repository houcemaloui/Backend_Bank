package tn.esprit.examen.nomPrenomClasseExamen.entities;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
public class Credit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idCredit;

    @Column(nullable = false)
    private double montant;

    @Column(nullable = false)
    private int duree; // Durée en mois

    @Column(nullable = false)
    private String statut; // Approuvé, Refusé, En attente
}
