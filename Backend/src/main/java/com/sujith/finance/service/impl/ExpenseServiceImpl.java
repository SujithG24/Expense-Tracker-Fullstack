package com.sujith.finance.service.impl;

import com.sujith.finance.entity.Expense;
import com.sujith.finance.entity.User;
import com.sujith.finance.repository.ExpenseRepository;
import com.sujith.finance.service.ExpenseService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseServiceImpl(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    @Override
    public Expense addExpense(Expense expense, User user) {

        expense.setUser(user);

        return expenseRepository.save(expense);
    }

    @Override
    public List<Expense> getUserExpenses(User user) {

        return expenseRepository.findByUser(user);
    }
    @Override
    public Expense updateExpense(Long id, Expense updatedExpense, User user) {

        Expense existingExpense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        // Security check: make sure expense belongs to logged-in user
        if (!existingExpense.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access");
        }

        existingExpense.setTitle(updatedExpense.getTitle());
        existingExpense.setAmount(updatedExpense.getAmount());
        existingExpense.setCategory(updatedExpense.getCategory());
        existingExpense.setDate(updatedExpense.getDate());

        return expenseRepository.save(existingExpense);
    }
    @Override
    public void deleteExpense(Long id, User user) {

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (!expense.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access");
        }

        expenseRepository.delete(expense);
    }


}
