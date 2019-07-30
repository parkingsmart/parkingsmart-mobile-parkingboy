import Stomp from "@stomp/stompjs";

export default {
  connected: false,
  stompClient: null,

  connect(url) {
    return new Promise((resolve, reject) => {
      try {
        let ws = new WebSocket(url);
        ws.onerror = (err) => {
          return reject(err);
        };
        ws.onmessage = (message) => {
          debugger;
          console.log(message);
        };
        this.stompClient = Stomp.over(ws);

        this.stompClient.connect({}, () => {
          this.connected = true;
          resolve();
        });
      } catch (err) {
        return reject(err);
      }
    });
  }
};
