Expense Tracker Full Stack

A full stack expense tracker application built using **Spring Boot, React, MySQL, and JWT Authentication**.

Features

* User Registration and Login
* Secure Authentication using JWT
* Add Expense
* Delete Expense
* Category Based Filtering
* Total Expense Calculation
* Monthly Expense Analytics Chart
* MySQL Database Storage

Tech Stack

Frontend

* React
* Tailwind CSS
* Axios
* Chart.js

Backend

* Spring Boot
* Spring Security
* JWT Authentication
* JPA / Hibernate

Database

* MySQL

Project Structure

expense-tracker
├── backend (Spring Boot API)
├── frontend (React Application)

How to Run the Project

Run Backend

cd backend
mvn spring-boot:run

Backend runs on

http://localhost:8080

### Run Frontend

cd frontend
npm install
npm run dev

Frontend runs on

http://localhost:5173

API Endpoints

POST /api/auth/register
POST /api/auth/login
GET /api/expenses
POST /api/expenses
DELETE /api/expenses/{id}

Future Improvements

* Edit Expense Feature
* Export Expense Reports
* User Profile Management
* Advanced Analytics

Author

Sujith
