# 📊 CSVML_APP

A full-stack MERN application that allows users to securely upload CSV files, perform mock machine learning predictions (like salary forecasting), and visualize results in tables and charts.

## 🚀 Features

- 🔐 JWT-based Authentication (Login/Register)
- 📁 CSV Upload & Parsing (via `papaparse`)
- 🤖 Forecasted Salary Prediction
- 📊 Tabular Display + Chart Visualization (Chart.js)
- ⚠️ Route Protection (Frontend + Backend)
- 🚪 Logout Functionality

---

## 🌐 Tech Stack

**Frontend:**
- React.js
- React Router
- Axios
- Bootstrap 5
- Chart.js
- Toastify
- PapaParse

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer
- JSON Web Token (JWT)

---

## 🧠 How It Works

1. **User Authentication:**  
   Register or log in using your credentials. JWT is used to protect secure routes.

2. **Upload CSV:**  
   After login, users can upload a CSV file containing candidate data.

3. **Prediction Logic:**  
   Based on experience and education level, a mock salary is predicted.

   ```js
   Forecasted_Salary = 10000 + (experience * 200) + (education === "Masters" ? 1000 : 0

https://github.com/user-attachments/assets/b9a4cefa-2f2a-43ec-8788-8362a5361493

)
