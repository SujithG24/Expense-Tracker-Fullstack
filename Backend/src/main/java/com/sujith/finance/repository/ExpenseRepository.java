package com.sujith.finance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.sujith.finance.entity.Expense;
import com.sujith.finance.entity.User;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByUser(User user);
}
