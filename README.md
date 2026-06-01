# Supermarket POS System

A modern Point of Sale (POS) web application for supermarkets, built using **Spring Boot** and **React**. The system provides billing, inventory management, sales tracking, and receipt generation to streamline daily store operations.

---

# Features

## Product Management

* Add, update, and delete products
* Manage categories
* Track stock quantities
* Barcode support (future enhancement)

## Billing & Checkout

* Product search by name or barcode
* Add items to cart
* Update quantities
* Automatic total calculation
* Generate invoices

## Payment Processing

* Cash payments
* UPI payments
* Card payments
* Balance calculation

## Sales Management

* View sales history
* Search bills by date range
* Reprint invoices
* Daily sales summary

## Inventory Management

* Automatic stock deduction after sales
* Low stock alerts
* Inventory monitoring

## User Management

* Admin login
* Cashier login
* Role-based access control

---

# Technology Stack

## Frontend

* React 19+
* React Router
* Axios

## Backend

* Spring Boot 3.x
* Spring Security
* Spring Data JPA
* Hibernate

## Database

* PostgreSQL (Recommended)
* MySQL (Supported)

## Build Tools

* Maven
* npm

---

# System Architecture

```text
+---------------------+
|     React Client    |
+----------+----------+
           |
           | REST API
           |
+----------v----------+
|   Spring Boot API   |
+----------+----------+
           |
           |
+----------v----------+
|     PostgreSQL      |
+---------------------+
```

---

# Project Structure

```text
supermarket-pos/
│
├── backend/
│   ├── src/main/java/com/pos
│   │   ├── controller
│   │   ├── service
│   │   ├── repository
│   │   ├── entity
│   │   ├── dto
│   │   ├── config
│   │   └── security
│   │
│   ├── src/main/resources
│   │   ├── application.yml
│   │   └── data.sql
│   │
│   └── pom.xml
│
├── frontend/
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── hooks
│   │   ├── context
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# Database Schema

## Product

| Column         | Type      |
| -------------- | --------- |
| id             | BIGINT    |
| barcode        | VARCHAR   |
| name           | VARCHAR   |
| category       | VARCHAR   |
| price          | DECIMAL   |
| stock_quantity | INTEGER   |
| created_at     | TIMESTAMP |

---

## Sale

| Column         | Type      |
| -------------- | --------- |
| id             | BIGINT    |
| bill_number    | VARCHAR   |
| total_amount   | DECIMAL   |
| payment_method | VARCHAR   |
| sale_date      | TIMESTAMP |

---

## Sale Item

| Column     | Type    |
| ---------- | ------- |
| id         | BIGINT  |
| sale_id    | BIGINT  |
| product_id | BIGINT  |
| quantity   | INTEGER |
| unit_price | DECIMAL |
| line_total | DECIMAL |

---

## User

| Column   | Type    |
| -------- | ------- |
| id       | BIGINT  |
| username | VARCHAR |
| password | VARCHAR |
| role     | VARCHAR |

---

# API Endpoints

## Product APIs

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| GET    | /api/products      | Get all products  |
| GET    | /api/products/{id} | Get product by ID |
| POST   | /api/products      | Create product    |
| PUT    | /api/products/{id} | Update product    |
| DELETE | /api/products/{id} | Delete product    |

---

## Sales APIs

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| POST   | /api/sales      | Create sale       |
| GET    | /api/sales      | Get sales history |
| GET    | /api/sales/{id} | Get sale details  |

---

## Authentication APIs

| Method | Endpoint           | Description |
| ------ | ------------------ | ----------- |
| POST   | /api/auth/login    | User login  |
| POST   | /api/auth/register | Create user |

---

# Getting Started

## Prerequisites

* Java 21+
* Maven 3.9+
* Node.js 20+
* PostgreSQL 16+

---

# Backend Setup

Clone the repository:

```bash
git clone https://github.com/your-org/supermarket-pos.git
cd supermarket-pos/backend
```

Configure database in `application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/pos_db
    username: postgres
    password: password

  jpa:
    hibernate:
      ddl-auto: update
```

Run the application:

```bash
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

---

# Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:8080/api
```

Start development server:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Security

* JWT Authentication
* Password Encryption using BCrypt
* Role-Based Access Control (RBAC)
* Protected API Endpoints

---

# Future Enhancements

* Barcode Scanner Integration
* Thermal Printer Support
* GST Invoice Generation
* Customer Loyalty Program
* Supplier Management
* Purchase Orders
* Inventory Reports
* Dashboard Analytics
* Multi-Store Support
* Cloud Deployment

---

# License

Licensed under the MIT License.

---

# Contributors

* Store Owner / Administrator
* Development Team

---

# Version

Current Version: **1.0.0**