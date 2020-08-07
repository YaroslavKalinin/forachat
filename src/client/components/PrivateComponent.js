import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { authLogoutStart } from '../redux/ActionCreators';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(authLogoutStart())
    }
}


function Private(props) { 

    //handle logout button
    function onClick(e) {
        props.logout();
    }

    //if not authorized
    if(!props.user){
        return <Redirect to="/login"/>
    }

    return (
        <div>
            <button alt="logout" onClick={ onClick }>logout</button>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Private);