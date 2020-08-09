import React from 'react';

function Loading(props) { 
    return (
        <div className="loading">
            <span className="loading__spinner"/>
            <div className="loading__text">
                {props.message}
            </div>
        </div>
    )
}

export default Loading;