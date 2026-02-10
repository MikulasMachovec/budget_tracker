import React, {useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Navbar from './components/Navbar.jsx';
import Profile from './pages/Profile.jsx';
import Footer from './components/Footer.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import AppDataProvider from './providers/AppDataProvider.jsx';
import { ErrorProvider,useError } from './providers/ErrorProvider.jsx';
import ErrorModal from './utils/ErrorModal.jsx';

function AppContent() {
  const {error, clearError} = useError();
  
  return (
    <>
      <ErrorModal
      isOpen={!!error}
      message={error}
      onClose={clearError}
      />
      <AppDataProvider>
        <AuthProvider>
          <Navbar />
            <main className='main-content'>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/profile" element={<Profile />}/>
                </Routes>
            
            </main>
          <Footer />
        </AuthProvider>
      </AppDataProvider>
    </>
  )
}

function App(){
  return(
    <ErrorProvider>
      <AppContent />
    </ErrorProvider>
  );
}

export default App
