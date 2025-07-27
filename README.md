Pharmacy Platform
A full-stack pharmacy management system built with a Next.js frontend and a Node.js/Express/MongoDB backend. It supports three user roles: admin, salesman, and customer, with features for authentication, medicine management, sales processing, staff management, and customer pinned items. The frontend uses Tailwind CSS for styling and Chart.js for analytics visualizations.

Features

Authentication: JWT-based login and registration for admins, salesmen, and customers.
Admin Dashboard: Manage medicines (CRUD), staff (CRUD), and view sales reports with CSV/PDF exports.
Salesman Interface: Process sales (cash/online payments, UPI/card options) and view sales history.
Customer Interface: Browse medicine catalog, pin items for later, and view store details.
Analytics: Bar chart for cash vs. online sales totals.
Notifications: Email alerts for low stock or expiring medicines.

Project Structure

frontend/: Next.js application with Tailwind CSS and Chart.js.
backend/: Node.js/Express server with MongoDB for data persistence.
backend/routes/: API endpoints for auth, medicines, sales, staff, and pinned items.
backend/models/: Mongoose schemas for User, Medicine, Sale, Staff, and PinnedItem.

Prerequisites

Node.js (v16 or higher)
npm or yarn
MongoDB (local or MongoDB Atlas)
Gmail account for email notifications (optional)

Setup

Clone the Repository:
git clone https://github.com/your-username/pharmacy-platform.git
cd pharmacy-platform


Set Up Backend:

Navigate to the backend directory:cd backend
npm install


Create a .env file in backend/:MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/pharmacy?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password


Run the backend server:npm run dev


Verify at http://localhost:5000/api/medicines using Postman or curl.


Set Up Frontend:

Navigate to the frontend directory:cd ../frontend
npm install


Create a .env.local file in frontend/:NEXT_PUBLIC_API_URL=http://localhost:5000/api


Run the frontend server:npm run dev


Open http://localhost:3000 in your browser.


Test the Application:

Register a user (e.g., username: admin, password: admin123, role: admin).
Log in and test features like adding medicines, processing sales, or pinning items.


Screenshots
the screenshots can be viewed in screenshot folder available in root directory.

Deployment

Backend (Render):

Push to GitHub and create a Web Service on Render.
Set environment variables: MONGODB_URI, JWT_SECRET, PORT, EMAIL_USER, EMAIL_PASS.
Deploy and note the URL (e.g., https://pharmacy-backend.onrender.com).


Database (MongoDB Atlas):

Create a cluster on MongoDB Atlas.
Set up a database user and allow network access (IP: 0.0.0.0/0 for testing).
Update MONGODB_URI in Render.


Frontend (Vercel):

Push to GitHub and create a project on Vercel.
Set NEXT_PUBLIC_API_URL to the backend URL.
Deploy and access at the provided URL (e.g., https://pharmacy-platform.vercel.app).


Update CORS:

In backend/index.js, set cors({ origin: 'https://pharmacy-platform.vercel.app' }).



Contributing

Fork the repository.
Create a branch (git checkout -b feature/your-feature).
Commit changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.

License
This project is licensed under the MIT License. See the LICENSE file for details.
