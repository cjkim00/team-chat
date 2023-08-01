import style from "./messagebox_style.css"
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client'

import Message from './Message'

//const socket = io.connect('http://localhost:4000')

function MessageBox(props) {
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const tempServerID = props.serverid

    //console.log("SERVERID: " + tempServerID)
    useEffect(() => {
        props.socket.emit("get_messages", { serverid: tempServerID })
        props.socket.on("load_messages", (data) => {
            data = JSON.parse(data)
            data = sortMessages(data)
            //console.log("message data: ")
            //console.log(...data)
            setMessages([...data])
        })
    }, [tempServerID])

    useEffect(() => {
        props.socket.on('receive_message', (data) => {
            console.log(data.firstName + " " + data.lastName)
            setMessages((state) => [
                ...state,
                {
                    message: data.message,
                    uid: data.uid,
                    firstname: data.firstName,
                    lastname: data.lastName
                }
            ])
        })
        return () => props.socket.off('receive_message');
    })

    function sortMessages(messages) {
        return messages.sort((a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__))
    }

    const messageMap = messages.map(data => {
        return <Message
            message={data.message}
            uid={data.uid}
            firstName={data.firstname}
            lastName={data.lastname}
            date={data.__createdtime__}
        />
    })

    function sendMessage() {
        props.socket.emit('send_message', {
            message: message,
            serverid: tempServerID,
            uid: props.uid,
            firstName: props.firstName,
            lastName: props.lastName
        })
        setMessage('')
    }

    return (
        <div className="messagebox--div">
            <div className="messagebox--messages--div">
                {messageMap}
            </div>

            <div className="messagebox--inputs--div">
                <input
                    type="text"
                    className="messagebox--text--input"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <button className="messagebox--send--button" onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default MessageBox;