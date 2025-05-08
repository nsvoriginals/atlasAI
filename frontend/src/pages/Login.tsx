import React from 'react';
import { useUser } from '../context/UserContext';
// ... other imports

const Login: React.FC = () => {
  const { setUsername } = useUser();
  
  const handleLogin = async (credentials: any) => {
    try {
      const response = await loginAPI(credentials);
      const { access_token, username } = response;
      
      // Set the username in the global context
      setUsername(username);
      
      // Store the token
      localStorage.setItem('token', access_token);
      
      // Navigate to dashboard or home page
      navigate('/user/profile');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // ... rest of the component
}; 