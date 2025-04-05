# 📦 DeliveryScout – Frontend

DeliveryScout is a modern React-based frontend application that allows users to compare delivery services based on parcel size, weight, destination, eco-friendliness, speed, and price. It connects to a Flask + MongoDB backend API to fetch courier data and calculate the best delivery options.

## Live Demo  
[View on GitHub Pages](https://jordans15.github.io/deliveryscout-frontend/)

---

## Key Features

- Enter parcel dimensions and weight
- Select destination and sort by **Price**, **Speed**, or **Eco Rating**
- Toggle to filter for eco-friendly options only
- Loading indicator during data fetch
- JWT-based authentication system (Register / Login / Logout)
- Mobile-responsive layout
- Dark mode toggle for accessibility
- Scroll-to-top button for improved UX
- “Visit Website” button to view courier’s official site

---

## Tech Stack

- **Frontend:** React, JavaScript, CSS
- **Backend:** Flask, Python, MongoDB Atlas (see backend repo)
- **Deployment:** GitHub Pages (Frontend), Render (Backend)

---

## API Connection

The frontend interacts with the backend via RESTful API endpoints hosted on [Render](https://render.com/). Key routes include:

- `POST /compare` – Fetch filtered delivery options
- `POST /register` – Register new users
- `POST /login` – Authenticate and receive JWT

Tokens are stored in `localStorage` and used to control session state in the UI.

---

## Deployment (GitHub Pages)

This project is deployed using [GitHub Pages](https://pages.github.com/).

## Project Structure

src/
├── components/
│   ├── LoginForm.js
│   ├── RegisterForm.js
│   ├── ParcelForm.js
│   ├── ResultsList.js
│   └── ScrollToTop.js
├── App.js
├── App.css
├── index.js
└── index.css

## Getting Started

1. Clone the repo:

```bash
git clone https://github.com/jordans15/deliveryscout-frontend.git
cd deliveryscout-frontend
npm install
npm start

## Acknowledgements

- [Create React App](https://create-react-app.dev/)
- [Render](https://render.com/) – For backend hosting
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) – Cloud database
- [GitHub Pages](https://pages.github.com/) – For frontend deployment
