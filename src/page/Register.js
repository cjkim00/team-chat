import styles from './register_style.css'
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
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user
                const uid = userCredential.user.uid
                const data = {}
                console.log("USER: " + userCredential.user.uid)
                socket.emit('add_user', { uid: uid, email: email, firstName: firstName, lastName: lastName})
                navigate("/login")
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
            <div className='register--input--form'>
                <input
                    className='register--input'
                    placeholder='Enter Email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    className='register--input'
                    placeholder='Enter Password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <input
                    className='register--input'
                    placeholder='First Name'
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                />
                <input
                    className='register--input'
                    placeholder='Last Name'
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                />
                <button className='register--input' onClick={onSubmit}>Register</button>
            </div>
        </div>
    )
}

export default Register;