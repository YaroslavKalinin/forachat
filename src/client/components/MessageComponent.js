import React from 'react';


function Message(props){
    console.log(props.message);
    console.log(props.username);
    return (
        //if it is our message - align left, else - right
        <div className={props.username === props.message.name ? "messages__message" : "messages__message messages__message--right"}>
            { props.message.name + ": " + props.message.content }
        </div>
    );
}

export default Message;