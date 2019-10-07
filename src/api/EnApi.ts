import EnAPI from "@ethernodeio/enapi-client";

const newPort: any = localStorage.getItem("port");
const newHostname: any = localStorage.getItem("hostname");

export const enAPIhttp = new EnAPI({
  transport: {
    type: "http",
    host: newHostname,
    port: newPort,
  },
});

export const enAPIwebSocket = new EnAPI({
  transport: {
    type: "websocket",
    host: "192.168.1.110",
    port: 8421,
  },
});
