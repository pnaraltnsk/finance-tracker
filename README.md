# Finance Tracker

A full-stack personal finance tracking application that lets you log income and expenses, organize them by category, and explore your spending habits through an interactive dashboard.

Built as a self-directed learning project to practice a complete stack: a Java/Spring Boot REST API, a React frontend, a PostgreSQL database, and a Python analytics service.

## Features

- **Transactions** — create, edit, and delete income/expense entries
- **Categories** — assign each transaction to a category (Rent, Groceries, Salary, Utilities, etc.)
- **Dashboard**
  - Summary cards for total income, total expenses, and balance
  - Spending by category (pie chart)
  - Monthly income vs. expenses trend (bar chart)
- Responsive layout that adapts from desktop to mobile
- Dark-mode friendly UI built with shadcn/ui and Tailwind CSS

## Tech Stack

**Frontend**
- React (Vite)
- React Router
- Tailwind CSS + shadcn/ui
- Recharts

**Backend**
- Java / Spring Boot
- PostgreSQL

**Analytics Service**
- Python
- Flask
- Pandas

## Project Structure

```
finance_tracker/
├── src/                  # Spring Boot backend (transactions & categories API)
├── finance-frontend/     # React frontend
├── python-analysis/      # Flask + Pandas analytics API
├── pom.xml
├── run.bat                # Convenience script to run the Spring Boot server
└── README.md
```

## Getting Started

### Prerequisites

- Java 17+
- Node.js 18+
- Python 3.12+
- PostgreSQL

### 1. Database

Create a PostgreSQL database for the project, then update the connection details in:
- `src/main/resources/application.properties` (Spring Boot)
- `python-analysis/app.py` (Flask)

### 2. Backend (Spring Boot)

```bash
./mvnw spring-boot:run
```
Runs on `http://localhost:8080`

### 3. Frontend (React)

```bash
cd finance-frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`

### 4. Analytics API (Python/Flask)

```bash
cd python-analysis
python -m venv venv
venv\Scripts\activate      # Windows
source venv/bin/activate   # Mac/Linux

pip install -r requirements.txt
python app.py
```
Runs on `http://localhost:5000`

All three services need to be running at the same time for the app to work fully.

## API Overview

**Spring Boot** (`localhost:8080`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/transactions` | List all transactions |
| GET | `/transactions/{id}` | Get a single transaction |
| POST | `/transactions` | Create a transaction |
| PUT | `/transactions/{id}` | Update a transaction |
| DELETE | `/transactions/{id}` | Delete a transaction |
| GET | `/categories` | List all categories |

**Flask** (`localhost:5000`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/analysis/summary` | Total income, expenses, and balance |
| GET | `/analysis/by-category` | Spending grouped by category |
| GET | `/analysis/monthly` | Income/expenses grouped by month |

## Roadmap

- [ ] Radial chart for budget goals
- [ ] User authentication
- [ ] Export transactions to CSV
- [ ] Filter and search transactions

## License

This project was built for personal learning purposes.
