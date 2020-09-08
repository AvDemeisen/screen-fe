import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./routes/CreateRoom";
import VideoRoom from "./routes/VideoRoom";
import ShareRoom from "./routes/ShareRoom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={CreateRoom} />
        <Route path="/video-room/:roomID" component={VideoRoom} />
        <Route path="/share-room/:roomID" component={ShareRoom} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;