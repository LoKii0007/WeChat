const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

let activeUsers = [];

wss.on("connection", function connection(ws) {
  console.log('connected to websocket server on 8080');

  ws.on("error", console.error);

  ws.on('message', (data) => {
    const message = JSON.parse(data.toString());

    if (message.type === 'addUser') {
      handleAddUser(message.payload, ws);
    }

    if (message.type === 'message_sent') {
      handleMessageSent(message.payload);
    }
  });

  ws.on('close', () => {
    handleUserDisconnect(ws);
  });
});

function handleAddUser(payload, ws) {
  const user = activeUsers.find(user => user.person.sub === payload.sub);
  if (!user) {
    activeUsers.push({
      person: payload,
      socket: ws
    });
    broadcastActiveUsers();
  }
  console.log('Active users count:', activeUsers.length);
}

function handleMessageSent(payload) {
  const receiver = activeUsers.find(user => user.person.sub === payload.receiver);
  if (receiver) {
    receiver.socket.send(JSON.stringify({
      type: 'update_receiver',
      payload: {
        newMessage: payload.newMessage
      }
    }));
  }
}

function handleUserDisconnect(ws) {
  activeUsers = activeUsers.filter(user => user.socket !== ws);
  broadcastActiveUsers();
  console.log('Active users count:', activeUsers.length);
}

function broadcastActiveUsers() {
  const users = activeUsers.map(user => user.person.sub);
  console.log(users)
  activeUsers.forEach(user => {
    user.socket.send(JSON.stringify({
      type: 'activeUsers',
      payload: users
    }));
  });
}
