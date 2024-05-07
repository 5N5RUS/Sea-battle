import "./index.css";
import "./assets/fonts/pasty-sans.otf";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "src/Store";

import App from "./App";

import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
const sock = new SockJS("http://localhost:8080/sea");
const client = Stomp.over(sock);
client.connect({}, () => {
  client.subscribe("/topic/sea/1", (message) => {
    console.log(message);
  })
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    {/*<Provider store={store}>*/}
    {/*  <App />*/}
    {/*</Provider>*/}
  </BrowserRouter>,
);
