import React from "react";
import { useError } from '../providers/ErrorProvider'

function Profile(){
    const { showError, clearError} = useError();

    const testError = () => {
        showError('t')
    }
    
    return(
        <>
        <div>Under Development</div>
        <button
            onClick={() => testError()}
            className="p-2 text-red-600 transition border-2 border-red-600 rounded-lg hover:bg-red-600 hover:text-white"
        >
            Error test
        </button>
        </>
        
    )
}

export default Profile