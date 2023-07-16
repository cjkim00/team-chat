import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

import io from 'socket.io-client'

const socket = io.connect('http://localhost:4000')

function Register(props) {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        //e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user
                const uid = userCredential.user.uid
                const data = {}
                console.log("USER: " + userCredential.user.uid)
                socket.emit('add_user',{id: uid, email: email})
                //navigate("/login")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            });


    }

    function testSubmit() {
        onSubmit()
    }

    return (
        <div className='register--div'>
            <h1 className='register--text'>Register</h1>
            <input
                className='register--email--input'
                placeholder='Enter email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <input
                className='register--password--input'
                placeholder='Enter password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button onClick={testSubmit}>Test</button>
        </div>
    )
}

export default Register;