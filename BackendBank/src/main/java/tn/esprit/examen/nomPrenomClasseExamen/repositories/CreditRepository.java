package tn.esprit.examen.nomPrenomClasseExamen.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.examen.nomPrenomClasseExamen.entities.Credit;

import java.util.List;

@Repository
public interface CreditRepository extends JpaRepository<Credit, Integer> {

    @Query("SELECT c FROM Credit c")
    List<Credit> findAllCredits();

    @Query("SELECT c FROM Credit c WHERE c.idCredit = :id")
    Credit findCreditById(@Param("id") int id);

    @Query("UPDATE Credit c SET c.montant = :montant, c.duree = :duree, c.statut = :statut WHERE c.idCredit = :id")
    void updateCredit(@Param("id") int id, @Param("montant") double montant, @Param("duree") int duree, @Param("statut") String statut);

    @Query("DELETE FROM Credit c WHERE c.idCredit = :id")
    void deleteCredit(@Param("id") int id);

    @Query("SELECT c FROM Credit c WHERE c.statut = 'Approuvé'")
    List<Credit> findApprovedCredits();
}
