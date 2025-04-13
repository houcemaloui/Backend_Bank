package tn.esprit.examen.nomPrenomClasseExamen.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.examen.nomPrenomClasseExamen.entities.Credit;
import tn.esprit.examen.nomPrenomClasseExamen.services.CreditService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/credits")
@RequiredArgsConstructor
public class CreditController {
    private final CreditService creditService;

    // 📌 Lire tous les crédits
    @GetMapping
    public List<Credit> getAllCredits() {
        return creditService.getAllCredits();
    }

    @GetMapping("/findbyid/{id}")
    public ResponseEntity<Credit> getCreditById(@PathVariable int id) {
        Optional<Credit> credit = creditService.getCreditById(id);
        return credit.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public Credit addCredit(@RequestBody Credit credit) {
        return creditService.addCredit(credit);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Void> updateCredit(@PathVariable int id, @RequestBody Credit credit) {
        creditService.updateCredit(id, credit.getMontant(), credit.getDuree(), credit.getStatut());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCredit(@PathVariable int id) {
        creditService.deleteCredit(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/approved")
    public List<Credit> getApprovedCredits() {
        return creditService.getApprovedCredits();
    }
}
