package tn.esprit.examen.nomPrenomClasseExamen.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.examen.nomPrenomClasseExamen.entities.Transaction;

import java.util.List;

@Repository

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("SELECT t FROM Transaction t WHERE t.sender.numCompte = :numCompte")
    List<Transaction> getTransactionBySender(@Param("numCompte") Long numCompte);

    @Query("SELECT t FROM Transaction t WHERE t.receiver.numCompte = :numCompte")
    List<Transaction> getTransactionByReceiver(@Param("numCompte") Long numCompte);

    @Modifying
    @Query("DELETE FROM Transaction t WHERE t.sender.idCompte = :idCompte")
    void deleteBySenderIdCompte(@Param("idCompte") Long idCompte);


}
