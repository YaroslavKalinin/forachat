import React, { useState } from 'react';
import { signup } from '../redux/ActionCreators';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        isLoading: state.signup.isLoading,
        error: state.signup.error,
        isAdded: state.signup.isAdded
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signupUser: (username, password) => dispatch(signup(username, password))
    }
}

function Signup(props) {
    //if you are logged in - redirect to room
    if(props.isLoggedIn){
        return <Redirect to="/"/>
    }

    if(props.isLoading){
        return (
            <div>
                awesome spinner
            </div>
        )
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [validation, setValidation] = useState('');

    function onClick(e) {
        e.preventDefault();
        if(!(/^[a-z0-9_]{3,16}$/i.test(username) && /^[a-z0-9_]{3,16}$/i.test(password))){
            setValidation('Password and username should be 16 length character string');
        }
        else if(password !== passwordRepeat){
            setValidation('Password should match');
        }
        else {
            setValidation('');
            props.signupUser(username, password);
        }
    }

    return (
        <form className="form signup">
            <h1 className="form__header main-header">Signup</h1>
            <div className="form__line">
                <label htmlFor="username" className="form__label">
                    Username:
                </label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" className="form__input"/>
            </div>
            <div className="form__line">
                <label htmlFor="password" className="form__label">
                    Password:
                </label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" className="form__input"/>
            </div>
            <div className="form__line">
                <label htmlFor="repeat-password" className="form__label">
                    Repeat password:
                </label>
                <input value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)} type="password" name="repeat-password" className="form__input"/>
            </div>
            <div className="form__line">
                <input value="signup" onClick={ onClick } type="submit" name="sumbit" className="form__submit btn"/>
                <Link to="/login">login</Link>
            </div>
            <div className="form__error">{ validation }</div>
            <div className="form__error">{ props.error }</div>
            <div className="form__success">{ (props.isAdded && !validation) ? "Now you can login" : ""}</div>
        </form>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);