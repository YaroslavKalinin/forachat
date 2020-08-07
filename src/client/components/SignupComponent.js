import React from 'react';

function Signup() { 
    return (
        <form className="form">
            <h1 className="form__header main-header">Signup</h1>
            <div className="form__line">
                <label htmlFor="username" className="form__label">
                    Username:
                </label>
                <input value="" type="text" name="username" className="form__input"/>
            </div>
            <div className="form__line">
                <label htmlFor="password" className="form__label">
                    Password:
                </label>
                <input value="" type="text" name="password" className="form__input"/>
            </div>
            <div className="form__line">
                <label htmlFor="repeat-password" className="form__label">
                    Repeat password:
                </label>
                <input value="" type="text" name="repeat-password" className="form__input"/>
            </div>
            <div className="form__line">
                <input value="signup" type="submit" name="sumbit" className="form__submit"/>
                {/*add link and warnings*/}
            </div>
        </form>
    )
}

export default Signup;