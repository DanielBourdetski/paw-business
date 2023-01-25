# Paw-Business

Paw-Business is an e-commerce platform built using the MERN stack that allows users to purchase animal products. It features a product management system and a customer management system, both accessed by admins. Users can sign up/login, and the passwords are secured on the server side using bcrypt. JSON web token-based authentication is also incorporated into the project. Users can add products to their cart or mark them as favorites. 

The project includes a fully functional API that connects the frontend to the database. It utilizes React for managing local state and Redux + Redux-toolkit for state management, allowing for efficient and scalable management of the application's global state.

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

3. In each folder (server and client) start the applications

`npm start`

4. The application will be running on http://localhost:3000 for the frontend and on http://localhost:3001 for the backend.
