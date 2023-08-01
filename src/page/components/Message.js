import styles from './message_style.css'
import { useState, useEffect, useRef } from 'react';


function Message(props) {
    //console.log("message rendered: " + props.message)
    return (
        <div className='message--div'>
            <p>{`${props.firstName} ${[props.lastName]}`}</p>
            <p>{props.message}</p>
        </div>
    )
}

export default Message;