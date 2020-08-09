import React, { useState } from 'react';
import { authUser } from '../redux/ActionCreators';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        isLoading: state.auth.isLoading,
        error: state.auth.error
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
    const [validation, setValidation] = useState('');

    function onClick(e){
        e.preventDefault();
        if(!(/^[a-z0-9_]{3,16}$/i.test(username) && /^[a-z0-9_]{3,16}$/i.test(password))){
            setValidation('Password and username should be 16 length character string');
        } else {
            setValidation('');
            props.authUser(username, password);
        }
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
    if(props.isLoggedIn){
        return <Redirect to="/"/>
    }

    return (
        <form className="form login">
            <h1 className="form__header main-header">Login ForaChat</h1>
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
                <input onClick={onClick} value="login" type="submit" name="sumbit" className="form__submit btn"/>
                <Link to="/signup" className="link">signup</Link>
            </div>
            <div className="form__error">{ validation }</div>
            <div className="form__error">{props.error}</div>
        </form>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);