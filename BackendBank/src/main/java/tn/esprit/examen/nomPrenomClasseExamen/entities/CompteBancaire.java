package tn.esprit.examen.nomPrenomClasseExamen.entities;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity

public class CompteBancaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCompte;
    private String typecompte;
    private float solde;
    private boolean approved = false ;
    @Column(unique = true)
    private Long numCompte;

    @ManyToOne(cascade = CascadeType.PERSIST)
    User user;
}
