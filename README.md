# 💸 Personal Finance Visualizer - Stage 1

A simple web application to track personal expenses. Built for Yardstick's Full-Stack Internship Assignment.

## 🚀 Features (Stage 1)
- Add / Edit / Delete transactions (amount, date, description)
- Transaction list with recent entries
- Bar chart showing monthly expenses (last 3/6/12 months)
- Responsive UI using shadcn/ui
- Clean and minimal UX with basic error handling

## 📊 Features (Stage 2)
- All Stage 1 features +
- Predefined categories for transactions
- Category-wise pie chart for expense breakdown
- Dashboard with summary cards:
- Total expenses this month
- Most spent category
- Total transactions

## 🎯 Features (Stage 3)
- All Stage 2 features +
- Set monthly budgets per category
- Budget vs Actual comparison chart
- Insights:
    - Overspending warnings
    - Under budget highlights
    - Categories with no budgets
    - Summary insights

## 🧑‍💻 Tech Stack
- Next.js 14 (App Router)
- React
- shadcn/ui + TailwindCSS
- Recharts
- MongoDB + Mongoose
- Vercel (deployment)

## 📦 Folder Structure

```
/app
  /api
    /transactions      # API routes for transaction CRUD
    /budgets           # API routes for budget CRUD
  /home                # Homepage for all sections
/components
  /transactions        # Transaction form, list, bar chart
  /budget              # Budget form, list, chart, insights
  /shared              # Loader, delete dialog, month/year picker
/constants             # Categories and reusable config
/lib                   # Database setup, utilities, formatters
/models                # Mongoose schemas (Transaction, Budget)

```


## 🛠 Setup ()
1. Clone the repo  
    ```bash
    git clone https://github.com/Nikhil-0010/personal-finance-tracker.git
    cd personal-finance-tracker
    ```
2. Install dependencies
    ```bash
    npm install
    ```
3. Configure environment variables
    Create a .env.local file and add your MongoDB URI:

4. Run `npm run dev`  


This repository contains all three stages of the Yardstick Full-Stack Internship assignment.
## 🌐 Deployment

Live Demo: [https://personal-finance-tracker-mocha-eta.vercel.app/]

✅ The submission for Stage 1, 2, 3 is tagged as stage-1.Each stage of the assignment is tagged for clarity:
-  stage-1
-  stage-2
-  stage-3

Use these tags to view code state per stage.View it using:

GitHub Repo (Stage 1): https://github.com/Nikhil-0010/personal-finance-tracker/tree/stage-1
GitHub Repo (Stage 2): https://github.com/Nikhil-0010/personal-finance-tracker/tree/stage-2
GitHub Repo (Stage 3): https://github.com/Nikhil-0010/personal-finance-tracker/tree/stage-3
