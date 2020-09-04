import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import socketIOClient from "socket.io-client";
import CreateRoom from "./routes/CreateRoom";
import Room from "./routes/Room";
const ENDPOINT = "https://screen-be.herokuapp.com/";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  return (
        <div className="App">
          It's <time dateTime={response}>{response}</time>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={CreateRoom} />
            <Route path="/room/:roomID" component={Room} />
          </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;