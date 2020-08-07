import React, { useState } from 'react';
import { authUser } from '../redux/ActionCreators';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        isLoading: state.user.isLoading,
        error: state.user.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authUser: (username, password) => dispatch(authUser(username, password))
    }
}

function Login(props) { 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function onClick(e){
        e.preventDefault();
        props.authUser(username, password);
    }

    //see that super trooper spinner
    if(props.isLoading){
        return (
            <div>
                awesome spinner
            </div>
        )
    }
    //if you are logged in - redirect to room
    if(props.user){
        return <Redirect to="/"/>
    }

    return (
        <form className="form">
            <h1 className="form__header main-header">Login</h1>
            <div className="form__line">
                <label htmlFor="username" className="form__label">
                    Username:
                </label>
                <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" name="username" className="form__input"/>
            </div>
            <div className="form__line">
                <label htmlFor="password" className="form__label">
                    Password:
                </label>
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" className="form__input"/>
            </div>
            <div className="form__line">
                <input onClick={onClick} value="login" type="submit" name="sumbit" className="form__submit"/>
                {/*add link and warnings*/}
            </div>
            <div>{props.error}</div>
        </form>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);