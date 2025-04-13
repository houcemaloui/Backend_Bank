package tn.esprit.examen.nomPrenomClasseExamen.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.examen.nomPrenomClasseExamen.entities.CompteBancaire;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompteBancaireRepository extends JpaRepository<CompteBancaire, Long> {

    @Query("SELECT c FROM CompteBancaire c")
    List<CompteBancaire> findAllComptes();


    @Query("SELECT c FROM CompteBancaire c WHERE c.idCompte = :id")
    CompteBancaire findCompteById(@Param("id") Long id);
    @Query("SELECT c FROM CompteBancaire c WHERE c.user.id = :userId")
    List<CompteBancaire> getComptesByUserId(@Param("userId") Long userId);

    Optional<CompteBancaire> findByNumCompte(Long numCompte);








}
