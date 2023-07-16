import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'


function Home(props) {
    const navigate = useNavigate();
    function onNav() {
        navigate("/login")
    }

    function onReg() {
        navigate("/register")
    }
    return(
        <div>
            <h1>Home</h1>
            <button onClick={onNav}>Go to login</button>
            <button onClick={onReg}>Go to register</button>
        </div>
    )
}

export default Home;