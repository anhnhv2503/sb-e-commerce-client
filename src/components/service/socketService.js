import { Client } from "@stomp/stompjs";

const connectSocket = (callback) => {
  const client = new Client({
    brokerURL: "ws://localhost:8080/ws",
    connectHeaders: {},
    debug: (str) => {
      console.log("Debug", str);
    },
    reconnectDelay: 5000,
    onConnect: () => {
      console.log("Connect");
      client.subscribe("/topic/cart", (message) => {
        try {
          const data = JSON.parse(message.body);
          console.log("Message received: ", data);
          callback(data);
        } catch (error) {
          console.error("Error parsing message: ", error);
        }
      });
    },
    onDisconnect: () => {
      client.deactivate();
      console.log("Disconnected");
    },
  });
  client.activate();
};

export default connectSocket;
