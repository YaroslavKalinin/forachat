import React, { useState, useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import socket from '../socket/setupSocket';


function Video(props) {
    const config = {
        iceServers: [
            {
                urls: "stun:stun.l.google.com:19302",
            }
        ]
    }

    var Peer = require('simple-peer');
    var peer;


    const video = useRef(null);

    useEffect(() => {
        //if you are a streamer
        if(props.userId === props.roomId){
            navigator.mediaDevices.getUserMedia({
              video: true,
              audio: true
            })
            .then(stream => {
                peer = new Peer({
                    initiator: true,
                    trickle: false,
                    stream: stream
                });
                video.current.srcObject = stream;
                //add some peer listeners
                peer.on('signal', data => {
                    console.log(data);
                    console.log('broadcaster emit signal');
                    socket.emit('streamer.calling', {signalData: data, from: props.userId});
                })
                socket.on('accepted', (data) => {
                    console.log('accepted');
                    peer.signal(data.signalData);
                });
            })
            .catch((e) => {console.log(e)});
        }
        //if you are wacther
        else {
            console.log('watcher');
                socket.on('hey', (data) => {
                    console.log(data);
                    peer = new Peer({
                       initiator: false,
                       trickle: false
                    });                
                    peer.on('signal', data => {
                        socket.emit('watcher.accept', {signalData: data});
                    })
                    peer.on("stream", stream => {
                        video.current.srcObject = stream;
                    });
                    peer.signal(data.signalData);
                });
        }
    }, [])
    
    //if you are a broadcaster - muted
    if(props.userId === props.roomId){
        return (
            <video ref={ video } muted autoPlay playsInline className="videos__video">
            </video>
        );
    }
    else {
        return (
            <video ref={ video } autoPlay playsInline className="videos__video">
            </video>
        );
    }
}

export default Video;