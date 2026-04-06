package com.example.finance_tracker.controller;

import com.example.finance_tracker.model.Transaction;
import com.example.finance_tracker.service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions(){
        return ResponseEntity.ok(transactionService.getAllTransactions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Transaction>> getTransaction(@PathVariable Long id){
        return ResponseEntity.ok(transactionService.getTransactionById(id));
    }

    @PostMapping
    public ResponseEntity<Transaction> postTransaction(@RequestBody Transaction transaction){
        return ResponseEntity.ok(transactionService.createTransaction(transaction));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> putTransaction(@PathVariable Long id, @RequestBody Transaction transaction){
        return ResponseEntity.ok(transactionService.updateTransaction(id, transaction));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id){
        transactionService.deleteTransaction(id);
        return ResponseEntity.noContent().build();
    }
}
