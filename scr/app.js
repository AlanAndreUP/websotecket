const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;
const WebSocket = require('ws');
require('dotenv').config();
const { getInitialMessage, processMessage } = require('./routes/chatbot');
const uri = process.env.MONGODB_URI;


app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));




const wss = new WebSocket.Server({ port: port });


wss.on('connection', (ws) => {
  ws.send(getInitialMessage());

  ws.on('message', (message) => {
      const response = processMessage(message);
      ws.send(response);
  });
});


