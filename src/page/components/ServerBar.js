import styles from './server_bar_style.css'
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client'

import UserServers from './UserServers';

//const socket = io.connect('http://localhost:4000')

function ServerBar(props) {
    const holdData = null;
    /*
    const [servers, setServers] = useState([])


    useEffect(() => {
        props.socket.emit('load_servers', { uid: props.uid })
        console.log('sent request')
        props.socket.on('user_servers', (data) => {
            data = JSON.parse(data)
            console.log(...data)
            setServers([...data])
        })
        return () => props.socket.off('user_servers')
    }, [])
    */

    const [servers, setServers] = useState([])
    //console.log('PAGE RENDERED')
    useEffect(() => {
        //console.log('sent request')
        props.socket.emit('load_servers', { uid: props.uid })
        props.socket.on('user_servers', (data) => {
            data = JSON.parse(data)
            data = sortServers(data)
            //console.log("data")
            //console.log(...data)
            setServers([...data])
            //console.log("LENGTH: " + servers.length)
            
        })
        //return () => socket.off('user_servers')
    }, [])

    useEffect(() => {
        props.socket.on('refresh_servers', (data) => {
            //console.log('servers refreshed')
            data = JSON.parse(data)
            data = sortServers(data)
            console.log(...data)
            setServers([...data])
        })
        return () => props.socket.off('refresh_servers')
    })


    function sortServers(serversArr) {
        return serversArr.sort((a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__))
    }
    

    const tempMap = servers.map(data => {
        return <UserServers
            firstName={props.firstName}
            lastName={props.lastName}
            setServerid={props.setServerid}
            server={data.servername}
            serverid={data.serverid}
            socket={props.socket}
        />
    })



    return (
        <div className='ServerBar--div'>
            {tempMap}
        </div>
    )
}

export default ServerBar;