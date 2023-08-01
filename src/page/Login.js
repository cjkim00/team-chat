import styles from './login_style.css'
import { useState, useEffect, useRef } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { NavLink, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:4000')

function Login({navigation}) {
    const navigate = useNavigate();
    const [test, setTest] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [testInput, setTestInput] = useState("")
    const [serverInfo, setServerInfo] = useState([])



    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("Success" + userCredential.user.email)
                //change navigation to an actual route
                //navigate("/home", {email: userCredential.user.email, uid: userCredential.user.uid})
                //socket.emit('load_servers', { uid: userCredential.user.uid })
                navigate('/Home', {state: {email: userCredential.user.email, uid: userCredential.user.uid}})
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage + " EMAIL: " + email + " PASSWORD" + password)
            });
    }
    
    return (
        <div className='login--div'>
            <h1 className='login--text'>Login</h1>
            <form className='login--input--form'>
                <input
                    type='email'
                    className='login--input'
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter Email'
                />

                <input
                    type='password'
                    className='login--input'
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter Password'
                />

                <button className='login--input' onClick={onLogin}>Login</button>
            </form>
        </div>
    )
}

export default Login;