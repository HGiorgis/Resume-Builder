# 📝 **Resume Builder** - Full Stack Web Application

Welcome to the **Resume Builder** project! This is a **full-stack** web application designed to help users create, customize, and download professional resumes with ease. The application is built using **React**, **TypeScript**, **Tailwind CSS**, and features a robust **Express** backend.

---

## 🚀 **Tech Stack**

### **Frontend**:
- **React** - A powerful JavaScript library for building user interfaces.
- **TypeScript** - A superset of JavaScript that adds static types for better development experience.
- **Tailwind CSS** - A utility-first CSS framework for fast UI development with a custom design.
- **React Query** - A library for fetching, caching, and syncing server data in React applications. It helps manage asynchronous server-state and makes data fetching and synchronization smoother and more efficient.
  
### **Backend**:
- **Express** - A fast, minimalist web framework for Node.js.
- **Node.js** - A JavaScript runtime environment for building scalable backend services.
- **MongoDB** - A NoSQL database used for storing user data and resume templates.

---

## 🛠️ **Features**

### 📄 **User Features:**
- **Create and Edit Resumes**: Input and edit sections like personal information, work experience, education, skills, and more.
- **Real-time Resume Preview**: Instantly see how your resume looks as you make changes in the form.
- **Download as PDF**: Download your customized resume in PDF format to share or print.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Dark/Light Mode**: Toggle between dark and light themes for personalized user experience.

### 🛠️ **Developer Features:**
- **Backend API**: RESTful API to handle user data, generate resumes, and serve templates.
- **React Query**: Manages data fetching from the backend, stores it in the client, and syncs updates efficiently.
- **PDF Generation**: Use the backend to generate professional PDFs from resume data.
- **State Management**: Use React state for local UI changes, and React Query for backend data fetching.

---

## 💡 **How It Works**

### **Frontend:**
1. **User Input**: The frontend provides forms for users to input their personal information, work experience, education, and skills.
2. **Real-time Preview**: As users fill out their details, they can see a live preview of their resume on the same page.
3. **React Query for Data Fetching**: React Query is used to fetch resume templates and user data from the backend, ensuring the UI is synchronized with the server.
4. **PDF Export**: When the resume is ready, users can download their resume as a PDF.

### **Backend:**
1. **API Endpoints**: The backend provides APIs to save user data, fetch resume templates, and generate PDF files.
2. **MongoDB**: Data such as user information, saved resumes, and templates are stored in MongoDB.
3. **Express Server**: Handles all HTTP requests, provides endpoints, and serves the frontend application.

---

## 🛠️ **Installation**

Follow the steps below to set up the project locally.

### **1. Clone the Repository**

Clone the project to your local machine:

```bash
git clone https://github.com/HGiorgis/Resume-Builder.git
