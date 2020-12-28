import React, {useState} from 'react';
import axios from 'axios';
import {setTokenAndUser} from "../utils/common";

function Login(props) {
    const [loading, setLoading] = useState(false);
    const email = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);

    const handleLogin = () => {
        setError(null);
        setLoading(true);
        axios.post('http://0.0.0.0:9600/api/v1/login',
            {
                email: email.value,
                password: password.value
            })
            .then((response) => {
                setLoading(false);
                setTokenAndUser(response.data.token, response.data.user)
                props.history.push('dashboard');
            }, (error) => {
                setLoading(false)
                setError(error.response.data)
            })
    }

    return (
        <div>
            Login <br/><br/>
            <div> Email <br/>
                <input type="email" {...email} autoComplete='email'/>
            </div>
            <div style={{marginTop: 10}}>
                Password<br/>
                <input type="password" {...password} autoComplete="new-password"/>
            </div>
            {error && <><small style={{color: 'red'}}>{error}</small><br/> </>}<br/>
            <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin}
                   disabled={loading}/><br/>
        </div>
    );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}

export default Login;