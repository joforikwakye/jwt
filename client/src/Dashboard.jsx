import { useEffect , useState} from "react";
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";

const Dashboard = () => {

    const [message, setMessage] = useState()
    const navigate = useNavigate()
    axios.defaults.withCredentials = true

    useEffect(() => {
        axios.get("http://localhost:3000/dashboard")
        .then(res => {
            if(res.data.valid) {
                setMessage(res.data.message)
            } else {
                navigate('/')
            }
        })
        .catch(err => console.log(err))
    })
    return (
        <div>
            <h2>Dashboard {message} </h2>
            </div>
    );
}

export default Dashboard;