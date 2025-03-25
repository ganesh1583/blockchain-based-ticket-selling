import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { register, isAuthenticated } from '../services/authService';

const RegisterPage = () => {
  const [userName, setUserName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const walletAddress = location.state?.walletAddress || '';

  // useEffect(() => {
  //   // Check if user is already authenticated
  //   if (isAuthenticated()) {
  //     navigate('/events');
  //   }
    
  //   // Check if wallet address is provided
  //   if (!walletAddress) {
  //     navigate('/');
  //   }
  // }, [navigate, walletAddress]);

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (!userName.trim()) {
      setError('Username is required');
      return;
    }
  
    setIsRegistering(true);
    setError('');
  
    try {
      // Generate a signature with the wallet address
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }
  
      const provider = new BrowserProvider(window.ethereum);
      
      // Request accounts access
      const accounts = await provider.listAccounts();
      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }
  
      const address = accounts[0] ? accounts[0].address : null;
      
      const message = '';
      fetch(`http://localhost:5000/api/users/nonce/${address}`)
      .then((response) => response.json()) // Convert response to JSON
      .then((data) => {
        message = data.nonce;
      }).catch((error) => {
        // Handle any errors
        console.error("Error occurred while fetching:", error);
      });

      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, address]
      });
  
      // Now call the backend API to register the user
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wallet_address: address,
          user_name: userName,
          signature: signature,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
  
      // On success, navigate to the events page
      navigate('/events');
    } catch (err) {
      setError('Registration failed: ' + (err.message || 'Unknown error'));
    } finally {
      setIsRegistering(false);
    }
  };
  return (
    <div className="register-container">
      <h2>Create Your Account</h2>
      
      <div className="wallet-info">
        <p>Wallet Address: {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}</p>
      </div>
      
      <form onSubmit={handleRegister} className="register-form">
        <div className="form-group">
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isRegistering}
          className="register-btn"
        >
          {isRegistering ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
      
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default RegisterPage;