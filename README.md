# Paw-Business

Paw-Business is an e-commerce platform built using the MERN stack that allows users to purchase animal products. It features a product management system, a customer management system, and an admin panel that allows the admin to manage the products, customers, and orders. Users can sign up/login, and the passwords are secured on the server side using bcrypt. JSON web token-based authentication is also incorporated into the project. Users can also add products to their cart or mark them as favorites. The project also includes a fully functional API. It utilizes React for building reusable UI components, managing state and behavior of those components, and Redux and Redux-toolkit for state management, allowing for efficient and scalable management of the application's global state.

In the backend, it uses express for routing and middleware, joi for data validation, mongoose for interacting with MongoDB, nodemailer for sending emails.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installing

1. Clone the repository

`git clone https://github.com/DanielBourdetski/paw-business.git`

2. Install the dependencies in both folders (frontend and backend)

`npm install`

3. Start the backend server in the server folder

`npm start`

4. Start the frontend server in the client folder

`npm start`

5. The application will be running on http://localhost:3000 for the frontend and on http://localhost:3001 for the backend.
