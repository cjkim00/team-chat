import style from "./user_servers_style.css"
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client'
//const socket = io.connect('http://localhost:4000')
function UserServers(props) {
    const [showList, setShowList] = useState(false)
    
    function serverClicked() {
        props.setServerid(props.serverid)
        //console.log("SERVERID: " + props.serverid)
        //setShowList(set => !set)
        
        props.socket.emit('join_room', {
            serverid: props.serverid,
            uid: props.uid,
            firstName: props.firstName,
            lastName: props.lastName
        })
        
    }

    //temporary useEffect

    useEffect(() => {
        props.socket.on('server_test', (data) => {
            //console.log("test of server emit")
            //console.log(data)
        })
        return () => props.socket.off('server_test')
    }, [props.socket])


    return(
        <div className="userservers--div" onClick={serverClicked}>
            <p>{props.server}</p>
            {showList && <ul className="userservers--test--list">
                <li>item 1</li>
                <li>item 2</li>
                <li>item 3</li>
                <li>item 4</li>
                <li>item 5</li>
            </ul>}
        </div>
    )
}

export default UserServers;