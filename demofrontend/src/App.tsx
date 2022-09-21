import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
    })

    const PAGES = {
        LOGIN: 'login',
        REGISTER: 'register',
    }

    const [currentPage, setCurrentPage] = useState(PAGES.REGISTER)

    const register = async () => {
        // here were going to send the
        // values to our server's '/login' endpoint
        console.log("value", formValues)

        const loginResponse = await axios.post('http://localhost:4000/register-user', {
            username: formValues.username,
            password: formValues.password
        })

        console.log("**RESPONSE FROM SERVER", loginResponse?.data)

    }
    const login = async () => {
        // here were going to send the
        // values to our server's '/login' endpoint
        console.log("value", formValues)

        const loginResponse = await axios.post('http://localhost:4000/register-user', {
            username: formValues.username,
            password: formValues.password
        })

        console.log("**RESPONSE FROM SERVER", loginResponse?.data)

    }

  return (
    <div className="App">
       {currentPage === PAGES.LOGIN ? (<>
            <button onClick={() => setCurrentPage(PAGES.LOGIN)}>Go to login</button>
            <p>Login here</p>
            <input value={formValues.username} onChange={(e) => setFormValues({...formValues, username: e.target.value})} placeholder='Username' />
            <input value={formValues.password} onChange={(e) => setFormValues({...formValues, password: e.target.value})} placeholder='Password' />
            <button style={{height: 30, width: 100, backgroundColor: 'blue', color: 'white'}} onClick={() => login()} />
        </>) : (
        <>
            <button onClick={() => setCurrentPage(PAGES.REGISTER)}>Go to login</button>
            <p>Register here</p>
            <input value={formValues.username} onChange={(e) => setFormValues({...formValues, username: e.target.value})} placeholder='Username' />
            <input value={formValues.password} onChange={(e) => setFormValues({...formValues, password: e.target.value})} placeholder='Password' />
            <button style={{height: 30, width: 100, backgroundColor: 'blue', color: 'white'}} onClick={() => register()} />
        </>)}
    </div>
  );
}

export default App;
