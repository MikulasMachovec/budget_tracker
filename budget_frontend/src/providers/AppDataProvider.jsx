import { createContext, useContext, useState, useEffect } from "react";
import api from '../api';


const AppDataContext = createContext();
// User data provider
function AppDataProvider({ children }) {
    const [categories, setCategories] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadUserData = async(accessToken) =>{
        setLoading(true)
        try {
            api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            const [catRes, expRes] = await Promise.all([
                api.get('/api/expenses/categories/'),
                api.get('/api/expenses/expenses')
            ])

            setCategories(catRes.data)
            setExpenses(expRes.data)
        } catch(error){
            console.error('Failed to load user data', error);
            setError('Failed to fetch user data');
            setCategories([]);
            setExpenses([]);
        }finally {
            setLoading(false)
        }

    };

    const addExpense = async(expenseData)=> {
        try {
            const response = await api.post('/api/expenses/expenses/', expenseData);

            setExpenses((prev) => [...prev, response.data])

            
        } catch (error) {
            throw error;
        }
    }

    const clearUserData = () => {
        setCategories([]);
        setExpenses([]);
    }

    
    return (
        <AppDataContext.Provider
        value={{
            categories,
            expenses,
            setCategories,
            setExpenses,
            addExpense,
            loadUserData, 
            clearUserData
        }}
        >
            {children}
        </AppDataContext.Provider>
    )
}
export default AppDataProvider
export const useAppData = () => useContext(AppDataContext)