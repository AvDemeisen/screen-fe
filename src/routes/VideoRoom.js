import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import Peer from "simple-peer";
import { Container, Header, Grid, StyledVideo, VideoContainer } from './Room.styles'
const ENDPOINT = "https://screen-be.herokuapp.com/";


const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, [props.peer]);

    return (
        <VideoContainer><StyledVideo playsInline autoPlay ref={ref} /></VideoContainer> 
    );
}

const VideoRoom = (props) => {
    const [peers, setPeers] = useState([]);
    const [signal, setSignal] = useState(false)
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomID = props.match.params.roomID;

    useEffect(() => {
        socketRef.current = socketIOClient(ENDPOINT);
        navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
    }, [roomID]);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            setSignal(true)
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })
        peer.on("signal", signal => socketRef.current.emit("returning signal", { signal, callerID }))
        peer.signal(incomingSignal);
        return peer;
    }

    return (
        <Container>
            <Header>
            <span>{peers.length < 1 ? "no other people in room" : `${peers.length} other ${peers.length > 1 ? "people are" : "person is"} in this room`}</span>
            </Header>
            <Grid>
                <VideoContainer> <StyledVideo muted ref={userVideo} autoPlay playsInline /></VideoContainer>
                {peers.map((peer, index) => <Video key={index} peer={peer} />)}
            </Grid>
        </Container>
    );
};

export default VideoRoom;