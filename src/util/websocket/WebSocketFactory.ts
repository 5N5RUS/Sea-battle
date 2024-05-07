
import { CompatClient, IMessage, Stomp, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const baseUrl = "http://localhost:8080";

let sock: WebSocket | null = null;
let client: CompatClient | null = null;

const WebSocketFactory = (sessionId: string | number, onGetMessage: (message: IMessage | null) => void = () => {}): WebSocketType => {
  const connectEndpoint = "/sea";
  const channel = `/topic/sea/${sessionId};`

  let subscribtion: StompSubscription | null;

  const connect = () => {
    sock = new SockJS(`${baseUrl}${connectEndpoint}`);
    client = Stomp.over(sock);
    client.connect({}, () => {
      if(client) {
        subscribtion = client.subscribe(channel, onGetMessage);
      }
    })
  }

  const updateCallback = (newCallback: (message: IMessage | null) => void) => {
    if (subscribtion) {
      subscribtion.unsubscribe();
      subscribtion = null;
    }
    if (client) {
      subscribtion = client.subscribe(channel, newCallback);
      onGetMessage = newCallback;
    }
  }

  const disconnect = () => {
    if (client ) {
      client.disconnect();
      client = null;
    }
  }

  const unsubscribe = () => {
    if (subscribtion) {
      subscribtion.unsubscribe;
      subscribtion = null;
    }
  }

  const clear = () => {
    if (sock) {
      sock = null;
    }
    if (client) {
      client.disconnect();
      client = null;
    }
  }

  const connected = (): boolean => {
    if (client) {
      return client.connected;
    }
    return false;
  }

  return { connect, disconnect, unsubscribe, clear, updateCallback, connected };
}

export type WebSocketType = {
  connect: () => void,
  disconnect: () => void,
  unsubscribe: () => void,
  clear: () => void,
  updateCallback: (newCallback: (message: IMessage | null) => void) => void,
  connected: () => boolean
}

export default WebSocketFactory;