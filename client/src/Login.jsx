import { useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    axios.defaults.withCredentials = true

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3000/login", { email, password })
            .then(res => {
               if(res.data.Login) {
                console.log(res)
                   navigate('/dashboard')
               } else {
                   navigate('/')
               }
               
            }).catch(err => console.log(err))
    }
    return (
        <div>
            <div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                  
                    <div >
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div >
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">
                        Login
                    </button>
                </form>
                <p>Don't have an account?</p>
                <button>
                   Register
                </button>

            </div>
        </div>
    );
}

export default Login;