require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b8egq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const database = client.db("echoGPTDB");
    const usersCollection = database.collection("users");
    const chatsCollection = database.collection("chats");
    const messagesCollection = database.collection("messages");

    // User-related routes
    // Get user by UID
    app.get('/users/:uid', async (req, res) => {
      const { uid } = req.params;
      const user = await usersCollection.findOne({ uid });
      res.send(user);
    });

    // Update user data
    app.put('/users', async (req, res) => {
      const user = req.body;
      const filter = { email: user.email };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: user.name,
          email: user.email,
          photo: user.photo,
          createdAt: user.createdAt,
          uid: user.uid,
        },
      };
      const result = await usersCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // Chat-related routes
    // Create a new chat
    app.post('/chats', async (req, res) => {
      const { userId, title } = req.body;
      const newChat = { userId, title, createdAt: new Date() };
      const result = await chatsCollection.insertOne(newChat);
      res.send(result);
    });

    // Get all chats for a specific user
    app.get('/chats/:uid', async (req, res) => {
      const { uid } = req.params;
      const chats = await chatsCollection.find({ userId: uid }).sort({ createdAt: -1 }).toArray();
      res.send(chats);
    });

    app.get('/chatdetails/:id', async (req, res) => {
      const { id } = req.params;
      const chat = await chatsCollection.findOne({ _id: new ObjectId(id) });
      res.send(chat);
    });

    // Patch route to update chat title
    app.patch('/chats/:id', async (req, res) => {
      const { id } = req.params;
      const { title } = req.body;

      const result = await chatsCollection.updateOne(
        { _id: new ObjectId(id) }, 
        { $set: { title: title } } 
      );

      if (result.modifiedCount === 1) {
        res.send(result);
      }
    });


    app.delete('/chats/:id', async (req, res) => {
      const { id } = req.params;
      const chatDeleteResult = await chatsCollection.deleteOne({ _id: new ObjectId(id) });

      if (chatDeleteResult.deletedCount === 1) {
        const messagesDeleteResult = await messagesCollection.deleteMany({ chatId: id });
        res.send(messagesDeleteResult);
      }
    });

    // Message-related routes
    // Add a new message
    app.post('/messages', async (req, res) => {
      const { chatId, userId, content, role } = req.body;
      const newMessage = { chatId, userId, content, role, timestamp: new Date() };
      const result = await messagesCollection.insertOne(newMessage);
      res.send(result);
    });

    // Get messages for a specific chat
    app.get('/messages/:chatId', async (req, res) => {
      const { chatId } = req.params;
      const messages = await messagesCollection.find({ chatId }).sort({ timestamp: 1 }).toArray();
      res.send(messages);
    });

    console.log("Successfully connected to MongoDB!");
  } finally {
    // Close the MongoDB connection if necessary
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('EchoGPT Chatbot Server is running!');
});

app.listen(port, () => {
  console.log(`EchoGPT server running on port ${port}`);
});