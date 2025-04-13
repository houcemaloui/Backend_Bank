package tn.esprit.examen.nomPrenomClasseExamen.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.examen.nomPrenomClasseExamen.entities.CompteBancaire;
import tn.esprit.examen.nomPrenomClasseExamen.entities.Transaction;
import tn.esprit.examen.nomPrenomClasseExamen.services.CompteBancaireService;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/auth/comptes")
public class CompteBancaireController {
    @Autowired
    CompteBancaireService compteBancaireService;

    @GetMapping("/getall")
    public List<CompteBancaire> getAllComptes() {
        return compteBancaireService.getAllComptes();
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<CompteBancaire> getCompteById(@PathVariable Long id) {
        Optional<CompteBancaire> compte = compteBancaireService.getCompteById(id);
        return compte.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/ajouterCompte")
    public CompteBancaire addCompte(@RequestBody CompteBancaire compte) {
        return compteBancaireService.addCompte(compte);
    }


   /* @PutMapping("/update/{id}")
    public ResponseEntity<Void> updateCompte(@PathVariable Long id, @RequestBody CompteBancaire compte) {
        compteBancaireService.updateCompte(id, compte.getTypecompte(), compte.getSolde());
        return ResponseEntity.ok().build();
    }*/

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCompte(@PathVariable Long id) {
        compteBancaireService.deleteCompte(id);
        return ResponseEntity.noContent().build();
    }


    @PostMapping("/ajouter")
    public void ajouterCompteBancaire(@RequestParam Long userId,
                                      @RequestParam String typecompte,
                                      @RequestParam float solde) {
        compteBancaireService.ajouterCompteBancaire(userId, typecompte, solde);
    }

    @PostMapping("/transfer")
    public ResponseEntity<String> transferMoney(
            @RequestParam Long senderId,
            @RequestParam Long receiverId,
            @RequestParam float amount) {

        String result = compteBancaireService.transferMoney(senderId, receiverId, amount);

        if (result.equals("Transaction successful")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }
    @PutMapping("/approuver/{id}")
    public ResponseEntity<CompteBancaire> approuverCompte(@PathVariable Long id) {
        Optional<CompteBancaire> compteOptional = compteBancaireService.getCompteById(id);

        if (compteOptional.isPresent()) {
            CompteBancaire compte = compteOptional.get();
            compte.setApproved(true);
            compteBancaireService.addCompte(compte);
            return ResponseEntity.ok(compte);
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/getByUserId/{userId}")
    public List<CompteBancaire> getComptesByUserId(@PathVariable Long userId) {
        return compteBancaireService.getComptesByUserId(userId);
    }

    @GetMapping("/sender/{numCompte}")
    public ResponseEntity<List<Transaction>> getTransactionsBySender(@PathVariable Long numCompte) {
        List<Transaction> transactions = compteBancaireService.getTrasactionBySender(numCompte);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/receiver/{numCompte}")
    public ResponseEntity<List<Transaction>> getTransactionsByReceiver(@PathVariable Long numCompte) {
        List<Transaction> transactions = compteBancaireService.getTransactionByReceiver(numCompte);
        return ResponseEntity.ok(transactions);
    }



    }
