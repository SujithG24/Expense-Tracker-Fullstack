package com.sujith.finance.service;

import com.sujith.finance.entity.Expense;
import com.sujith.finance.entity.User;

import java.util.List;

public interface ExpenseService {

    Expense addExpense(Expense expense, User user);
    Expense updateExpense(Long id, Expense updatedExpense, User user);
    void deleteExpense(Long id, User user);


    List<Expense> getUserExpenses(User user);
}
