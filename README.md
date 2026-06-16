# 🏠❤️ Care Home Frontend (React)

This is the **frontend** for the Care Home Management system using **React + Vite**.

## 🎯 Description

The Care Home Management system is a web application designed to assist nursing staff in managing elderly residents and providing family members with access to important patient information.

The system support two types of users:

👩‍⚕️ Nurses:

- View all residents
- Add new patients
- Manage medicines
- Record daily updates
- Manage events and visits

👨‍👩‍👧 Family Members:

- View patient information
- View prescribed medicines
- View daily nursing updates
- View upcoming events and appointments


Login feature is included with a basic role-based flow (nurse/family). Data is persisted in the backend via PostgreSQL.

## 🧑‍💻 User Requirements

1. **Login** with an username and password
2. The system determines user role whether nurse or family
3. nurse users can:
- View all residents
- Add new patients
- View detailed patients info
- Add, edit, delete medicines
- Record daily updates
- Create and delete events
- View the overall medicine schedule

4. family users can:
- View information for associated patient only. 
- view patient details and condition
- View prescribed medicines and dosage
- View daily updates providing by nurses
- View upcoming events and appointments

5. The app remembers login sessions using `localStorage`

## 🛠️ Technologies

- React
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Lucide React
- LocalStorage (for session persistence)

## 🚀 Getting Started

```bash
- Clone the repo:
git clone git@github.com:Shahed-Alhihi/careHome-Frontend.git

-Navigate to the frontend directory:
cd careHome-Frontend

- install dependencies:
npm install

- Start the development server:
npm run dev

*The application will be available at:
http://localhost:5173/