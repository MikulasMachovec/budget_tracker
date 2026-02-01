import { createContext, useContext, useState, useEffect,useMemo } from "react";
import api from '../api';


const AppDataContext = createContext();
// User data provider
function AppDataProvider({ children }) {
    const [categories, setCategories] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadUserData = async(accessToken) =>{
        setLoading(true)
        try {
            api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            const [catRes, expRes, incRes] = await Promise.all([
                api.get('/api/expenses/categories/'),
                api.get('/api/expenses/expenses/'),
                api.get('/api/expenses/incomes/')
            ])

            setCategories(catRes.data)
            setExpenses(expRes.data)
            setIncomes(incRes.data)

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

            setExpenses(prev => [...prev, response.data])

            
        } catch (error) {
            throw error;
        }
    }

    const addIncome = async(incomeData)=>{
        try {
            const response = await api.post('/api/expenses/incomes/', incomeData)
            setIncomes(prev => [...prev, response.data])
        } catch (error) {
            
        }
    }

    const createCategory = async(newCategoryData)=>{
        try {
            const response = await api.post('/api/expenses/categories/', newCategoryData);
            setCategories(prev => [...prev, response.data])
        } catch (error) {
            throw error;
        }
    }

    const deleteCategory = async(categoryId) => {
        try {
            const response = await api.delete(`/api/expenses/categories/${categoryId}/`)
            setCategories(prev => prev.filter(cat => cat.id !== categoryId));
        } catch (error) {
            throw error;
        }
    }

    const updateCategory = async (categoryId, categoryData) => {
        try {
            const response = await api.put(`/api/expenses/categories/${categoryId}/`, categoryData)
            setCategories(prev => 
                prev.map(cat => 
                    cat.id === categoryId ? response.data : cat
                )
            )
        } catch (error) {
            throw error
        }
    }

    const getMonthKey = (date) => {
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2, '0')}`;
    };

    const currentMonth = getMonthKey(new Date())

    const spentByCategory = useMemo(()=>{
        return expenses.reduce(( acc , e ) => {
            // ignore broken data
            if (!e.category_id || !e.date) return acc;
            // ignore expense not in this month
            if (getMonthKey(e.date) !== currentMonth) return acc;
            // normalize category id
            const catId = Number(e.category_id);
            // accumulate
            acc[catId] = (acc[catId] || 0) + Number(e.amount || 0);

            return acc;
        },{});
    },[expenses, currentMonth])

    
    const clearUserData = () => {
        setCategories([]);
        setExpenses([]);
    }

    
    return (
        <AppDataContext.Provider
        value={{
            categories,
            expenses,
            incomes,
            spentByCategory,
            addIncome,
            setCategories,
            setExpenses,
            addExpense,
            createCategory,
            deleteCategory,
            updateCategory,
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