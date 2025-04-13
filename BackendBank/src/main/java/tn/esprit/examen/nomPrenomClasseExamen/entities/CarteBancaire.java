package tn.esprit.examen.nomPrenomClasseExamen.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
public class CarteBancaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idCarte;

    @Column(nullable = false)
    private String typeCarte; // Basic, Premium, Gold

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date dateExpiration;

    @Column(nullable = false)
    private String statut; // Active, Expirée, En cours
    private Long numCarte;

    @ManyToOne
    @JsonIgnore
    CompteBancaire comptebancaire;



}
