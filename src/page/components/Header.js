import {useState, useEffect} from 'react'

import AddServerPopup from './AddServerPopup'


function Header(props) {
    const [showPopup, setShowPopup] = useState(false);
    function addServer() {
        setShowPopup(state => !state)
    }
    return (
        <div>
            <button onClick={addServer}>add server</button>
            {showPopup && <AddServerPopup 
                                setShowPopup={setShowPopup}
                                uid={props.uid}
                                socket={props.socket}
                          />}
        </div>
    )
}

export default Header




