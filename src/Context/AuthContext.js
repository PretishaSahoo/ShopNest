import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem('shopNestToken');
    if (token) {
      setIsLoggedIn(true);
      fetchUser(token)
    }
  }, []);

  const fetchUser = async (myid) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/fetchUser/${myid}`);
      setCurrentUser(response.data.user); 
    } catch (error) {
      console.error('Fetch user error:', error.message);
    }
  };

  const login = async (email,password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {email,password});
      if(response.data){
        localStorage.setItem('shopNestToken', response.data.token);
        setCurrentUser(response.data.user);
        setIsLoggedIn(true);
        console.log(response.data.user);
      }
    } catch (error) {
      console.error('Login error:', error.message);
      throw new Error('Invalid email or password.');
    }
  };

  const edit = async (data) => {
    console.log(data)
    try {
      const token = localStorage.getItem('shopNestToken')
      const response = await axios.post(`http://localhost:5000/api/user/editUser/${token}`, data);
      console.log(response.data)
      await fetchUser(token);
    } catch (error) {
      console.error('Edit error:', error.message);
      throw new Error('Failed to edit user.'); 
    }
  };
  
  const logout = () => {
    localStorage.removeItem('shopNestToken');
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const authContextValue = {
    currentUser,
    isLoggedIn,
    login,
    logout,
    edit
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
