package tn.esprit.examen.nomPrenomClasseExamen.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.examen.nomPrenomClasseExamen.entities.CarteBancaire;
import tn.esprit.examen.nomPrenomClasseExamen.entities.CompteBancaire;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.CarteBancaireRepository;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.CompteBancaireRepository;

import java.util.List;
import java.util.Optional;
import java.util.Date;
import java.util.Random;

@Service
public class CarteBancaireService {
    @Autowired
    CarteBancaireRepository carteBancaireRepository;
    @Autowired
    CompteBancaireRepository compteBancaireRepository;

    public List<CarteBancaire> getAllCartes() {
        return carteBancaireRepository.findAll();
    }
    public Optional<CarteBancaire> getCarteById(int id) {
        return Optional.ofNullable(carteBancaireRepository.findCarteById(id));
    }


    private Long generateUniqueCardNumber() {
        Random random = new Random();
        long cardNumber = (long) (random.nextDouble() * 1e16); // génère un nombre entre 0 et 10^16
        return cardNumber;
    }
    public CarteBancaire addCarte(CarteBancaire carte,Long idCompte) {
        Long numCarte = generateUniqueCardNumber();

        CompteBancaire cp=compteBancaireRepository.findCompteById(idCompte);
        carte.setNumCarte(numCarte);
        carte.setComptebancaire(cp);
        return carteBancaireRepository.save(carte);
    }

    @Transactional
    public void updateCarte(int id, String type, Date date, String statut) {
        carteBancaireRepository.updateCarte(id, type, date, statut);
    }

    @Transactional
    public void deleteCarte(int id) {
        carteBancaireRepository.deleteById(id);
    }

    public List<CarteBancaire> getActiveCartes() {
        return carteBancaireRepository.findActiveCartes();
    }



}
