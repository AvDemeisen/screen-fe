import React from "react";
import { v1 as uuid } from "uuid";
import { Container } from './Room.styles'
const CreateRoom = (props) => {
  function create(path) {
    const id = uuid();
    props.history.push(`/${path}/${id}`);
  }

  return (
    <Container>
      <button onClick={() => create("video-room")}>Create Video-Room</button>
      <button onClick={() => create("share-room")}>Create Share-Room</button>
    </Container>
  );
};

export default CreateRoom;
