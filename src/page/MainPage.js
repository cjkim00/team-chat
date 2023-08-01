import style from "./main_page_style.css"
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client'
import { useLocation } from 'react-router-dom';

import ServerBar from './components/ServerBar';
import MessageBox from './components/MessageBox';
import Header from './components/Header'


//need to figure out how to make only one connection happen
//3 connects are happening from here, login, and register
const socket = io.connect('http://localhost:4000')

function MainPage() {
    //need to join all servers as the user is logged in
    const data = useLocation()
    const email = data.state.email
    const uid = data.state.uid
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [serverid, setServerid] = useState('')
    //const [servers, setServers] = useState([])

    useEffect(() => {
        socket.emit('user_login', { email: email, uid: uid })
    }, [])
    useEffect(() => {
        socket.emit('load_servers', { uid: uid })
    }, [])
    /*
    useEffect(() => {
        console.log('sent request')
        socket.emit('load_servers', { uid: uid })
        socket.on('user_servers', (data) => {
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
        socket.on('refresh_servers', (data) => {
            console.log('servers refreshed')
            data = JSON.parse(data)
            data = sortServers(data)
            console.log(...data)
            setServers([...data])
        })
    })

    function sortServers(serversArr) {
        return serversArr.sort((a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__))
    }
    */
    
    /*
    useEffect(() => {
        for (let i = 0; i < servers.length; i++) {
            console.log("emit join_room at " + servers[i].serverid)
            socket.emit('join_room', {
                serverid: servers[i].serverid,
                uid: uid,
                firstName: firstName,
                lastName: lastName
            }
            )
        }
    }, [])
    */
    useEffect(() => {
        socket.on('user_info', (data) => {
            data = JSON.parse(data)
            setFirstName(data[0].firstName)
            setLastName(data[0].lastName)
        })
        //return () => socket.off('user_info')
    }, [])

    return (
        <div className='mainpage--div'>
            <Header 
                uid={uid}
                socket={socket}
            />
            <div className='mainpage--server--bar'>
                <ServerBar
                    uid={uid}
                    firstName={firstName}
                    lastName={lastName}
                    setServerid={setServerid}
                    socket={socket}
                    //servers={servers}
                />
                <MessageBox
                    serverid={serverid}
                    firstName={firstName}
                    lastName={lastName}
                    uid={uid}
                    socket={socket}
                />
            </div>
        </div>
    )
}

export default MainPage;

