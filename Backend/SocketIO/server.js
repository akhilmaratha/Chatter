import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

// realtime message code goes here
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

const users = {};

// used to listen events on server side.
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  
  if (userId) {
    users[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(users));
  }

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

export const emitMessage = (receiverId, senderId, message) => {
  const receiverSocketId = users[receiverId];
  const senderSocketId = users[senderId];

  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", message);
  }
  if (senderSocketId) {
    io.to(senderSocketId).emit("newMessage", message);
  }
};

export { app, io, server, users };
