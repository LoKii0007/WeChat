import { Server } from "socket.io";

const io = new Server(9000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let users = [];

const addUser = (userData, socketId) => {
  !users.some((user) => user.sub === userData.sub) && users.push({ ...userData, socketId });
};

const getUser = (userId) => {
  const user = users.find((user) => user.sub === userId);
  // console.log("getUser - userId:", userId, "user:", user);
  return user;
};

io.on("connection", (socket) => {
  console.log("user connected");

  //on matlab socket us event ko listen karega jab vo event ho to particular fn perform ho
  socket.on("addUsers", (userData) => {
    addUser(userData, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", (data) => {
    // console.log("sendmessage data",data)
    const user = getUser(data.recieverId);
    // console.log("user:", user)
    if (user) {
      io.to(user.socketId).emit("getMessage", data);
    } else {
      console.log("User not found");
    }
  });
});
