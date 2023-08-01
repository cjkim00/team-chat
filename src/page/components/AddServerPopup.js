import style from './addserverpopup_style.css'
import {useState, useEffect} from 'react'

function AddServerPopup(props) {
    const [serverName, setServerName] = useState('')
    function onButtonPressed() {
        props.setShowPopup(false)
        console.log('SERVER ADDED')
        props.socket.emit('create_server', {servername: serverName, uid: props.uid})
    }
    return (
        <div className='addServerPopup--div'>
            <input 
                type='text'
                className='addServerPopup--input'
                placeholder='Server Name'
                onChange={(e) => setServerName(e.target.value)}
            />
            <button className='addServerPopup--button' onClick={onButtonPressed}>Create Server</button>
        </div>
    )
}

export default AddServerPopup