# Stock Management System

This is a **MERN stack application** for managing stock, allowing users to **add, edit, delete, and view products**, along with stock details and revenue analytics.

## Features
- **Product Management:** Add, edit, delete, and list products.
- **Stock Overview:** View available stock, total items sold, and revenue.
- **Authentication:** JWT-based login and protected routes.
- **CSV Import/Export:** Upload and download stock data.
- **Data Visualization:** Charts for stock trends using Chart.js.
- **Sorting & Filtering:** Filters for stock analysis as search bar, preferred format results.

---

## Installation & Setup

### 1. Clone the Repositories

#### Frontend
```sh
git clone https://github.com/Shaikr786/Stock-Management-System.git
cd Stock-Management-System
```

#### Backend
```sh
git clone https://github.com/Shaikr786/Stock-Management-Api
cd Stock-Management-Api
```

---

### 2. Install Dependencies  

#### Backend Setup
```sh
npm install
```

#### Frontend Setup
```sh
npm install
```

---

### 3. Set Up Environment Variables  

Create a `.env` file in the **backend** directory and add:  
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Replace your `BASE_URL` with localhost in the frontend file `utils/api.js`:
```
BASE_URL="http://localhost:5000/api"
```

---

### 4. Run the Application  

#### Start Backend
```sh
cd Stock-Management-Api
npm run dev
```

#### Start Frontend
```sh
cd Stock-Management-System
npm run dev
```

Now, visit **`http://localhost:5173`** in your browser.

---

## Deployment  

### **Backend (Vercel)**
For **Vercel**:
1. Push backend code to GitHub.
2. Create a new **Vercel Project** and link your repository.
3. Set the environment variables in Vercel settings.

### **Frontend (Vercel)**
1. Update the `BASE_URL` in `api.js` from the `utils` folder to the deployed backend API.
2. Create a `vercel.json` file to configure the project for deployment.
3. Push the frontend code to GitHub (new or existing repo).
4. Create a new project in **Vercel**, import the frontend repo, and click **Deploy**.
