# 💸 Personal Finance Visualizer - Stage 1

A simple web application to track personal expenses. Built for Yardstick's Full-Stack Internship Assignment.

## 🚀 Features (Stage 1)
- Add / Edit / Delete transactions (amount, date, description)
- Transaction list with recent entries
- Bar chart showing monthly expenses (last 3/6/12 months)
- Responsive UI using shadcn/ui
- Clean and minimal UX with basic error handling

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
    /api/transactions      # API routes for CRUD operations
    /transactions         # Transactions page UI
/components/transactions # Transaction form, list, and chart components
/lib                    # Utility files (db.js, formatters.js, etc.)
/models                 # Mongoose schemas
```


## 🛠 Setup ()
1. Clone the repo  
2. Run `npm install`  
3. Add MongoDB URI in `.env.local`  
4. Run `npm run dev`  


This repository contains all three stages of the Yardstick Full-Stack Internship assignment.

✅ The submission for Stage 1 is tagged as stage-1.
View it using:

GitHub Repo (Stage 1): https://github.com/Nikhil-0010/personal-finance-tracker/tree/stage-1

