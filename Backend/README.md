Finance Expense Tracker API

A RESTful backend application built using Spring Boot that allows users to manage their expenses securely using JWT Authentication.

 🔥 Features
- User Registration & Login
- JWT Authentication
- Add Expense
- Update Expense
- Delete Expense
- Get All Expenses
- Global Exception Handling

 🛠 Tech Stack
- Java 17
- Spring Boot
- Spring Security
- JWT
- Hibernate / JPA
- MySQL
- Maven

📂 API Endpoints

 Authentication
POST /api/auth/register  
POST /api/auth/login  

 Expense
POST /api/expenses  
GET /api/expenses  
PUT /api/expenses/{id}  
DELETE /api/expenses/{id}  

 🔐 Security
- Stateless authentication
- JWT based authorization
- Protected endpoints

🚀 How to Run

1. Clone the repository
2. Configure MySQL in application.properties
3. Run FinanceApplication.java
4. Use Postman to test endpoints

---

Built by Sujith
