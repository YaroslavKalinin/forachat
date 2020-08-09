import React, { useEffect, useRef } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { socketConnect, authLogoutStart, userLoad, participantsLoad } from '../redux/ActionCreators';
import { connect } from 'react-redux';

import Loading from './LoadingComponent';

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        socketConnecting: state.socket.isConnecting,
        userLoading: state.user.isLoading,
        userId: state.user.id,
        participants: state.participants.participants,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(authLogoutStart()),
        socketConnect: () => dispatch(socketConnect()),
        userLoad: () => dispatch(userLoad()),
        participantsLoad: (roomId) => dispatch(participantsLoad(roomId))
    }
}


function Room(props) { 

    let { id } = useParams();
    useEffect(() => {
        //props.socketConnect();
        //load user once mounted
        props.userLoad();
    }, []);

    //handle logout button
    function onClick(e) {
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
        <div>
            <div className="room">
                <aside className="room__participants">
                    {props.participants.map(participant => {
                       return (<div className="room__participant" key={participant.id}>{participant.username}</div>) 
                    })}
                </aside>
                <button alt="logout" onClick={ onClick }>logout</button>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);