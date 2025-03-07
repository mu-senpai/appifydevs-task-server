
# EchoGPT Server

EchoGPT Server is the backend for the EchoGPT client application. It is built using **Node.js**, **Express**, and **MongoDB** for storing user, chat, and message data. The server handles authentication, manages user and chat data, and processes messages for real-time interactions with EchoGPT.

## Features
- **User Management**: Handle user data, including creating and updating users in MongoDB.
- **Chat Management**: Create, fetch, update, and delete chats for users.
- **Message Management**: Store and retrieve messages for each chat.
- **MongoDB Integration**: Store user data, chat data, and messages in MongoDB.
- **Environment Configuration**: Use environment variables for sensitive data like MongoDB credentials.

## Live Link
You can access the live version of the server here:  
[**EchoGPT Server**](https://echogpt-server.vercel.app/)

This backend server supports the [**EchoGPT Client**](https://echogpt-9bc84.web.app/) application.

## Project Structure

```
appifydevs-task-server/
├── index.js                 # Main entry point for the server
├── .env                     # Environment variables (MongoDB credentials, etc.)
├── package.json             # Project dependencies and scripts
└── node_modules/            # Node modules (installed dependencies)
```

## Installation

To set up the server, follow the steps below:

### 1. Clone the repository
```
git clone https://github.com/mu-senpai/appifydevs-task-server.git
cd echogpt-server
```

### 2. Install dependencies
You will need to install the necessary dependencies for this project.

Using npm:
```
npm install
```

### 3. Set up MongoDB
Make sure to set up your MongoDB database and create the necessary collections (`users`, `chats`, `messages`). 

### 4. Configure environment variables
Create a `.env` file in the root of your project with the following content:

```
DB_USER=your-mongodb-username
DB_PASS=your-mongodb-password
PORT=5000
```

### 5. Run the server
Once you have installed the dependencies and set up MongoDB, you can run the server:

```
npm start
```

This will start the server on `http://localhost:5000`.

## API Endpoints

### User Routes

- **GET /users/:uid**: Get user data by UID.
- **PUT /users**: Update or insert a user in the database.

### Chat Routes

- **POST /chats**: Create a new chat for a user.
- **GET /chats/:uid**: Get all chats for a specific user.
- **GET /chatdetails/:id**: Get details of a specific chat.
- **PATCH /chats/:id**: Update the title of a chat.
- **DELETE /chats/:id**: Delete a specific chat and its associated messages.

### Message Routes

- **POST /messages**: Add a new message to a chat.
- **GET /messages/:chatId**: Get all messages for a specific chat.

## Dependencies

- `express`: Web framework for Node.js.
- `mongodb`: MongoDB driver for interacting with the database.
- `dotenv`: Loads environment variables from a `.env` file.
- `cors`: Middleware for enabling Cross-Origin Resource Sharing (CORS).

## Dev Dependencies

- `nodemon` (Optional): Tool that helps develop Node.js applications by automatically restarting the server when file changes are detected.

## Running Tests

This project does not currently have tests set up. You can run the following command to get a placeholder error message:

```
npm test
```

## Contributing

If you'd like to contribute to the development of EchoGPT Server, feel free to fork this repository, create a new branch, and submit a pull request. Contributions are welcome!