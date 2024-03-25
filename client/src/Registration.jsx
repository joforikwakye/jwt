import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Registration = () => {

    const[name, setName] = useState()
    const[email, setEmail] = useState()
    const[password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3000/register", {name, email, password})
        .then(res => {
            navigate('/login')
        }).catch(err => console.log(err))
    }
    return (
        <div>
            <div>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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
                        Register
                    </button>
                </form>
                <p>Already Have an Account</p>
                <button>
                    Login
                </button>

            </div>
        </div>
    );
}

export default Registration;