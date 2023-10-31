import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({children})  =>  {

    const navigate = useNavigate()

    const [user, setUser] = useState(null)

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = (loggedInUser);
            setUser(foundUser);
            navigate('/')
        }
    }, []);

    const handleUserLogin = async (e, credentials) => {
        e.preventDefault()
        try {
            const accountDetails = {
                email: credentials.email,
                password: credentials.password
            }
            const response = await axios.post('http://127.0.0.1:5000/login', accountDetails)
            setUser(response.data.username)
            localStorage.setItem('user', response.data.username)
            navigate('/')
        } catch(error)  {
            console.log(error)
        }
    }

    const handleUserLogout = async () => {
        await axios.get('http://127.0.0.1:5000/logout')
        setUser(null)
        localStorage.clear()
    }

    const handleUserRegister = async (e, credentials) => {
        e.preventDefault()
        if (credentials.password1 !== credentials.password2) {
            alert('Passwords do not match!')
            return
        }
        try {
            let response = await axios.post('http://127.0.0.1:5000/register', {
                email: credentials.email,
                username: credentials.name,
                password1: credentials.password1,
                password2: credentials.password2
            })
            setUser(credentials.name)
            console.log('REGISTERED:', response)
            localStorage.setItem('user', credentials.name)
            navigate('/')
        } catch(error) {
            console.log(error)
        }
    }

    const contextData  = {
        user,
        handleUserLogin,
        handleUserLogout,
        handleUserRegister
    }

    return <AuthContext.Provider value={contextData}>{ children }</AuthContext.Provider>
}

export const userAuth = () => {return useContext(AuthContext)}

export default AuthContext
