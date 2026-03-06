package com.sujith.finance.controller;

import com.sujith.finance.entity.Expense;
import com.sujith.finance.entity.User;
import com.sujith.finance.repository.UserRepository;
import com.sujith.finance.service.ExpenseService;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;
    private final UserRepository userRepository;

    public ExpenseController(ExpenseService expenseService,
                             UserRepository userRepository) {
        this.expenseService = expenseService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Automatically set today's date
        expense.setDate(java.time.LocalDate.now());

        return expenseService.addExpense(expense, user);
    }

    // GET - Get Logged-in User Expenses
    @GetMapping
    public List<Expense> getUserExpenses() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return expenseService.getUserExpenses(user);
    }
    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id,
                                 @RequestBody Expense expense) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return expenseService.updateExpense(id, expense, user);
    }
    @DeleteMapping("/{id}")
    public String deleteExpense(@PathVariable Long id) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        expenseService.deleteExpense(id, user);

        return "Expense deleted successfully";
    }


}
