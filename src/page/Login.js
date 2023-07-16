import styles from './login_style.css'
import { useState, useEffect, useRef } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { NavLink, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:4000')

function Login(props) {
    const navigate = useNavigate();
    const [test, setTest] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [testInput, setTestInput] = useState("")
    const [serverInfo, setServerInfo] = useState([])



    const onLogin = (e) => {
        //e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("Success" + userCredential.user.email)
                navigate("/home")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage + " EMAIL: " + email + " PASSWORD" + password)
            });
    }

    function testLogin() {
        //onLogin()
        console.log("EMAIL: " + email + " PASSWORD: " + password)
    }

    function testServerLogin() {
        socket.emit('load_servers', 2)
    }

    function testAddUser() {
        socket.emit('add_user', { id: 123, email: "email1@testemail.com" })
    }

    useEffect(() => {
        socket.on('user_servers', (user_servers) => {
            user_servers = JSON.parse(user_servers)
            //console.log(...user_servers)
            //setServerInfo((state) => [...user_servers, ...state])
        })
    })
    //change div login--input--div to a form
    return (
        <div className='login--div'>
            <h1 className='login--text'>Login</h1>
            <form className='login--input--div'>
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