package tn.esprit.examen.nomPrenomClasseExamen.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.examen.nomPrenomClasseExamen.entities.CompteBancaire;
import tn.esprit.examen.nomPrenomClasseExamen.entities.Transaction;
import tn.esprit.examen.nomPrenomClasseExamen.entities.User;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.CompteBancaireRepository;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.TransactionRepository;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class CompteBancaireService {
   @Autowired
   private CompteBancaireRepository compteBancaireRepository;
   @Autowired
   private UserRepository userRepository;
   @Autowired
   private TransactionRepository transactionRepository;

    public List<CompteBancaire> getAllComptes() {
        return compteBancaireRepository.findAll();
    }

    public Optional<CompteBancaire> getCompteById(Long id) {
        return Optional.ofNullable(compteBancaireRepository.findCompteById(id));
    }

    public CompteBancaire addCompte(CompteBancaire compte) {
        return compteBancaireRepository.save(compte);
    }

    /*@Transactional
    public void updateCompte(Long id, String type, float solde) {
        compteBancaireRepository.updateCompte(id, type, solde);
    }*/

    @Transactional
    public void deleteCompte(Long idCompte) {
        transactionRepository.deleteBySenderIdCompte(idCompte); // Supprimer les transactions associées
        compteBancaireRepository.deleteById(idCompte); // Supprimer le compte
    }

    private Long generateUniqueCardNumber() {
        Random random = new Random();
        long cardNumber = (long) (random.nextDouble() * 1e16);
        return cardNumber;
    }

    public void ajouterCompteBancaire(Long userId, String typecompte, float solde) {
        Long numCompte = generateUniqueCardNumber();

        CompteBancaire c = new CompteBancaire();

        c.setNumCompte(numCompte);
        c.setTypecompte(typecompte);
        c.setSolde(solde);
        c.setApproved(false);
        User u= userRepository.findById(userId).get();
        c.setUser(u);


        compteBancaireRepository.save(c);

    }
    public List<CompteBancaire> getComptesByUserId(Long userId) {
        return compteBancaireRepository.getComptesByUserId(userId);
    }

    @Transactional
    public String transferMoney(Long sendernum, Long receivernum, float amount) {
        if (amount <= 0) {
            return "Invalid transfer amount";
        }

        Optional<CompteBancaire> senderOpt = compteBancaireRepository.findByNumCompte(sendernum);
        Optional<CompteBancaire> receiverOpt = compteBancaireRepository.findByNumCompte(receivernum);

        if (senderOpt.isPresent() && receiverOpt.isPresent()) {
            CompteBancaire sender = senderOpt.get();
            CompteBancaire receiver = receiverOpt.get();

            if (sender.getSolde() < amount) {
                return "Insufficient balance";
            }
            sender.setSolde(sender.getSolde() - amount);
            receiver.setSolde(receiver.getSolde() + amount);

            compteBancaireRepository.save(sender);
            compteBancaireRepository.save(receiver);
            Transaction transaction = new Transaction();
            transaction.setSender(sender);
            transaction.setReceiver(receiver);
            transaction.setAmount(amount);
            transaction.setTimestamp(LocalDateTime.now());
            transactionRepository.save(transaction);

            return "Transaction successful";
        } else {
            return "One or both accounts not found";
        }
    }

    public List<Transaction> getTrasactions(){
        return transactionRepository.findAll();
    }

    public List<Transaction> getTrasactionBySender(Long numConmpte){
        return transactionRepository.getTransactionBySender(numConmpte);
    }

    public List<Transaction> getTransactionByReceiver(Long numConmpte){
        return transactionRepository.getTransactionByReceiver(numConmpte);
    }



}
