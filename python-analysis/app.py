from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2
import pandas as pd

app = Flask(__name__)
CORS(app)

def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="finance_tracker",
        user="postgres",
        password="260399",
        port="5432"
    )
    return conn

@app.route("/")
def index():
    return "Finance Analysis API"

@app.route("/analysis/summary")
def summary():
    conn = get_db_connection()

    df = pd.read_sql_query("SELECT * FROM transactions", conn)
    conn.close()
    
    total_income = df[df["type"] == "income"]["amount"].sum()
    total_expenses = df[df["type"] == "expense"]["amount"].sum()
    balance = total_income - total_expenses

    return jsonify({
        "total_income": round(float(total_income), 2),
        "total_expenses": round(float(total_expenses), 2),
        "balance": round(float(balance), 2)
    })

@app.route("/analysis/by-category")
def by_category():
    conn = get_db_connection()
    df = pd.read_sql("""
        SELECT t.amount, t.type, c.name as category_name 
        FROM transactions t 
        JOIN categories c ON t.category_id = c.id
    """, conn)
    conn.close()

    by_category = df[df["type"] == "expense"].groupby("category_name")["amount"].sum().reset_index()
    
    return jsonify(by_category.rename(columns={
        "category_name": "category",
        "amount": "total"
    }).to_dict(orient="records"))

@app.route("/analysis/monthly")
def monthly():
    conn = get_db_connection()
    df = pd.read_sql("SELECT amount, type, date FROM transactions", conn)
    conn.close()

    df["date"] = pd.to_datetime(df["date"])
    df["month"] = df["date"].dt.strftime("%Y-%m")

    monthly_income = df[df["type"] == "income"].groupby("month")["amount"].sum()
    monthly_expenses = df[df["type"] == "expense"].groupby("month")["amount"].sum()

    months = sorted(set(monthly_income.index) | set(monthly_expenses.index))

    result = []
    for month in months:
        result.append({
            "month": month,
            "income": round(float(monthly_income.get(month, 0)), 2),
            "expenses": round(float(monthly_expenses.get(month, 0)), 2)
        })

    return jsonify(result)


if __name__ == "__main__":
    app.run(port=5000, debug=True)