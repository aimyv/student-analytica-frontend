import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({children})  =>  {

    const navigate = useNavigate()

    const [user, setUser] = useState(null)

    const handleUserLogin = async (e, credentials) => {
        e.preventDefault()
        try {
            const accountDetails = {
                email: credentials.email,
                password: credentials.password
            }
            const response = await axios.post('http://127.0.0.1:5000/login', accountDetails)
            setUser({
                email: credentials.email,
                password: credentials.password,
                username: response.data.username
            })
            navigate('/')
        } catch(error)  {
            console.log(error)
        }
    }

    const handleUserLogout = async () => {
        await axios.get('http://127.0.0.1:5000/logout')
        setUser(null)
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
            const accountDetails = {
                email: credentials.email,
                username: credentials.name,
                password1: credentials.password1
            }
            setUser(accountDetails)
            console.log('REGISTERED:', response)
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
