import {createContext, useContext, useState} from 'react'

const ErrorContext = createContext(null);

export const useError = () => {
    const ctx = useContext(ErrorContext);
    if(!ctx) {
        throw new Error("useError must be used inside ErrorProvider");
    }
    return ctx;
};

export function ErrorProvider({ children }) {
    const [error, setError] = useState(null);

    const showError = (message) => {
        setError(message);
    }

    const clearError = () => {
        setError(null);
    }

    return (
        <ErrorContext.Provider value={{ error, showError, clearError }}>
          {children}
        </ErrorContext.Provider>
      );
}

export default ErrorProvider