import React from 'react';


function Message(props){
    return (
        <div className="messages__message">
            { props.message.name + ": " + props.message.content }
        </div>
    );
}

export default Message;