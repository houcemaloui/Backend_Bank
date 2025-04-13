package tn.esprit.examen.nomPrenomClasseExamen.repositories;

        import org.springframework.data.jpa.repository.JpaRepository;
        import org.springframework.data.jpa.repository.Query;
        import org.springframework.data.repository.query.Param;
        import org.springframework.stereotype.Repository;
        import tn.esprit.examen.nomPrenomClasseExamen.entities.CarteBancaire;

        import java.util.Date;
        import java.util.List;

@Repository
public interface CarteBancaireRepository extends JpaRepository<CarteBancaire, Integer> {


    @Query("SELECT c FROM CarteBancaire c")
    List<CarteBancaire> findAllCartes();

    @Query("SELECT c FROM CarteBancaire c WHERE c.idCarte = :id")
    CarteBancaire findCarteById(@Param("id") int id);

    @Query("UPDATE CarteBancaire c SET c.typeCarte = :type, c.dateExpiration = :date, c.statut = :statut WHERE c.idCarte = :id")
    void updateCarte(@Param("id") int id, @Param("type") String type, @Param("date") Date date, @Param("statut") String statut);

    @Query("DELETE FROM CarteBancaire c WHERE c.idCarte = :id")
    void deleteCarte(@Param("id") int id);

    @Query("SELECT c FROM CarteBancaire c WHERE c.statut = 'Active'")
    List<CarteBancaire> findActiveCartes();
}
