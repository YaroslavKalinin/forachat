import React from 'react';

function Error({message}) { 
    return (
        <div className="error-panel">
            <h1 className="main-header">{message}</h1>
        </div>
    )
}

export default Error;