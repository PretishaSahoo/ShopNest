import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const baseURL = process.env.REACT_APP_MODE === "production" ? "https://shop-nest-b.vercel.app" : "http://localhost:5000";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        fetchUser(user.email);
      } else {
        setCurrentUser(null);
        setIsLoggedIn(false);
      }
    });
    return unsubscribe;
  }, []);

  const fetchUser = async (email) => {
    const data = {email:email}
    try {
      const response = await axios.post(`${baseURL}/api/user/fetchuser`, data);
      setCurrentUser(response.data.user);
    } catch (error) {
      console.error('Fetch user error:', error.message);
      console.log(error);
    }
  };
  
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      fetchUser(user.email);
    } catch (error) {
      console.error('Login error:', error.message);
      throw new Error('Invalid email or password.');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout error:', error.message);
      throw new Error('Failed to log out.');
    }
  };

  const edit = async (data) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const email = auth.currentUser.email;
        const response = await axios.post(`${baseURL}/api/user/editUser/${email}`, data);
        fetchUser(email);
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to edit user.');
    }
  };

  const authContextValue = {
    currentUser,
    isLoggedIn,
    fetchUser,
    setCurrentUser,
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

