import {useState, useContext, createContext, useEffect} from 'react'
import api from '../api';

import { useAppData } from './AppDataProvider';

// Create context
const AuthContext = createContext();

function AuthProvider({ children }) {
    const { loadUserData, clearUserData } = useAppData();

    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState( 
        () => localStorage.getItem('accessToken')
    );
    const [refreshToken, setRefreshToken] = useState( 
        () => localStorage.getItem('refreshToken')
    );
    const [loading, setLoading] = useState(true)
    
    const isAuthenticated = !!accessToken


    // Login 
    const login = async (credentials) => {
        try {
            const tokenResponse = await api.post(
                '/api/account/token/',
                credentials
                )

            const { access, refresh } = tokenResponse.data;

            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);
            
            setAccessToken(access);
            setRefreshToken(refresh);

            api.defaults.headers.common.Authorization = `Bearer ${access}`
            
            const userResponse = await api.get("/api/account/user/")
            setUser(userResponse.data)

            // load user data
            loadUserData(access);

        } catch (error) {
            throw error
        }  
    };

    // Logout
    const logout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        delete api.defaults.headers.common.Authorization;
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
        clearUserData();
        console.log('Logout successful.')
    }

    useEffect(()=>{
        const initAuth = async ()=>{
            if(accessToken) {
                api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

                try {
                    const response = await api.get("/api/account/user/")
                    setUser(response.data)
                    await loadUserData(accessToken);
                } catch (error) {
                    console.log('Error',error.message)
                    logout()
                }
            } else {
                delete api.defaults.headers.common["Authorization"];
                setUser(null)
            }    
            setLoading(false)
        };
        initAuth();
    }, [accessToken])

  return (
    <AuthContext.Provider
    value={{user, accessToken, isAuthenticated, login, logout}}
    >
       { !loading && children } 
    </AuthContext.Provider>
  )
}

export default AuthProvider
export const useAuth = () => useContext(AuthContext);