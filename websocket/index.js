const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

let activeUsers = []

wss.on("connection", function connection(ws) {

  ws.on("error", console.error);

  ws.on('message', (data)=>{
    const message = JSON.parse(data.toString())

    if(message.type === 'addUser'){
      const user = activeUsers.find((user)=> user.person.sub === message.payload.sub)
      if(!user){
        activeUsers.push({
          person : message.payload,
          socket : ws
        })
      }

      console.log('Active users count:', activeUsers.length)

      activeUsers.forEach((user)=>{
        user.socket.send(JSON.stringify({
          type : 'activeUsers',
          payload : activeUsers
        }))
      })
    }

    if(message.type === 'message_sent'){
    
      const receiver = activeUsers.find(user => user.person.sub === message.payload.receiver)
      console.log(receiver.person.email)

      if(receiver){
        receiver.socket.send(JSON.stringify({
          type : 'update_receiver',
          payload : {
            newMessage : message.payload.newMessage
          }
        }))
      }
    }
  })

  ws.on('close', function() {
    const updatedUsers = activeUsers.filter(user => user.socket !== ws)
    if(updatedUsers){
      activeUsers = updatedUsers
    }

    activeUsers.forEach((user)=>{
      user.socket.send(JSON.stringify({
        type : 'activeUsers',
        payload : updatedUsers
      }))
    })

    console.log('Active users count:', activeUsers.length)

  });
});
