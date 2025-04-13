package tn.esprit.examen.nomPrenomClasseExamen.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.examen.nomPrenomClasseExamen.entities.Credit;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.CreditRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CreditService {
    @Autowired
    CreditRepository creditRepository;

    public List<Credit> getAllCredits() {
        return creditRepository.findAllCredits();
    }

    public Optional<Credit> getCreditById(int id) {
        return Optional.ofNullable(creditRepository.findCreditById(id));
    }

    public Credit addCredit(Credit credit) {
        return creditRepository.save(credit);
    }

    @Transactional
    public void updateCredit(int id, double montant, int duree, String statut) {
        creditRepository.updateCredit(id, montant, duree, statut);
    }

    @Transactional
    public void deleteCredit(int id) {
        creditRepository.deleteCredit(id);
    }

    public List<Credit> getApprovedCredits() {
        return creditRepository.findApprovedCredits();
    }
}
