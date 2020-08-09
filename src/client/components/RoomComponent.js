import React, { useEffect, useState, useRef } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { socketConnect, authLogoutStart, userLoad, participantsLoad, sendMessage } from '../redux/ActionCreators';
import { connect } from 'react-redux';

import Loading from './LoadingComponent';
import Message from './MessageComponent';

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        socketConnecting: state.socket.isConnecting,
        userLoading: state.user.isLoading,
        userId: state.user.id,
        username: state.user.name,
        participants: state.participants.participants,
        messages: state.messages.messages
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(authLogoutStart()),
        socketConnect: () => dispatch(socketConnect()),
        userLoad: () => dispatch(userLoad()),
        participantsLoad: (roomId) => dispatch(participantsLoad(roomId)),
        sendMessage: (message) => dispatch(sendMessage(message))
    }
}


function Room(props) { 

    let { id } = useParams();

    const [message, setMessage] = useState('');
    const messagesEndRef = useRef(null)

   //load user once mounted
    useEffect(() => {
        props.userLoad();
    }, []);



    //handle submit
    function onSubmit(e) {
        e.preventDefault();
        if(message){
            //send message
            props.sendMessage(message);
            setMessage('');
        }
    }
    //handle logout button
    function onLogout(e) {
        props.logout();
    }

    //trying socket connection
    if(props.socketConnecting) {
        return <Loading message="connecting socket..."/>;
    }

    //if not authorized
    if(!props.isLoggedIn) {
        return <Redirect to="/login"/>
    }

    //if user not loaded - load and wait
    if(!props.userId){
        return <Loading message="loading user..."/>;
    }

    // not it's time to get your room
    // 1. - if you connect to "/" - redirect to your own room (by user id)
    // 2. - in other ("/:id") case - start loading users and messages!
    if(!id){
        let url = "/" + props.userId;
        console.log(url)
        return <Redirect to={url}/>;
    }

    //if you was redirectred and authorized - it's time to load room participants
    if(props.participants.length === 0){
        props.participantsLoad(id);
        return <Loading message="loading participants..."/>;
    }

    return (
        <div className="room">
            <aside className="participants">
                <h1 className="participants__header">Participants</h1>
                {props.participants.map(participant => {
                   return (<div className="participants__participant" key={participant.id}>{participant.username}</div>) 
                })}
            </aside>
            <div className="chat">
                <button alt="logout"  className="btn btn--secondary" onClick={ onLogout }>logout</button>
                <div className="messages">
                    {props.messages.map((message, index) => {
                        return <Message username={props.username} message={message} key={index}/>
                    }).reverse()}
                    <div ref={messagesEndRef} />
                </div>
                {/*yp, strange name*/}
                <form className="room__sender">
                    <input type="text"  value={message} onChange={(e) => setMessage(e.target.value)} name="input" className="room__sender-input"/>
                    <input type="submit" onClick={ onSubmit } name="submit" className="room__sender-submit btn btn--secondary" value="submit"/>
                </form>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);